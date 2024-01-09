import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

import { Link } from "react-router-dom";
import Prediction from "./Prediction";
export default function Predictions() {
  const params = useParams();
  const navigate = useNavigate();
  //fetch predictions of this id

  const [fixtures, setFixtures] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [userData, setUserData] = useState([]);
  
  function handlePredictionChange(childData) {
      // console.log(fixtures[childData.id]);
      //here update prediction change 
      setPredictions(oldState =>{
        return oldState.map((obj) => {
          return obj.id === childData.id ? {...obj, user_pred: childData.pred} : obj 
        })
      })
      
  }
  function init_prediction() {
    //this function will take the number of fixutres and each fixture id with a json object
    //json {fixtureid, userPrediction} and put it into state of prediction
    const array = new Array();
    // if (userData.predictions.length == 0) {
    console.log(predictions)
    if (userData.predictions){
      console.log(userData.predictions)  
      for (var i = 0; i < fixtures.length; i++) {
          
          let element = {
            id: fixtures[i]._id,
            user_pred: "",
          };
          array.push(element);
        }
      
    }
    else{
      
    }
    
    // else{
    //   //get actual predictions
    // }
    
    setPredictions(array);
    // console.log("predictions: ")
    console.log(predictions)
    // console.log(array)
    return array;
  }
  useEffect(() => {
    async function getFixtures() {
      const response = await fetch(`http://localhost:3000/fixtures/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const fixtures = await response.json();
      setFixtures(fixtures);
      // console.log(`F: fixtures`);
      // console.log(fixtures)
    }
    async function getUserData() {
      const response = await fetch(`http://localhost:3000/users/${params.id}`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      setUserData(data);
    }
    getUserData();
    getFixtures();
    init_prediction();
    return;
  }, [fixtures.length, userData.length]);

  function create_list() {
    // cons

    return fixtures.map((fixture) => {
      return (
        <Prediction
          team_1_name={fixture.team_1_name}
          team_2_name={fixture.team_2_name}
          winner={fixture.winner}
          key={fixture._id}
          id={fixture._id}
          handlePredictionChange = {handlePredictionChange}
        />
      );
    });
  }

  async function onSubmitPredictions() {
    console.log(predictions);   
    const response = await fetch(`http://localhost:3000/users/${userData._id}/update`, {
      // Enter your IP address here
      method: "POST",
      mode: "cors",
      body: JSON.stringify(predictions),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("done sending data");
    // console.log(response)
  }

  

  return (
    <div>
      <h1>PERSONALIZED PREDICTION PAGE FOR {userData.username}</h1>
      <div>{create_list()}</div>
      <button onClick={onSubmitPredictions}> Submit Predictions </button>
    </div>
  );
}
