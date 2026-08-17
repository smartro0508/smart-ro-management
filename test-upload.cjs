const fs = require('fs');

async function test() {
  const imgBuffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64');
  
  const boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW';
  let body = '';
  
  body += '--' + boundary + '\r\n';
  body += 'Content-Disposition: form-data; name="name"\r\n\r\n';
  body += 'Image Test Native\r\n';
  
  body += '--' + boundary + '\r\n';
  body += 'Content-Disposition: form-data; name="slug"\r\n\r\n';
  body += 'image-test-native-' + Date.now() + '\r\n';
  
  body += '--' + boundary + '\r\n';
  body += 'Content-Disposition: form-data; name="price"\r\n\r\n';
  body += '100\r\n';
  
  body += '--' + boundary + '\r\n';
  body += 'Content-Disposition: form-data; name="mainImage"; filename="test.png"\r\n';
  body += 'Content-Type: image/png\r\n\r\n';
  
  const bodyBuffer = Buffer.concat([
    Buffer.from(body),
    imgBuffer,
    Buffer.from('\r\n--' + boundary + '--\r\n')
  ]);

  try {
    const response = await fetch('http://localhost:5000/api/v1/products/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data; boundary=' + boundary
      },
      body: bodyBuffer
    });
    const data = await response.text();
    console.log('Status:', response.status);
    console.log('Response:', data);
  } catch (err) {
    console.error('Error:', err);
  }
}
test();
