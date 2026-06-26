const https = require('https');
const fs = require('fs');

const rootUrl = "https://b22036tdchanmacgroup-source.github.io";
const jsUrl = rootUrl + "/HM_MISystem/assets/index-D-ES2Vm_.js";

console.log("Fetching JS from:", jsUrl);

https.get(jsUrl, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log("JS Length:", data.length);
    if (data.includes("<!DOCTYPE html>")) {
      console.log("Oops, got HTML instead of JS again. Let's see status:", res.statusCode);
    } else {
      const dest = "C:/Users/user/.gemini/antigravity/scratch/ref_js.js";
      fs.writeFileSync(dest, data);
      console.log("Saved JS file to:", dest);
    }
  });
}).on('error', (err) => {
  console.error("Error:", err);
});
