import { Button, Dialog, DialogActions, DialogContent, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import {useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './Activities.css';
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";

function Activities() {
    const [activities, setActivities] = useState([{}]);
    const [_id, setId] = useState(null);

    //Variables for dialog
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    
    //Variables for edit functions
    const [editID, setEditID] = useState(null);
    const [editActivityName, setEditActivityName] = useState("");
    const [editActivityType, setEditActivityType] = useState("");
    const [editActivityParticipants, setEditActivityParticipants] = useState("");
    const [updatedActivity, setUpdatedActivity] = useState({ activity: "", type: "", participants: ""});
    const [updated, setUpdated] = useState(false);

    //Objects needed for populating select fields
    const activityTypes = [
        {
            value: 'education',
            label: 'education',
        },
        {
            value: 'recreational',
            label: 'recreational',
        },
        {
            value: 'social',
            label: 'social',
        },
        {
            value: 'diy',
            label: 'diy',
        },
        {
            value: 'charity',
            label: 'charity',
        },
        {
            value: 'cooking',
            label: 'cooking',
        },
        {
            value: 'relaxation',
            label: 'relaxation',
        },
        {
            value: 'music',
            label: 'music',
        },
        {
            value: 'busywork',
            label: 'busywork',
        },   
    ];

    const participantsNo = [
        {
            value: '1',
            label: '1',
        },
        {
            value: '2',
            label: '2',
        },
        {
            value: '3',
            label: '3',
        },
        {
            value: '4',
            label: '4',
        },
        {
            value: '5',
            label: '5',
        },
    ];

    //Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        //Pull data from database after update
        GetActivities();
    }, [activities.length]); //Only update if length of array changes

    
    //Save edited activity if updated boolean is set to true
    useEffect(() => {
        if (updated) {
            editActivity();
            setUpdated(false);
        }
    }, [updated]); //Run on updated status

    //Delete activity dialog handlers
    const handleOpen = () => {
        setOpenDelete(true);
    }
    const handleClose = () => {
        setOpenDelete(false);
    }
    function handleDelete(id) {
        //Open dialog confirming deletion before making api call
        handleOpen();
        setId(id);
    }
    

    //Edit activity dialog handlers
    const handleOpenEdit = () => {
        setOpenEdit(true);
    }
    const handleCloseEdit = () => {
        setOpenEdit(false);
    }

    //Get all activities in database
    function GetActivities() {
        axios.get("http://localhost:8000/api/bored_activities/")
            .then((response) => {
                setActivities(response.data);
            });
    }

    //Get single Activity by id
    function getActivity(id) {
        setEditID(id);

        axios.get(`http://localhost:8000/api/bored_activities/${id}/`)
        .then((response) => {
            setEditActivityName(response.data.activity);
            setEditActivityType(response.data.type);
            setEditActivityParticipants(response.data.participants);
            handleOpenEdit();
        });
    }

    //Update edit state and set updated boolean
    function handleEdit() {
        setUpdatedActivity({
            id: editID,
            activity: editActivityName,
            type: editActivityType, 
            participants: editActivityParticipants 
        });

        setUpdated(true);
    }

    //Make PUT request to save updated activity
    function editActivity() {
        handleCloseEdit();
        axios.put(`http://localhost:8000/api/bored_activities/${updatedActivity.id}/`, updatedActivity)
        .then((response) => {
            alert("Activity successfully changed.");
            GetActivities();
        });
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
                            <Tooltip title="Edit Activity">
                                <EditIcon   className="edit-icon" onClick={() => getActivity(id)}   sx={{color: '#f3b24a'}}/>
                            </Tooltip>
                            <Tooltip title="Delete Activity">
                                <DeleteIcon className="delete-icon" onClick={() => handleDelete(id)} sx={{color: '#ca0000'}}/>
                            </Tooltip>
                            {/* Edit Dialog */}
                            <Dialog open={openEdit} onClose={handleCloseEdit}>
                                <DialogTitle>Edit Activity</DialogTitle>
                                <DialogContent>
                                    <TextField id="activityName" label="Activity" value={editActivityName} onChange={(e) => setEditActivityName(e.target.value)} variant="standard"/>
                                    <TextField id="activityType" select label="Type" value={editActivityType} onChange={(e) => setEditActivityType(e.target.value)} fullWidth variant="filled">
                                        {activityTypes.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField id="participantsNo" select label="Participants" value={editActivityParticipants} onChange={(e) => setEditActivityParticipants(e.target.value)} fullWidth variant="filled">
                                        {participantsNo.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => handleEdit()}>Save</Button>
                                    <Button onClick={handleCloseEdit}>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                            {/* End Edit Dialog */}

                            {/* Delete Dialog */}
                            <Dialog open={openDelete} onClose={handleClose}>
                                <DialogContent>
                                    Are you sure you want to delete this activity?
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => deleteActivity(_id)}>Yes</Button>
                                    <Button onClick={handleClose}>No</Button>
                                </DialogActions>
                            </Dialog>
                            {/* End Delete Dialog */}
                        </TableCell>
                    </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}

export default Activities;