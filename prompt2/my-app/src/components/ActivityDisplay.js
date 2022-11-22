import React from 'react';
import axios from 'axios';
import './ActivityDisplay.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { Alert, CardActions, CardContent, Fab, Fade, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Activities from './Activities';

function ActivityDisplay() {
    //Declare state variable 'activity'
    const [activity, setActivity] = useState({});

    //Declare state variables for alert messages
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [severity, setSeverity] = useState("success")
    const [alertStatus, setAlertStatus] = useState(true);

    const [newActivityStatus, setNewActivityStatus] = useState("false");

    //Make call to api to set activity variable
    const getActivity = () => {
        axios.get("https://www.boredapi.com/api/activity").then(
            (response) => {
                //Reset alert status
                setAlertStatus(true);
                setActivity({activity: response.data.activity, type: response.data.type, participants: response.data.participants});
                setNewActivityStatus(false);
            }
        );
    }

    //Save activity from API to Postgres database
    const saveActivity = () => {
        axios.post("http://localhost:8000/api/bored_activities/", activity)
        .then((response) => {
            //Call getActivity to generate new activity after posting to database
            getActivity();
            setAlert(true);
            setAlertMsg("Activity successfully saved!");
            setNewActivityStatus(true);
        }).catch((error) => {
            setSeverity("error");
            setAlert(true);
            setAlertMsg("There was an issue with saving your activity.")
        });
    }
   
    return (
        <div>
            <div id='activity-container'>
                <h2>Feeling bored?</h2>
                <h3>Click the button and find something to do!</h3>
                <Button variant="contained" size="large" id="generate-btn" onClick={() => {getActivity()}}>Generate activity</Button>
                {/*Show element only if activity.type isn't empty*/}
                {activity.type 
                ?   <Card sx={{width: '33%'}}>
                        <CardContent sx={{display: 'flex', flexDirection: 'column'}}>
                            <div id="title-container">
                                <Typography variant='h2' id="activity">{activity.activity}</Typography>
                            </div>
                            <div id="info-container">
                                <div id="type-container">
                                    <Typography variant='h5'>Type</Typography>
                                    <Typography sx={{fontSize: 21, color: "#666666"}}>{activity.type}</Typography>
                                </div>
                                <div id="participants-container">
                                    <Typography variant='h5'>People</Typography>
                                    <Typography sx={{fontSize: 21, color: "#666666"}}>{activity.participants}</Typography>
                                </div>
                            </div>
                            <CardActions onClick={saveActivity} sx={{display: 'block', textAlign: 'right'}}>
                                <Tooltip title="Save Activity">
                                    <Fab color="primary" aria-label="add">
                                        <AddIcon/>
                                    </Fab>
                                </Tooltip>
                            </CardActions>
                        </CardContent>
                    </Card>
                : null}
                {/* Use MUI Fade transition with setTimeout to have alert leave after specified time */}
                {alert ? 
                    <Fade in={alertStatus} timeout={500}
                    addEndListener={() => {
                        setTimeout(() => {
                            setAlertStatus(false);
                        }, 2000);
                    }}>
                        <Alert severity={severity}>
                            <strong>{alertMsg}</strong>
                        </Alert>
                    </Fade> : null}         
            </div>
            <Activities newActivityStatus={newActivityStatus}/>
        </div>
    )
}
export default ActivityDisplay;