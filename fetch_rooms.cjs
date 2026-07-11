const https = require('https');
https.get('https://hotels.cloudbeds.com/en/reservation/OYwpJm/?currency=ron&checkin=2027-04-11&checkout=2027-04-12', (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    // try to find script tags with JSON
    const match = data.match(/window\.initialState\s*=\s*({.*?});/);
    if (match) {
      console.log("Found state");
    } else {
      console.log(data.substring(0, 1000));
    }
  });
}).on('error', (err) => console.log(err));
