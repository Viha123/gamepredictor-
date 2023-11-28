import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function () {
  const params = useParams();
  const navigate = useNavigate();
  console.log(params.id);
  //fetch predictions of this id
  const [predictions, setPredictions] = useState([]);
  useEffect(() => {
    async function getPredictions() {
      const response = await fetch(`http://localhost:3000/users/${params.id}`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const predictions = await response.json();
      setPredictions(predictions);
    }
    getPredictions();

    return;
  }, [predictions.length]);
  console.log(predictions);
  return (
    <h1>
        PERSONALIZED PREDICTION PAGE FOR {[params.id]}
    </h1>
    
);
}
