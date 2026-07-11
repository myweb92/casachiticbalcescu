const https = require('https');
const fs = require('fs');
https.get('https://hotels.cloudbeds.com/en/reservation/OYwpJm/?currency=ron&checkin=2027-04-11&checkout=2027-04-12', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('cloudbeds.html', data);
    console.log('Saved to cloudbeds.html, length: ' + data.length);
  });
}).on('error', (err) => console.log(err));
