import React, { useState } from 'react';
import { getUser } from '../service/api';
import { Box, Button, TextField } from '@mui/material';
import DownloadExpenses from './DownloadExpenses';

function Private() {
  const [myname, setMyname] = useState('');
  const [download, setDownload] = useState(false);
  const [data, setData] = useState(null); // Initialize as null

  const handleOnClick = async () => {
    console.log("Button clicked");

    try {
      const response = await getUser(myname); // Fetch user data
      if (response && response.data) {
        setData(response.data); // Set the response data
        setDownload(true); // Trigger the download component rendering
        console.log("Response data:", response.data); // Debugging log
      } else {
        console.error('No data received or the user does not exist.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <>
      <Box sx={{ width: '90%', height: '60%', bgcolor: 'lightgray' }}>
        <TextField
          id="outlined-basic"
          label="Enter your name"
          variant="outlined"
          value={myname}
          onChange={(e) => setMyname(e.target.value)}
          sx={{ marginBottom: '10px' }}
        />
        <Button variant="contained" sx={{ width: 'fit-content' }} onClick={handleOnClick}>
          Show report
        </Button>
        {download && data && <DownloadExpenses data={data} />} {/* Pass the data prop */}
      </Box>
    </>
  );
}

export default Private;
