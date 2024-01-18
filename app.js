const express = require("express");
const app = express();
const port = 3000;

// import filesystem module
const fs = require(fs);

// define engine
app.engine("dogs", (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
      if (err) return callback(err);

      const rendered = content.toString().replaceAll("#title", `${options.title}`).replace("#content", `${options.content}`);
      return callback(null, rendered);
    })
})

app.get("/", (req, res) => {
    res.send("Server is working");
})

app.listen(port, () => {
    console.log(`Server listening on port: ${port}.`);
  });