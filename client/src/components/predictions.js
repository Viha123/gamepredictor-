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
  const [predictionsExist, setPredictionsExist] = useState(false);
  const [isLoading, setLoading] = useState(false);
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

    if (userData.realPredictions.length != 0){
      for (var i = 0; i < fixtures.length; i++) {
          let element = {
            id: fixtures[i]._id,
            user_pred: userData.realPredictions[i][1],
          };
          array.push(element);
        }
      
    }
    else{ //if user does not have any predictions yet
      for (var i = 0; i < fixtures.length; i++) {
        let element = {
          id: fixtures[i]._id,
          user_pred: "",
        };
        array.push(element);
      }
      
    }
    

    setPredictions(array);
    console.log(predictions)
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
      // console.log(response)
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const data = await response.json();
      setUserData(data);
      console.log(data);
      if (data.realPrecitions != []){
        setPredictionsExist(true);
      }
    }
    getUserData(); //both are asynch so it doesnt matter which one is first and we cannot ensure init prediciton will run after getuserdata
    getFixtures();
    // init_prediction();
    return;
  }, []);
  useEffect (()=> { //another useEffect which makes sure that init_prediction runs after getuserdata
    if(userData.length != 0 && fixtures.length != 0){
      init_prediction();
    }
  },[userData, fixtures])
  function create_list() {
    // cons
    if (predictionsExist == false){
      //just render without any predictions
      return fixtures.map((fixture, index) => {
        return (
          <Prediction
            team_1_name={fixture.team_1_name}
            team_2_name={fixture.team_2_name}
            winner={fixture.winner}
            key={fixture._id}
            id={fixture._id}
            handlePredictionChange = {handlePredictionChange}
            selected = {""}
          />
        );
      });
    }
    //else make sure predictions are not empty
    console.log(predictions)
    if (predictionsExist == true && predictions.length !== 0) {
      console.log("Inside the map function")
      return fixtures.map((fixture, index) => {
        // console.log(predictions[index].user_pred)

        return (
          <Prediction
            team_1_name={fixture.team_1_name}
            team_2_name={fixture.team_2_name}
            winner={fixture.winner}
            key={fixture._id}
            id={fixture._id}
            handlePredictionChange = {handlePredictionChange}
            selected = {predictions[index].user_pred}
          />
        );
      });
    }
  }

  async function onSubmitPredictions() {
    console.log(predictions);   
    setLoading(true);
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
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    setLoading(false);
    navigate("/leaderboard")
  }

  

  return (
    <div className="flex flex-col items-center pt-24 min-h-[100vh]">
      <h1 className="mt-[7vh] text-4xl text-green-300">Hello {userData.username}, it's time to make your predictions ...</h1>
      {predictions.length !== 0 ? (<div>{create_list()}</div>) : (<div>loading</div>)}
      <button 
        onClick={onSubmitPredictions}
        className="m-3 bg-green-300 hover:scale-110 text-black font-bold py-2 px-4 transform active:scale-90 transition duration-150"
        > 
        Submit Predictions 
      </button>
      {isLoading == true ? (<div>loading</div>) : (<br></br>)}
    </div>
  );
}
