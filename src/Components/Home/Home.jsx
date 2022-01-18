import './Home.scss';

import React, {useState, useEffect} from 'react'
import { RiArrowLeftRightLine } from 'react-icons/ri';

function Home() {

    const [active, setActive] = useState(1);
    const [inputValue, setInputValue] = useState(100.0);
    const [outputValue, setOutputValue] = useState();
    const [inputUnit, setInputUnit] = useState('m');
    const [outputUnit, setOutputUnit] = useState('miles');

    useEffect(() => {
        if(active===1){
            setInputUnit('m');
            setOutputUnit('miles');
        }
        if(active===2){
            setInputUnit('c');
            setOutputUnit('f');
        }
        if(active===3){
            setInputUnit('inr');
            setOutputUnit('usd');
        }
    }, [active]);

    const heading = ['Distance', 'Temprature', 'Currency'];

    useEffect(() => {
        setOutputValue(inputValue);
    }, [inputValue])

    // useEffect(() => {console.log(inputUnit)}, [inputUnit]);

    function calculate () {
        if(active === 1){
            const units = ['m', 'km', 'miles'];
            const multiply1 = [1, 1000, 1609.34];
            const multiply2 = [1, 0.001, 0.000621371];
            var index1 = units.indexOf(inputUnit);
            var index2 = units.indexOf(outputUnit);
            if(index1 === index2) {
                setOutputValue(inputValue);
                return;
            }
            var temp = inputValue;
            temp = temp * multiply1[index1];
            temp = temp * multiply2[index2];
            temp = parseFloat(temp).toFixed(4)
            setOutputValue(temp);
        } else if (active === 2){
            const units = ['c', 'f'];
            var index1 = units.indexOf(inputUnit);
            var index2 = units.indexOf(outputUnit);
            if(index1 === index2){
                setOutputValue(inputValue);
                return;
            }
            if(inputUnit === 'c' && outputUnit === 'f'){
                var temp = inputValue * 9 / 5;
                temp = temp + 32;
                temp = parseFloat(temp).toFixed(4)
                setOutputValue(temp);
                return;
            }
            if(inputUnit === 'f' && outputUnit === 'c'){
                var temp = inputValue - 32;
                temp = temp * 5/9;
                temp = parseFloat(temp).toFixed(4)
                setOutputValue(temp);
                return;
            }
        } else if(active === 3){
            const units = ['inr', 'usd', 'euro', 'pound'];
            const multiply1 = [1, 74.43, 84.83, 101.49];
            const multiply2 = [1, 0.013, 0.012, 0.0099];
            var index1 = units.indexOf(inputUnit);
            var index2 = units.indexOf(outputUnit);
            if(index1 === index2) {
                setOutputValue(inputValue);
                return;
            }
            var temp = inputValue;
            temp = temp * multiply1[index1];
            temp = temp * multiply2[index2];
            temp = parseFloat(temp).toFixed(2)
            setOutputValue(temp);
        }
    }

    useEffect(() => {calculate();}, [inputValue, inputUnit, outputUnit]);

    function swap() {
        var t = inputUnit;
        setInputUnit(outputUnit);
        setOutputUnit(t);
        return;
    }

    return (
        <div className="home-div">
            <h1>{heading[active-1]} converter</h1>
            <div className="card">
                <div className="tabs">
                    <div className={`tab ${active===1 ? `active` : ''}`} onClick={()=>setActive(1)}>
                        <p>{heading[0]}</p>
                    </div>
                    <div className={`tab ${active===2 ? `active` : ''}`} onClick={()=>setActive(2)}>
                        <p>{heading[1]}</p>
                    </div>
                    <div className={`tab ${active===3 ? `active` : ''}`} onClick={()=>setActive(3)}>
                        <p>{heading[2]}</p>
                    </div>
                </div>
                <div className="content">
                    <div className="section1">
                        <p>Enter input</p>
                        <input type="number" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} ></input>
                    </div>
                    <div className="section2">
                        <select value={inputUnit} onChange={e=>setInputUnit(e.target.value)}>
                            {
                                active === 1
                                ? <> 
                                    <option value="m">meters</option>
                                    <option value="km">kilometers</option>
                                    <option value="miles">miles</option>
                                </>
                                : active === 2
                                ? <> 
                                    <option value="c">celcius</option>
                                    <option value="f">fahrenheit</option>
                                </>
                                : active === 3
                                ? <> 
                                    <option value="inr">INR</option>
                                    <option value="usd">USD</option>
                                    <option value="euro">Euro</option>
                                    <option value="pound">Pound</option>
                                </>
                                : null
                            }
                        </select>
                    </div>
                    <div className="section3" onClick={()=>swap()}>
                        <RiArrowLeftRightLine size="20" color="white" />
                    </div>
                    <div className="section4">
                    <select value={outputUnit} onChange={(e)=>setOutputUnit(e.target.value)}>
                        {
                            active === 1
                            ? <> 
                                <option value="m">meters</option>
                                <option value="km">kilometers</option>
                                <option value="miles">miles</option>
                            </>
                            : active === 2
                            ? <> 
                                <option value="c">celcius</option>
                                <option value="f">fahrenheit</option>
                            </>
                            : active === 3
                            ? <> 
                                <option value="inr">INR</option>
                                <option value="usd">USD</option>
                                <option value="euro">Euro</option>
                                <option value="pound">Pound</option>
                            </>
                            : null
                        }
                    </select>
                    </div>
                    <div className="section5">
                        <p>Calculated output</p>
                        <input type="number" value={outputValue}></input>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
