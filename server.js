module.exports = () => {
  const path = require("path");
  const express = require("./modules/express");
  const mod = require("./modules.js");

  const app = express();

  app.set("port", process.env.PORT || 8080);
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/get", function (req, res) {
    // res.header("text/html");
    var module = req.query.module;
    if (module && module.trim() != "") {
      var ok = mod.clear();
      if (ok) {
        mod.add(module, function (cc) {
          if (cc) {
            if (
              require("fs").existsSync(
                require("path").join(__dirname, "public", "soucre.zip")
              )
            ) {
              res.redirect("/ok.html");
            } else {
              res.redirect("/err.html");
            }
          } else {
            res.redirect("/err.html");
          }
        });
      } else {
        res.redirect("/err.html");
      }
    } else {
      res.redirect("/err.html");
    }
  });

  const server = app.listen(
    { port: app.get("port"), host: "0.0.0.0" },
    function () {
      console.log("[Server] Listen on port", app.get("port"));
    }
  );

  return server;
};
