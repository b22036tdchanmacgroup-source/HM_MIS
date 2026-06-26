const fs = require('fs');

const content = fs.readFileSync("C:/Users/user/.gemini/antigravity/scratch/ref_js.js", "utf-8");

// Search for DEFAULT_DATA or similar links array
let index = content.indexOf('"links"');
if (index === -1) {
  index = content.indexOf('links:');
}
if (index !== -1) {
  console.log("Found links:");
  console.log(content.substring(index, index + 2000));
} else {
  console.log("Not found.");
}
