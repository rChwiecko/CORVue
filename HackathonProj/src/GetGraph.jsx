import React from 'react';
import AJGraph from './Graphs/AJGraph.png';
import JDGraph from './Graphs/JDGraph.png';
import JSGraph from './Graphs/JSGraph.png';
import MJGraph from './Graphs/MJGraph.png';

function GetGraph({props}) {
    if (props === 1){
        return (
        <div>
            <img className="Graph" src={JDGraph} alt="graph" />
        </div> )}
    else if (props === 2){
        return (
            <div>
                <img className="Graph" src={JSGraph} alt="graph" />
            </div> )}
    else if (props === 3){
        return (
            <div>
                <img className="Graph" src={MJGraph} alt="graph" />
            </div> )}
    else {
        return (
            <div>
                <img className="Graph" src={AJGraph} alt="graph" />
            </div> )} 
}
export default GetGraph