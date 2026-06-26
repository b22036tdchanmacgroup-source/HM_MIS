const fs = require('fs');
const lines = fs.readFileSync("C:/Users/user/.gemini/antigravity/scratch/hm_misystem/index.html", "utf-8").split("\n");

lines.forEach((line, index) => {
  if (line.includes("stroke-dasharray")) {
    console.log(`${index + 1}: ${line.trim()}`);
  }
});
