const fs = require('fs');

const html = fs.readFileSync('cloudbeds.html', 'utf8');

// The JSON is likely in a script tag with type="application/ld+json"
const scriptMatches = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/gs);
if (scriptMatches) {
  scriptMatches.forEach(match => {
    try {
      const jsonStr = match.replace(/<script type="application\/ld\+json">|<\/script>/g, '');
      const obj = JSON.parse(jsonStr);
      if (obj.containsPlace) {
        const rooms = obj.containsPlace;
        rooms.forEach(r => {
           console.log("-----");
           console.log(r.name[0]['@value']);
           console.log(r.description ? r.description[0]['@value'] : "no description");
           console.log(r.image ? r.image.slice(0,3).join("\n") : "no image");
           console.log("Capacity:", r.occupancy.value);
        });
      }
    } catch (e) {
    }
  });
} else {
  console.log("No LD+JSON found");
}

