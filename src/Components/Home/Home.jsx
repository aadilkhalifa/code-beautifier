import './Home.scss';

import React, {useState, useEffect} from 'react'
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import Select from 'react-dropdown-select';
// var beautify = require('js-beautify').js;

var axios = require('axios');
var qs = require('qs');

const options = [
    { value: 'Javascript', label: 'Javascript' },
    { value: 'SQL', label: 'SQL' },
  ];

function Home() {

    const [selectedLanguage, setSelectedLanguage] = useState('Javascript');
    const [code, setCode] = useState('');

    function handleEditorChange(value, event) {
        setCode(value);
      }

    function handleSubmit() {
        var data = qs.stringify({
            'code': code
          });
          var config = {
            method: 'post',
            url: 'http://localhost:8000/',
            mode: 'no-cors',
            headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data : data
          };
        axios(config)
            .then(function (response) {
                var res = JSON.stringify(response.data);
                res = res.slice(1, -1);
                res = res.replace(/\\n/g, "\n");
                res = res.replace(/\\t/g, "\t");
                res = res.replace(/\\b/g, "\b");
                res = res.replace(/\\r/g, "\r");
                setCode(res);
            })
            .catch(function (error) {
                console.log(error);
            });
        }

    // useEffect(() => {
    //     console.log(code);
    //   }, [code])

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
                        defaultLanguage="javascript"
                        defaultValue="// some comment"
                        theme="vs-dark"
                        onChange={handleEditorChange}
                        value={code}
                    />
                </div>
                <div className="footer">
                    <span className="button2" onClick={()=>{setCode('// this is text a=b\nvar a=10,b=0;')}}>Sample</span>
                    <span className="button2" onClick={()=>{setCode('var a=1,b= 2;')}}>Sample</span>
                    <span className="button2">Copy</span>
                    <span className="button" onClick={handleSubmit}>Beautify</span>
                </div>
                </div>
                <div className="right">
                    <h2>Settings</h2>
                    <hr />
                    <h3>Languages</h3>
                    <Select
                        options={options}
                        onChange={(values) => {setSelectedLanguage(values[0].value)}}
                    />
                </div>
            </div>
        </div>
    )
}
export default Home

