import cron from 'node-cron';
import Invoice from '../models/invoice.model.js';
import { Op } from 'sequelize';

const sendWhatsAppReminder = async (phone) => {
  let formattedPhone = phone?.toString().replace(/\D/g, '') || '';

  if (formattedPhone.length >= 10) {
    // Extract the last 10 digits and prefix with 91
    formattedPhone = '91' + formattedPhone.slice(-10);
  }

  if (formattedPhone.length !== 12 || !formattedPhone.startsWith('91')) {
    console.warn(`Invalid phone number format: ${phone}. Expected 10 digits optionally prefixed with country code.`);
    return { success: false, retry: false }; // Invalid number, do not retry
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("authkey", "564617A4Fps6vqI6a927b6bP1");

  var raw = JSON.stringify({
    "integrated_number": "919384450508",
    "content_type": "template",
    "payload": {
      "messaging_product": "whatsapp",
      "type": "template",
      "template": {
        "name": "smart_ro_reminder_message",
        "language": {
          "code": "en",
          "policy": "deterministic"
        },
        "namespace": "3510a53f_d642_499c_aa37_2c9c86c3582a",
        "to_and_components": [
          {
            "to": [formattedPhone],
            "components": {
              "header_1": {
                "type": "image",
                "value": "https://files.msg91.com/564617/xjsoinvw.jpeg"
              }
            }
          }
        ]
      }
    }
  });

  const requestOptions = { method: 'POST', headers: myHeaders, body: raw, redirect: 'follow' };

  try {
    const res = await fetch("https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/", requestOptions);
    if (!res.ok) {
      const errText = await res.text();
      console.error(`WhatsApp message failed with status ${res.status}: ${errText}`);
      if (res.status >= 400 && res.status < 500) return { success: false, retry: false }; // Client error, don't retry
      return { success: false, retry: true }; // Server error, retry later
    }

    return { success: true, retry: false };
  } catch (error) {
    console.error('Fetch error during MSG91 call:', error);
    return { success: false, retry: true }; // Network error, retry later
  }
};

export const initCronJobs = () => {
  // Run everyday at 10:00 AM
  cron.schedule('0 10 * * *', async () => {
    console.log('Running WhatsApp dynamic reminder cron job...');
    try {
      const today = new Date().toISOString().split('T')[0];

      // Find invoices where the reminder date has arrived or passed
      const invoices = await Invoice.findAll({
        where: {
          whatsappreminderdate: {
            [Op.lte]: today
          }
        }
      });

      for (const invoice of invoices) {
        try {
          const customerPhone = invoice.customerData?.phoneNumber;
          if (customerPhone) {
            const result = await sendWhatsAppReminder(customerPhone);

            if (result.success || !result.retry) {
              if (result.success) {
                console.log(`Successfully sent WhatsApp reminder for invoice ${invoice.invoiceNumber}`);
              } else {
                console.log(`Marked invoice ${invoice.invoiceNumber} as sent due to non-retriable error.`);
              }

              // Set the next reminder date if reminderdays is configured
              if (invoice.reminderdays) {
                const todayObj = new Date();
                let nextReminderDate = new Date(invoice.invoiceDate || today);

                // Calculate next reminder date strictly based on the original invoice date
                while (nextReminderDate <= todayObj) {
                  nextReminderDate.setDate(nextReminderDate.getDate() + invoice.reminderdays);
                }

                invoice.whatsappreminderdate = nextReminderDate;
              } else {
                // If no reminder days configured but it still got picked up, mark as sent to avoid loop
                invoice.whatsappremindersent = true;
              }

              invoice.whatsappremindersentat = new Date();
              await invoice.save();

            } else {
              console.warn(`Transient error for invoice ${invoice.invoiceNumber}, will retry next cron cycle.`);
            }
          } else {
            console.warn(`No phone number found for invoice ${invoice.invoiceNumber}. Updating to avoid retry.`);

            // Skip to next interval if no phone number exists
            if (invoice.reminderdays) {
              const todayObj = new Date();
              let nextReminderDate = new Date(invoice.invoiceDate || today);

              // Calculate next reminder date strictly based on the original invoice date
              while (nextReminderDate <= todayObj) {
                nextReminderDate.setDate(nextReminderDate.getDate() + invoice.reminderdays);
              }

              invoice.whatsappreminderdate = nextReminderDate;
            } else {
              invoice.whatsappremindersent = true;
            }

            invoice.whatsappremindersentat = new Date();
            await invoice.save();
          }
        } catch (err) {
          console.error(`Unexpected error processing invoice ${invoice.invoiceNumber}:`, err);
        }
      }
    } catch (error) {
      console.error('Error running WhatsApp reminder cron job:', error);
    }
  });
  console.log('WhatsApp reminder cron job initialized (Scheduled for 10:00 AM daily).');
};
