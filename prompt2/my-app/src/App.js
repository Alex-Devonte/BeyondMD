import './App.css';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import React from 'react';
import { useState } from 'react';
import ActivityDisplay from './components/ActivityDisplay.js';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent } from '@mui/material';


function App() {
  //Set open status to false to prevent dialog from opening on load
  const [open, setOpen] = useState(false);
  const resumeLink = "https://docs.google.com/document/d/1_786gXplTUFtaykVhtJfAbmz_EkF7IUxUbwZs8HE7Hw/edit?usp=sharing";

  //Functions for the opening/closing of the dialog box
  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div className="container">
      <p id="hello-msg">Hello <span className="beyond-blue-dark">Beyond</span><span className="beyond-blue-light">MD</span>!</p>
      <Button variant="outlined" onClick = {handleOpen}>View Resume</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Document file="resume.pdf">
            <Page pageNumber={1}/>
          </Document>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" href={resumeLink} target={'_blank'}>View Resume on Google Docs</Button>
        </DialogActions>
      </Dialog>{/* End Dialog */}
      <ActivityDisplay/>
    </div> /*End container*/
  );
}

export default App;
