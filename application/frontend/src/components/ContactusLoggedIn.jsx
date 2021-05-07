import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField'
import Navbar from "./navbar";
import { Button } from 'react-bootstrap';
import FooterLoggedIn from "./FooterLoggedIn";

const Contactus = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ position: 'relative', minHeight: '70vh' }}>
            <div class="main">
                <div style={{ justifySelf: 'left', fontSize: '24px', paddingTop: '20px', paddingBottom: '5px', color: '#00adb5'}}>Email: </div>
                <div style={{ paddingBottom: 20 }}>
                    <input type='text' placeholder='Email' required style={{ backgroundColor: '#393e46', width: 300 }} />
                </div>
                <p style={{ fontSize: '24px', color: '#00adb5' }}>Write your question or comment:</p>
                <div style={{ paddingBottom: 20 }}>
                    <textarea type="text" rows="8" cols="50" name="contactFormBody" wrap="hard" style={{ backgroundColor: '#393e46' }}></textarea>
                </div>
                <Button style={{ backgroundColor: '#00adb5', marginBottom: 10 }} onClick={handleClickOpen}>
                    Send Form
            </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        SYNC Contact us
            </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to submit?
            </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Send
            </Button>
                    </DialogActions>
                </Dialog>

            </div>
            <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            </div>
        </div>
    );
}

export default Contactus;