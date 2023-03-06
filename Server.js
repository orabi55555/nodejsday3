//Imports
const path = require("path");
const express = require("express");
const app = express();

// const http = require("http");
const fs = require("fs");

//files variables
// let MainFileHTML = fs.readFileSync("../ClientSide/index.html").toString();
// let welcomeFileHTML = fs.readFileSync("../ClientSide/welcome.html").toString();
// let StyleCSS = fs.readFileSync("../ClientSide/style.css").toString();
// let Bootstrap = fs.readFileSync("../ClientSide/bootstrap.min.css").toString();

// let ScriptFile = fs.readFileSync("../ClientSide/script.js").toString();
// let myIcon = fs.readFileSync("../ClientSide/favicon.ico");
// let clientsJSON = fs.readFileSync("clients.json").toString();
// console.log("clientsJSON:", clientsJSON);

let clientsArray = [];

app.use(express.urlencoded({ extended: true }));

function concatURL(urPath) {
  return path.join(__dirname, urPath);
}
let PORT = process.env.PORT || "7003";

app.get("/", (req, res) => {
  res.sendFile(concatURL("./main.html"));
});
app.get("/form.css", (req, res) => {
  res.sendFile(concatURL("./form.css"));
});
app.get("/myjsonfile.json", (req, res) => {
  res.sendFile(concatURL("./myjsonfile.json"));
});
app.get("/welcome.html", (req, res) => {
  res.sendFile(concatURL("./welcome.html"));
});
app.get("/fetch.js", (req, res) => {
  res.sendFile(concatURL("./fetch.js"));
});

app.post(
  "/welcome.html",
  (req, res, next) => {
    client = req.body;
    data = fs.readFileSync("myjsonfile.json", "utf-8");
    obj = JSON.parse(data);
    // console.log(obj);
    obj.forEach((arr) => {
      clientsArray.push(arr);
    });
    clientsArray.push(client);
    console.log("=========", clientsArray);
    next();
  },
  (req, res, next) => {
    jsonString = JSON.stringify(clientsArray);

    // console.log(jsonString);
    fs.writeFileSync("./myjsonfile.json", jsonString);
    next();
  },
  (req, res) => {
    res.sendFile(concatURL("./welcome.html"));
  }
);

app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
