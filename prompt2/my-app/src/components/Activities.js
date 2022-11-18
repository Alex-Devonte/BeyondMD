import { Button, Dialog, DialogActions, DialogContent, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import {useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Activities.css';

function Activities() {
    const [activities, setActivities] = useState([{}]);
    const [open, setOpen] = useState(false);
    const [_id, setId] = useState(null);

    //Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        //Pull data from database after update
        GetActivities();
    }, [activities.length]); //Only update if length of array changes

    //Get all activities in database
    function GetActivities() {
        axios.get("http://localhost:8000/api/bored_activities/")
            .then((response) => {
                setActivities(response.data);
            });
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    //Open dialog confirming deletion before making api call
    function handleDelete(id) {
        handleOpen();
        setId(id);
    }

    //Delete activity by id
    function deleteActivity(id) {
        handleClose();
        axios.delete(`http://localhost:8000/api/bored_activities/${id}`)
        .then((response) => {
            alert("Activity successfully deleted.");

            //Get list after deletion
            GetActivities();
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
                            <DeleteIcon className="delete-icon" onClick={() => handleDelete(id)} sx={{color: '#ca0000'}}/>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogContent>
                                    Are you sure you want to delete this activity?
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => deleteActivity(_id)}>Yes</Button>
                                    <Button onClick={handleClose}>No</Button>
                                </DialogActions>
                            </Dialog>
                        </TableCell>
                    </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}

export default Activities;