// This is a simple challenge from FCC
// Provide an API that returns json containing the users
// ipAddress, language, and software.

const express = require("express");
const ip = require("ip");

var app = express();

app.get("/whoami", (req, res) => {
    var ipAddress = null;
    var language = null;
    var software = null;

    try {
        ipAddress = ip.address();
        language = req.header('Accept-Language');
        language = language.substring(0, language.indexOf(","));
        software = req.headers['user-agent'].toLowerCase();
        if (software.indexOf("windows nt 10") >= 0) {
            software = "Windows 10";
        } else if (software.indexOf("windows nt") >= 0) {
            software = "Windows NT";
        } else if (software.indexOf("windows 98") >= 0) {
            software = "Windows 98";
        } else if (software.indexOf("windows 95") >= 0) {
            software = "Windows 95";
        } else if (software.indexOf("windows 16") >= 0) {
            software = "Windows 3.11";
        } else if (software.indexOf("mac") >= 0) {
            software = "Mac OS";
        } else if (software.indexOf("X11") >= 0) {
            software = "Unix";
        } else {
            software = "Unknown";
        }
    } catch (error) {
        console.log("Error:", error);
    }
    
    res.send({
        FCC: "Request Header Parser Microservice",
        ipaddress: ipAddress,
        language: language,
        software: software
    })
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);