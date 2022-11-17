import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import {useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Activities.css';

function Activities() {
    const [activities, setActivities] = useState([{}]);

    //Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        //Pull data from database after update
        GetActivities();
    });

    //Get all activities in database
    function GetActivities() {
        axios.get("http://localhost:8000/api/bored_activities/")
            .then((response) => {
                setActivities(response.data);
            });
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Activity</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Participants</TableCell>
                    <TableCell>Modify</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {activities.map(({id, activity, type, participants}) => (
                    <TableRow key={id}>
                        <TableCell>{activity}</TableCell>
                        <TableCell>{type}</TableCell>
                        <TableCell>{participants}</TableCell>
                        <TableCell>
                            <EditIcon   className="edit-icon"   sx={{color: '#f3b24a'}}/>
                            <DeleteIcon className="delete-icon" sx={{color: '#ca0000'}}/>
                        </TableCell>
                    </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}

export default Activities;