const fs = require('fs');
const content = fs.readFileSync("C:/Users/user/.gemini/antigravity/scratch/ref_js.js", "utf-8");

// Search for gov-d3-edge in CSS injection
let pos = 0;
while (true) {
  pos = content.indexOf("gov-d3-edge", pos);
  if (pos === -1) break;
  console.log("Found gov-d3-edge context:");
  console.log(content.substring(Math.max(0, pos - 200), Math.min(content.length, pos + 200)));
  console.log("------------------------");
  pos += "gov-d3-edge".length;
}
