import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

// initialize path and port 
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

var passwordAuth = false;
var userAuth = false;

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + '/public'));

function passwordCheck(req, res, next){
    const userAuth = req.body["username"];
    const password = req.body["password"];

    if (password === "abcd1234" && userAuth === "admin"){
        passwordAuth = true;
    }

    next();

};

app.use(passwordCheck);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

// to access  page content after authentication success 
app.post("/check", (req, res) => {

    if (passwordAuth){
        res.sendFile(__dirname + "/public/content.html");
    }else{
        res.sendFile(__dirname + "/public/index.html");
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  
  