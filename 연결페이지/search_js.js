const fs = require('fs');

const fileContent = fs.readFileSync("C:/Users/user/.gemini/antigravity/scratch/ref_js.js", "utf-8");

// Search for mentions of stroke-dashoffset or stroke-dasharray or transition or edge or hover
const patterns = [
  /stroke-dasharray/g,
  /stroke-dashoffset/g,
  /edge/g,
  /\.gov-d3-edge/g,
  /marker-end/g
];

console.log("Analyzing file...");
patterns.forEach(p => {
  const matches = fileContent.match(p);
  console.log(`Pattern ${p}: ${matches ? matches.length : 0} matches`);
});

// Let's print sections of JS file around stroke-dashoffset matches
let index = 0;
while (true) {
  index = fileContent.indexOf("stroke-dashoffset", index);
  if (index === -1) break;
  console.log("--- MATCH ---");
  console.log(fileContent.substring(Math.max(0, index - 300), Math.min(fileContent.length, index + 300)));
  console.log("\n");
  index += "stroke-dashoffset".length;
}
