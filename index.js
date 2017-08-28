// This is a simple challenge from FCC
// Provide an API that returns json containing the users
// ipAddress, language, and software.

const express = require("express");
const ip = require("ip");
const os = require('os');

var app = express();

app.get("/whoami", (req, res) => {
    var ipAddress = null;
    var language = null;
    var software = null;

    try {
        ipAddress = ip.address();
        language = req.header('Accept-Language');
        language = language.substring(0, language.indexOf(","));
        software = os.platform().toLowerCase();
        if (software === "freebsd" || software === "linux" || software === "sunos") {
            software = "unix (" + software + ")";
        } else if (software === "darwin") {
            software = "Mac OS";
        } else if (software === "win32") {
            software = os.release();
            software = software.substring(0, software.indexOf("."));
            software = "Windows " + software;
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