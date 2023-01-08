module.exports = { add: add, clear: clear };
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const zl = require("./modules/zip-lib");
const { json } = require("stream/consumers");

function add(name, back) {
  exec("npm install --save " + name, function (err, sout, serr, send) {
    if (!err) {
      zl.archiveFolder(
        path.join(__dirname, "node_modules"),
        path.join(__dirname, "public", "soucre.zip")
      ).then(
        function () {
          back(true);
        },
        function (err) {
          back(false);
        }
      );
    }
  });
  return true;
}
function clear(res) {
  var fpath = path.join(__dirname, "package.json");
  var data = fs.readFileSync(fpath, "utf8");
  if (data) {
    var json = JSON.parse(data);
    json.dependencies = {};
    fs.writeFileSync(fpath, JSON.stringify(json));
    return true;
  }
  return false;
}
