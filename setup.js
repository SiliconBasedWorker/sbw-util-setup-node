const baseUrl =
  "https://raw.githubusercontent.com/#USER#/#REPO#/#BRANCH#/#PATH##FILE#";

const { deps } = require("./setup.json");
const fs = require("fs");

const https = require("https");
function downloadFile(url, fileName) {
  https.get(url, (res) => {
    var data = "";
    res.setEncoding("utf-8");
    res.on("data", function (chunk) {
      data += chunk;
    });
    res.on("end", () => {
      fs.writeFileSync(fileName, data, "utf-8");
    });
  });
}

for (var k in deps) {
  const url = baseUrl
    .replace("#USER#", deps[k].user)
    .replace("#REPO#", deps[k].repo)
    .replace("#BRANCH#", deps[k].branch)
    .replace("#PATH#", deps[k].path)
    .replace("#FILE#", deps[k].file);
  console.log(k, url);
  downloadFile(url, deps[k].file);
  // add new logic to install deps for deps
}
