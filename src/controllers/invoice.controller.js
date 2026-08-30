import * as invoiceService from '../services/invoice.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import messages from '../constants/messages.js';

export const createInvoice = asyncHandler(async (req, res) => {
  const invoice = await invoiceService.createInvoice(req.body);

  const responseData = invoice.toJSON ? invoice.toJSON() : invoice;
  const isGst = responseData.isGstApplied === true || responseData.isGstApplied === 'true';

  try {
    const customerPhone = responseData.customerData?.phoneNumber;
    if (customerPhone) {
      let formattedPhone = customerPhone.replace(/\D/g, '');
      if (formattedPhone.length === 10) {
        formattedPhone = '91' + formattedPhone;
      }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authkey", "564617A4Fps6vqI6a927b6bP1");

      var raw = JSON.stringify({
        "integrated_number": "919384370508",
        "content_type": "template",
        "payload": {
          "messaging_product": "whatsapp",
          "type": "template",
          "template": {
            "name": "smart_ro_template",
            "language": {
              "code": "en_US",
              "policy": "deterministic"
            },
            "namespace": "7355a2be_b99f_47d2_89f4_fe7ae4cb1288",
            "to_and_components": [
              {
                "to": [
                  formattedPhone
                ],
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

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/", requestOptions)
        .then(response => response.text())
        .then(result => console.log('WhatsApp message sent successfully:', result))
        .catch(error => console.error('Error sending WhatsApp message:', error));

      var raw2 = JSON.stringify({
        "integrated_number": "919384370508",
        "content_type": "template",
        "payload": {
          "messaging_product": "whatsapp",
          "type": "template",
          "template": {
            "name": "electronics_template",
            "language": {
              "code": "en",
              "policy": "deterministic"
            },
            "namespace": "7355a2be_b99f_47d2_89f4_fe7ae4cb1288",
            "to_and_components": [
              {
                "to": [
                  formattedPhone
                ],
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

      var requestOptions2 = {
        method: 'POST',
        headers: myHeaders,
        body: raw2,
        redirect: 'follow'
      };

      fetch("https://api.msg91.com/api/v5/whatsapp/whatsapp-outbound-message/bulk/", requestOptions2)
        .then(response => response.text())
        .then(result => console.log('WhatsApp electronics message sent successfully:', result))
        .catch(error => console.error('Error sending WhatsApp electronics message:', error));
    }
  } catch (error) {
    console.error('Error in WhatsApp integration:', error);
  }

  return res.success({
    ...responseData,
    invoiceId: responseData.invoiceNumber,
    invoiceType: isGst ? 'GST' : 'NON-GST'
  }, messages.CREATED, 201);
});

export const getInvoices = asyncHandler(async (req, res) => {
  const { fromDate, toDate, page, limit } = req.body;
  const invoices = await invoiceService.getAllInvoices({ fromDate, toDate, page, limit });
  return res.success(invoices, messages.FETCHED, 200);
});

export const getInvoice = asyncHandler(async (req, res) => {
  const invoice = await invoiceService.getInvoiceById(req.params.id);
  return res.success(invoice, messages.FETCHED, 200);
});

export const updateInvoice = asyncHandler(async (req, res) => {
  const invoice = await invoiceService.updateInvoice(req.params.id, req.body);
  return res.success(invoice, messages.UPDATED || 'Updated successfully', 200);
});

export const deleteInvoice = asyncHandler(async (req, res) => {
  await invoiceService.deleteInvoice(req.params.id);
  return res.success(null, messages.DELETED || 'Deleted successfully', 200);
});
