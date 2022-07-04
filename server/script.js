const express = require('express');
const app = express();
const cors = require("cors");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.options("*", cors({ origin: 'http://localhost:8000', optionsSuccessStatus: 200 }));

app.use(cors({ origin: "http://localhost:8000", optionsSuccessStatus: 200 }));

app.use(express.static('website'));

const port = 8000;
const server = app.listen(port, listening);
function listening(){
    console.log('server running');
}

app.post('/',add);
function add(req, res){
    // console.log(req.body);
    res.send(beautifyJavaScript(req.body.code));
}

function beautifyJavaScript (source) {
    const beautify = require('js-beautify').js_beautify
    return beautify(source, {indent_size: 2})
   }