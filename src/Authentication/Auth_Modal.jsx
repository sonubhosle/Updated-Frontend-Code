import React from 'react'
import { Modal,Typography,Box} from '@mui/material'
import Signup from './Signup';
import Login from './Login';
import { useLocation } from 'react-router-dom';

// Style Popup Box
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
   outline:"none",
  boxShadow: 24,
  p: 4,
};


// Reciving State Handle Close Or Open

const Auth_Modal = ({handleClose,open}) => {

  const location = useLocation();

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          {location.pathname==="/login"? <Login /> :  <Signup /> }
      
        </Box>
      </Modal>
    </div>
  )
}

export default Auth_Modal