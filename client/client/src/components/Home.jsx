import React from 'react'
import {Box,Typography} from '@mui/material'

import { styled } from '@mui/material/styles';

import { useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';

import BalanceIcon from '@mui/icons-material/Balance';
import Groups3Icon from '@mui/icons-material/Groups3';
import PercentIcon from '@mui/icons-material/Percent';
import ShieldIcon from '@mui/icons-material/Shield';
import Equal from './Equal';
import Exact from './Exact';
const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'relative',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  }));
  const actions = [
    { icon: <BalanceIcon />, name: 'Equal' },
    { icon: <Groups3Icon />, name: 'Exact' },
    { icon: <PercentIcon />, name: 'Percent' },
    { icon: <ShieldIcon />, name: 'Private' },
    
  ];
 ;

function Home() {

  
  const [hidden, setHidden] = useState(false)
  const [direction, setDirection] = useState('down');
  const [section ,setSection]=useState('Equal');

  const handleOnClick=(name)=>{
    setSection(name);
  }


  return (
    <>
    <Box
  sx={{
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center', // Horizontally center
    alignItems: 'center',     // Vertically center
  }}
>
<Box
  sx={{
    width: '95vw',
    height: '95vh',
    display: 'flex',
    justifyContent: 'center', // Horizontally center
    alignItems: 'center',     // Vertically center
  }}
>
  



   
    <Box sx={{bgcolor:'silver',width:'100%',height:'100%',padding:'10px'}}>
        <Typography variant="h2" component="h2" sx={{color:'white'}}> hello</Typography>
        <Box sx={{display:'flex',flexDirection:"row",gap:'3%'}}>

        
        <Box sx={{ position: 'relative', mt: 3, height: 320,padding:'10px' }}>
        <StyledSpeedDial
          ariaLabel="SpeedDial playground example"
          hidden={hidden}
          icon={<SpeedDialIcon />}
          direction={direction}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => handleOnClick(action.name)} // Correct

            />
          ))}
        </StyledSpeedDial>
      </Box>
      <Box sx={{bgcolor:'white',height:'70vh',width:'80vw',borderRadius:'20px',display:'flex',alignItems:'center',justifyContent:"center"}}>
      {section === 'Equal' && <Equal />}
                                {section === 'Exact' && <Exact />}
                                {/* {section === 'Percent' && <Percent />} Render Percent component */}
                                {/* {section === 'Private' && <Private />} Render Private component */}
      </Box>
      </Box>
    </Box>
    </Box>
    </Box>
    </>
  )
}

export default Home