import  React, {useState, useEffect} from 'react';
import Link from "react-router-dom";


export default function Prediction(props) {
  const id1 = props.id + props.team_1_name
  const id2 = props.id + props.team_2_name // this is to make sure that the radio buttons are unique
  const [selected1, setSelected1] = useState(props.selected===props.team_1_name);
  const [selected2, setSelected2] = useState(props.selected===props.team_2_name);

  function handleChange1() {
    props.handlePredictionChange({pred: props.team_1_name, id: props.id})
    setSelected1(oldstate => !oldstate)
    setSelected2((oldState)=>{ 
      if (oldState  === true){
        return !oldState
      }
      else{
        return oldState
      }
    })
    console.log("state changed")
  }
  function handleChange2() {
    props.handlePredictionChange({pred: props.team_2_name, id: props.id})
    setSelected1((oldState)=>{ 
      if (oldState  === true){
        return !oldState
      }
      else{
        return oldState
      }
    })    
    setSelected2(oldState => !oldState)

    console.log("state changed")
  }
   return (
   <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }} >
    <div style={{ marginRight: "1rem" }} className={selected1 ? 'border-solid border-2 border-green-300 p-2 m-1' : 'p-2 m-1'}>
      <input
        type="radio"
        name={props.id}
        value={props.team_1_name}
        id={id1}
        defaultChecked={props.selected === props.team_1_name}
        // onChange={()=>{props.handlePredictionChange({pred: props.team_1_name, id: props.id})}}
        onChange = {()=>{handleChange1()}}
        className='accent-green-300'

      />
      <label for = {id1}>{props.team_1_name}</label>
    </div>

    <div className=' p-2 m-1'>  VS </div>
    <div for= {id2} style={{ marginRight: "1rem" }} className={selected2 ? 'border-solid border-2 border-green-300 p-2 m-1' : 'p-2 m-1'}>
      <input
        type="radio"
        name={props.id}
        value={props.team_2_name}
        id={id2}
        defaultChecked={props.selected === props.team_2_name}
        // onChange = {()=>{props.handlePredictionChange({pred: props.team_2_name, id: props.id})}}
        onChange = {()=>{handleChange2()}}
        className='accent-green-300'
      />
      <label for = {id2}>{props.team_2_name}</label>
    </div>
  </div>
   )
   
}

