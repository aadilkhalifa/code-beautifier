import "./Home.scss";

import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Select from "react-dropdown-select";
import { BsFillSaveFill } from "react-icons/bs";
import { BsXSquareFill } from "react-icons/bs";
import { AiFillCopy } from "react-icons/ai";
import toast from "react-hot-toast";

var axios = require("axios");
var qs = require("qs");

const options = [
  { value: "Javascript", label: "Javascript" },
  { value: "SQL", label: "SQL" },
  { value: "HTML", label: "HTML" },
  { value: "CSS", label: "CSS" },
  { value: "JSON", label: "JSON" },
];
const truefalseoptions = [
  { value: "true", label: "True" },
  { value: "false", label: "False" },
];
const indentoptions = [
  { value: "0", label: "0" },
  { value: "2", label: "2" },
  { value: "4", label: "4" },
  { value: "6", label: "6" },
  { value: "8", label: "8" },
  { value: "10", label: "10" },
];

var js_options = {
  indent_size: 2,
  indent_with_tabs: false,
  end_with_newline: false,
  preserve_newlines: true,
};
var json_options = {
  indent: 2,
  expand: true,
  strict: false,
  escape: false,
  "unscape ": false,
};
var SQL_options = {
  language: "sql",
  tabWidth: 2,
  useTabs: false,
  keywordCase: "preserve",
  linesBetweenQueries: 1,
};
var html_options = {
  ocd: true,
};
var css_options = {
  indent: 2,
  autosemicolon: false,
};

function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState("Javascript");
  const [code, setCode] = useState(placeholders[selectedLanguage]);

  function handleEditorChange(value, event) {
    setCode(value);
  }

  function handleSave() {
    const element = document.createElement("a");
    const file = new Blob([code], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    var extension = ".js";
    if (selectedLanguage === "SQL") extension = ".sql";
    if (selectedLanguage === "HTML") extension = ".html";
    if (selectedLanguage === "CSS") extension = ".css";
    if (selectedLanguage === "JSON") extension = ".json";
    element.download = "code" + extension;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();

    toast.success("File saved.");
  }

  function handleCopy() {
    navigator.clipboard.writeText(code);
    toast.success("Copied to clipboard");
  }

  function clearCode() {
    setCode("");
  }

    function handleSubmit() {
        var current_options = js_options;
        if(selectedLanguage === 'JSON') current_options = json_options;
        if(selectedLanguage === 'SQL') current_options = SQL_options;
        if(selectedLanguage === 'HTML') current_options = html_options;
        if(selectedLanguage === 'CSS') current_options = css_options;
        var data = qs.stringify({
            'code': code,
            ...current_options,
          });
        var route = 'js';
        if(selectedLanguage==='SQL') route = 'sql';
        if(selectedLanguage==='HTML') route = 'html';
        if(selectedLanguage==='CSS') route = 'css';
        if(selectedLanguage==='JSON') route = 'json';
          var config = {
            method: 'post',
            // url: 'http://localhost:8000/' + route,
            url: 'https://enigmatic-chamber-89204.herokuapp.com/' + route,
            mode: 'no-cors',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
          };
        axios(config)
            .then(function (response) {
                // console.log(response.data.data)
                var res = JSON.stringify(response.data);
                if(selectedLanguage === 'JSON') res = JSON.stringify(response.data.data);
                res = res.slice(1, -1);
                res = res.replace(/\\n/g, "\n");
                res = res.replace(/\\t/g, "\t");
                res = res.replace(/\\b/g, "\b");
                res = res.replace(/\\r/g, "\r");
                res = res.replace(/\\"/g, '\"');
                setCode(res);
            })
            .catch(function (error) {
                console.log(error);
            });
        }
  function generateOptions(values) {
    var res = [];
    for (var i = 0; i < values.length; i++) {
      res.push({
        value: values[i],
        label: values[i],
      });
    }
    return res;
  }

  function handleSubmit() {
    var current_options = js_options;
    if (selectedLanguage === "JSON") current_options = json_options;
    if (selectedLanguage === "SQL") current_options = SQL_options;
    if (selectedLanguage === "HTML") current_options = html_options;
    if (selectedLanguage === "CSS") current_options = css_options;
    var data = qs.stringify({
      code: code,
      ...current_options,
    });
    var route = "js";
    if (selectedLanguage === "SQL") route = "sql";
    if (selectedLanguage === "HTML") route = "html";
    if (selectedLanguage === "CSS") route = "css";
    if (selectedLanguage === "JSON") route = "json";
    var config = {
      method: "post",
      // url: "http://localhost:8000/" + route,
      url: 'https://enigmatic-chamber-89204.herokuapp.com/' + route,
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        var res = JSON.stringify(response.data);
        if (selectedLanguage === "JSON")
          res = JSON.stringify(response.data.data);
        res = res.slice(1, -1);
        res = res.replace(/\\n/g, "\n");
        res = res.replace(/\\t/g, "\t");
        res = res.replace(/\\b/g, "\b");
        res = res.replace(/\\r/g, "\r");
        res = res.replace(/\\"/g, '"');
        setCode(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function removeComments() {
    var data = qs.stringify({
      code: code,
    });
    var route = "decomment";
    var config = {
      method: "post",
      // url: "http://localhost:8000/" + route,
      url: 'https://enigmatic-chamber-89204.herokuapp.com/' + route,
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        var res = JSON.stringify(response.data);
        console.log(res);
        if(selectedLanguage === 'JSON') res = JSON.stringify(response.data.data);
        res = res.slice(1, -1);
        res = res.replace(/\\n/g, "\n");
        res = res.replace(/\\t/g, "\t");
        res = res.replace(/\\b/g, "\b");
        res = res.replace(/\\r/g, "\r");
        res = res.replace(/\\"/g, '\"');
        setCode(res);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    setCode(placeholders[selectedLanguage]);
  }, [selectedLanguage]);


  return (
    <div className="home-div">
      <div className="navbar">
        <h2>{selectedLanguage} Beautifier</h2>
      </div>
      <div className="container">
        <div className="left">
          <div className="editor">
            <Editor
              height="100%"
              width="100%"
              defaultLanguage={selectedLanguage.toLowerCase()}
              path={selectedLanguage.toLowerCase()}
              defaultValue={placeholders[selectedLanguage]}
              theme="vs-dark"
              onChange={handleEditorChange}
              value={code}
            />
          </div>
          <div className="footer">
            <span
              className="button2"
              onClick={() => {
                setCode(placeholders[selectedLanguage]);
              }}
              title="add sample code"
            >
              Sample
            </span>
            <span className="button2" onClick={removeComments} title="Remove comments">
              Decomment
            </span>
            <span className="button2" onClick={clearCode} title="clear code">
              <BsXSquareFill />
            </span>
            <span className="button2" onClick={handleSave} title="Download file">
              <BsFillSaveFill />
            </span>
            <span className="button2" onClick={handleCopy} title="Copy code">
              <AiFillCopy />
            </span>
            <span className="button" onClick={handleSubmit} title="use beautifier to add formatting">
              Beautify
            </span>
          </div>
        </div>
        <div className="right">
          <h2>Settings</h2>
          <hr />
          <h3>Languages</h3>
          <Select
            options={options}
            onChange={(values) => {
              setSelectedLanguage(values[0].value);
            }}
            value={selectedLanguage}
            placeholder={"Javascript"}
          />
          {selectedLanguage === "Javascript" ? (
            <>
              <h3>Indent size</h3>
              <Select
                options={indentoptions}
                onChange={(values) => {
                  js_options = { ...js_options, indent_size: values[0].value };
                }}
                placeholder={"2"}
              />
              <h3>Indent with tabs</h3>
              <Select
                options={truefalseoptions}
                onChange={(values) => {
                  js_options = {
                    ...js_options,
                    indent_with_tabs: values[0].value,
                  };
                }}
                placeholder={"False"}
              />
              <h3>End with newline</h3>
              <Select
                options={truefalseoptions}
                onChange={(values) => {
                  js_options = {
                    ...js_options,
                    end_with_newline: values[0].value,
                  };
                }}
                placeholder={"False"}
              />
              <h3>Preserve newlines</h3>
              <Select
                options={truefalseoptions}
                onChange={(values) => {
                  js_options = {
                    ...js_options,
                    preserve_newlines: values[0].value,
                  };
                }}
                placeholder={"True"}
              />
            </>
          ) : selectedLanguage === "JSON" ? (
            <>
              <h3>Indent</h3>
              <Select
                options={indentoptions}
                onChange={(values) => {
                  json_options = { ...json_options, indent: values[0].value };
                }}
                placeholder={"2"}
              />
              <h3>Expand</h3>
              <Select
                options={truefalseoptions}
                onChange={(values) => {
                  json_options = { ...json_options, expand: values[0].value };
                }}
                placeholder={"True"}
              />
              <h3>Escape</h3>
              <Select
                options={truefalseoptions}
                onChange={(values) => {
                  json_options = { ...json_options, escape: values[0].value };
                }}
                placeholder={"False"}
              />
              <h3>Unscape</h3>
              <Select
                options={truefalseoptions}
                onChange={(values) => {
                  json_options = { ...json_options, unscape: values[0].value };
                }}
                placeholder={"False"}
              />
            </>
          ) : selectedLanguage === "SQL" ? (
            <>
              <h3>SQL dialect</h3>
              <Select
                options={generateOptions([
                  "sql",
                  "bigquery",
                  "db2",
                  "hive",
                  "mariadb",
                  "mysql",
                  "postgresql",
                  "spark",
                  "sqlite",
                ])}
                onChange={(values) => {
                  SQL_options = { ...SQL_options, language: values[0].value };
                }}
                placeholder={"sql"}
              />
              <h3>Tab width</h3>
              <Select
                options={generateOptions(["0", "2", "4", "6", "8", "10"])}
                onChange={(values) => {
                  SQL_options = { ...SQL_options, tabWidth: values[0].value };
                }}
                placeholder={"2"}
              />
              <h3>Use tabs</h3>
              <Select
                options={generateOptions(["true", "false"])}
                onChange={(values) => {
                  SQL_options = { ...SQL_options, useTabs: values[0].value };
                }}
                placeholder={"false"}
              />
              <h3>Keyword Case</h3>
              <Select
                options={generateOptions(["preserve", "upper", "lower"])}
                onChange={(values) => {
                  SQL_options = {
                    ...SQL_options,
                    keywordCase: values[0].value,
                  };
                }}
                placeholder={"preserve"}
              />
              <h3>Lines between queries</h3>
              <Select
                options={generateOptions(["0", "1", "2", "3"])}
                onChange={(values) => {
                  SQL_options = {
                    ...SQL_options,
                    linesBetweenQueries: values[0].value,
                  };
                }}
                placeholder={"1"}
              />
            </>
          ) : selectedLanguage === "HTML" ? (
            <>
              <h3>OCD</h3>
              <Select
                options={truefalseoptions}
                onChange={(values) => {
                  html_options = { ...html_options, ocd: values[0].value };
                }}
                placeholder={"True"}
              />
            </>
          ) : selectedLanguage === "CSS" ? (
            <>
              <h3>Indent size</h3>
              <Select
                options={indentoptions}
                onChange={(values) => {
                  css_options = { ...css_options, indent: values[0].value };
                }}
                placeholder={"2"}
              />
              <h3>Auto semicolon</h3>
              <Select
                options={truefalseoptions}
                onChange={(values) => {
                  css_options = {
                    ...css_options,
                    autosemicolon: values[0].value,
                  };
                }}
                placeholder={"False"}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
export default Home;

const placeholders = {
    'Javascript': `var rows = prompt("How many rows for your multiplication table?");var cols = prompt("How many columns for your multiplication table?");if(rows == "" || rows == null)rows = 10;if(cols== "" || cols== null)cols = 10;createTable(rows, cols);function createTable(rows, cols){var j=1;var output = "<table border='1' width='500' cellspacing='0'cellpadding='5'>";for(i=1;i<=rows;i++){output = output + "<tr>";while(j<=cols){output = output + "<td>" + i*j + "</td>";j = j+1;}output = output + "</tr>";j = 1;}output = output + "</table>";document.write(output);}`,
    'SQL': 'SELECT * from table;',
    'HTML': `<section class="wrapper">
    <ul>
    <li
    v-for="(item, i) in list"
    :key="i"
    >
    <SomeVueComponent
    size="1.5rem"
    v-html="getIcon('tickIcon').html"
    />
    <span>{{ item }}</span>
    </li>
    </ul>
    <a
    class="some-link"
    href="#"
    >Link</a>
    </section>`,
  CSS: "body { background-color: lightblue; } p { margin-top: 100px; margin-bottom: 100px; margin-right: 150px; margin-left: 80px; }",
  JSON: `{  "bool": true,
    "short array": [1, 2, 3],
    "long array": [
      {"x": 1, "y": 2},
      {"x": 2, "y": 1},
      {"x": 1, "y": 1},
      {"x": 2, "y": 2}
    ]
  }`,
};
