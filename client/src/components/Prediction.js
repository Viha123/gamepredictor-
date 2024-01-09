import  React, {useState, useEffect} from 'react';
import Link from "react-router-dom";


export default function Prediction(props) {
   return (
   <div style={{ display: "flex", flexDirection: "row" }}>
    <div style={{ marginRight: "1rem" }}>
      <input
        type="radio"
        name={props.id}
        value={props.team_1_name}
        id={props.team_1_name}
        defaultChecked={false}
        onChange={()=>{props.handlePredictionChange({pred: props.team_1_name, id: props.id})}}
      />
      <label>{props.team_1_name}</label>
    </div>

    <div> VS </div>
    <div style={{ marginLeft: "1rem" }}>
      <input
        type="radio"
        name={props.id}
        value={props.team_2_name}
        id={props.team_2_name}
        onChange = {()=>{props.handlePredictionChange({pred: props.team_2_name, id: props.id})}}
      />
      <label>{props.team_2_name}</label>
    </div>
  </div>
   )
   
}

