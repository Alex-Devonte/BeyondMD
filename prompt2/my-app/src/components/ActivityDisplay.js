import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Button from '@mui/material/Button';

function ActivityDisplay() {
    //Declare state variable 'activity'
    const [activity, setActivity] = useState("");

    //Make call to api to set activity variable
    const getActivity = () => {
        axios.get("https://www.boredapi.com/api/activity").then(
            (response) => {
                //console.log(response);
                setActivity(response.data.activity);
            }
        );
    }
    return (
        <div id='activity-container'>
            <h2>Feeling bored?</h2>
            <h3>Click the button and find something to do!</h3>
            <Button variant="contained" size="large" id="generate-btn" onClick={() => {getActivity()}}>Generate activity</Button>
            <div id="activity">
                { activity }
            </div>
        </div>
    )
}
export default ActivityDisplay;