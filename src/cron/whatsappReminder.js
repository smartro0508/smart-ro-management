import cron from 'node-cron';
import Invoice from '../models/invoice.model.js';
import { Op } from 'sequelize';

const sendWhatsAppReminder = async (phone) => {
  let formattedPhone = phone?.toString().replace(/\D/g, '') || '';
  if (formattedPhone.length === 10) {
    formattedPhone = '91' + formattedPhone;
  }

  if (formattedPhone.length < 10 || formattedPhone.length > 15) {
    console.warn(`Invalid phone number: ${phone}`);
    return { success: false, retry: false }; // Invalid number, do not retry
  }

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("authkey", "564617A4Fps6vqI6a927b6bP1");

  // Message 1
  var raw1 = JSON.stringify({
    "integrated_number": "919384450508",
    "content_type": "template",
    "payload": {
      "messaging_product": "whatsapp",
      "type": "template",
      "template": {
        "name": "smart_ro",
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
                "value": "https://files.msg91.com/564617/ansubrpb.jpeg"
              }
            }
          }
        ]
      }
    }
  });

  // Message 2
  var raw2 = JSON.stringify({
    "integrated_number": "919384450508",
    "content_type": "template",
    "payload": {
      "messaging_product": "whatsapp",
      "type": "template",
      "template": {
        "name": "electronics",
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
                "value": "https://files.msg91.com/564617/ewwrxoyy.jpeg"
              }
            }
          }
        ]
      }
    }
  });

  const requestOptions1 = { method: 'POST', headers: myHeaders, body: raw1, redirect: 'follow' };
  const requestOptions2 = { method: 'POST', headers: myHeaders, body: raw2, redirect: 'follow' };

  try {
    const res1 = await fetch("https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/", requestOptions1);
    if (!res1.ok) {
      const errText = await res1.text();
      console.error(`First message failed with status ${res1.status}: ${errText}`);
      if (res1.status >= 400 && res1.status < 500) return { success: false, retry: false }; // Client error, don't retry
      return { success: false, retry: true }; // Server error, retry later
    }

    const res2 = await fetch("https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/", requestOptions2);
    if (!res2.ok) {
      const errText = await res2.text();
      console.error(`Second message failed with status ${res2.status}: ${errText}`);
      if (res2.status >= 400 && res2.status < 500) return { success: false, retry: false }; // Client error, don't retry
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

      const invoices = await Invoice.findAll({
        where: {
          whatsappreminderdate: {
            [Op.lte]: today
          },
          whatsappremindersent: false
        }
      });

      for (const invoice of invoices) {
        try {
          const customerPhone = invoice.customerData?.phoneNumber;
          if (customerPhone) {
            const result = await sendWhatsAppReminder(customerPhone);

            if (result.success || !result.retry) {
              invoice.whatsappremindersent = true;
              invoice.whatsappremindersentat = new Date();
              await invoice.save();

              if (result.success) {
                console.log(`Successfully sent WhatsApp reminder (after ${invoice.reminderdays || 'configured'} days) for invoice ${invoice.invoiceNumber}`);
              } else {
                console.log(`Marked invoice ${invoice.invoiceNumber} as sent due to non-retriable error.`);
              }
            } else {
              console.warn(`Transient error for invoice ${invoice.invoiceNumber}, will retry next cron cycle.`);
            }
          } else {
            console.warn(`No phone number found for invoice ${invoice.invoiceNumber}. Marking as sent to avoid retry.`);
            invoice.whatsappremindersent = true;
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
