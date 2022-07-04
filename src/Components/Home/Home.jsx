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
    { value: 'HTML', label: 'HTML' },
    { value: 'CSS', label: 'CSS' },
    { value: 'JSON', label: 'JSON' },
  ];
const truefalseoptions = [
    { value: 'true', label: 'True' },
    { value: 'false', label: 'False' },
  ];
const indentoptions = [
    { value: '0', label: '0' },
    { value: '2', label: '2' },
    { value: '4', label: '4' },
    { value: '6', label: '6' },
    { value: '8', label: '8' },
    { value: '10', label: '10' },
  ];

var json_options = {
    'indent' : 2,
    'expand' : true,
    'strict' : false,
    'escape' : false,
    'unscape ' : false,
}

function Home() {

    const [selectedLanguage, setSelectedLanguage] = useState('Javascript');
    const [code, setCode] = useState(placeholders[selectedLanguage]);

    function handleEditorChange(value, event) {
        setCode(value);
      }

    function handleSubmit() {
        var data = qs.stringify({
            'code': code,
            ...json_options,
          });
        var route = 'js';
        if(selectedLanguage==='SQL') route = 'sql';
        if(selectedLanguage==='HTML') route = 'html';
        if(selectedLanguage==='CSS') route = 'css';
        if(selectedLanguage==='JSON') route = 'json';
          var config = {
            method: 'post',
            url: 'http://localhost:8000/' + route,
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

    // useEffect(() => {
    //     console.log(code);
    //   }, [code])
    useEffect(() => {
        setCode(placeholders[selectedLanguage]);
      }, [selectedLanguage])

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
                        // defaultLanguage="html"
                        path={selectedLanguage.toLowerCase()}
                        defaultValue={placeholders[selectedLanguage]}
                        theme="vs-dark"
                        onChange={handleEditorChange}
                        value={code}
                    />
                </div>
                <div className="footer">
                    <span className="button2" onClick={()=>{setCode('// this is text a=b\nvar a=10,b=0;')}}>Sample JS</span>
                    <span className="button2" onClick={()=>{setCode('SELECT * FROM tbl')}}>Sample SQL</span>
                    <span className="button2" onClick={()=>{setCode(`<section class="wrapper">
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
    </section>`)}}>Sample HTML</span>
    <span className="button2" onClick={()=>{setCode('menu{color:red} navigation{background-color:#333}')}}>Sample CSS</span>
    <span className="button2" onClick={()=>{setCode(placeholders['JSON'])}}>Sample JSON</span>
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
                        value = {selectedLanguage}
                        placeholder = {'Javascript'}
                    />
                    {
                        selectedLanguage === 'JSON' ? 
                        <>
                            <h3>Indent</h3>
                            <Select
                                options={indentoptions}
                                onChange={(values) => {json_options = {...json_options, 'indent': values[0].value}}}
                                placeholder = {'2'}
                            />
                            <h3>Expand</h3>
                            <Select
                                options={truefalseoptions}
                                onChange={(values) => {json_options = {...json_options, 'expand': values[0].value}}}
                                placeholder = {'True'}
                            />
                            <h3>Escape</h3>
                            <Select
                                options={truefalseoptions}
                                onChange={(values) => {json_options = {...json_options, 'escape': values[0].value}}}
                                placeholder = {'False'}
                            />
                            <h3>Unscape</h3>
                            <Select
                                options={truefalseoptions}
                                onChange={(values) => {json_options = {...json_options, 'unscape': values[0].value}}}
                                placeholder = {'False'}
                            />
                        </> : null
                    }
                </div>
            </div>
        </div>
    )
}
export default Home


const placeholders = {
    'Javascript': '// some comment',
    'SQL': 'SELECT * from table;',
    'HTML': '<div><p>hello world</p></div>',
    'CSS': 'menu{color:red} navigation{background-color:#333}',
    'JSON': `{  "bool": true,
    "short array": [1, 2, 3],
    "long array": [
      {"x": 1, "y": 2},
      {"x": 2, "y": 1},
      {"x": 1, "y": 1},
      {"x": 2, "y": 2}
    ]
  }`,
};