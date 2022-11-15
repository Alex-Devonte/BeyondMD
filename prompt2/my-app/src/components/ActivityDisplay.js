import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Button from '@mui/material/Button';

function ActivityDisplay() {
    //Declare state variable 'activity'
    const [activity, setActivity] = useState({});

    //Make call to api to set activity variable
    const getActivity = () => {
        axios.get("https://www.boredapi.com/api/activity").then(
            (response) => {
                setActivity({activity: response.data.activity, type: response.data.type, participants: response.data.participants});
            }
        );
    }
    //Todo: find way to display on click
    return (
        <div id='activity-container'>
            <h2>Feeling bored?</h2>
            <h3>Click the button and find something to do!</h3>
            <Button variant="contained" size="large" id="generate-btn" onClick={() => {getActivity()}}>Generate activity</Button>
            {/*Show element only if activity.type isn't empty*/}
            {activity.type 
            ? <div id="activity">
                Activity: {activity.activity}<br/>
                Type: {activity.type}<br/>
                Participants: {activity.participants}
              </div>
            : null}
        </div>
    )
}
export default ActivityDisplay;