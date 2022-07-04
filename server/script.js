const express = require('express');
const app = express();
const cors = require("cors");
const {format} = require('sql-formatter');
const prettify = require('html-prettify');
var pretty = require('pretty');
var cssbeautify = require('cssbeautify');
const jsonFormatter = require('json-string-formatter');
const fmt2json = require('format-to-json');

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

app.post('/json',json);
function json(req, res){
    // console.log(req.body);
    beautifyJSON(req.body.code, req.body).then(result => {
        // console.log(result);
        res.send({
            'data': result
        });
    });
    // console.log(result);
    // res.send(result);
}
app.post('/css',css);
function css(req, res){
    res.send(beautifyCSS(req.body.code));
}
app.post('/html',html);
function html(req, res){
    res.send(beautifyHTML(req.body.code));
}
app.post('/sql',sql);
function sql(req, res){
    res.send(beautifySQL(req.body.code));
}
app.post('/js',js);
function js(req, res){
    console.log('here i am');
    var result = beautifyJavaScript(req.body.code);
    console.log(result);
    res.send(result);
}

function beautifyJavaScript (source, options = {}) {
    const beautify = require('js-beautify').js_beautify;
    var res = beautify(source);
    console.log(res);
    return res;
   }
function beautifySQL (source) {
        var res = format(source);
        return res;
   }
function beautifyHTML (source) {
        var res = pretty(source);
        return res;
   }
function beautifyCSS (source) {
        var res = cssbeautify(source, {
            indent: '  ',
            // openbrace: 'separate-line',
            // autosemicolon: true
        });
        return res;
   }
async function beautifyJSON (source, options={}) {
        delete options.code;
        var new_options = {
            'indent' : parseInt(options.indent),
            'expand' : (options.expand === 'true'),
            'strict' : (options.strict === 'true'),
            'escape' : (options.escape === 'true'),
            'unscape' : (options.unscape === 'true'),
        }
        return fmt2json(source, new_options).then(res => res.result);
        return res.result;
   }    