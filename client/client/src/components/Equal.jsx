import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import { addBillUsers } from '../service/api';

function Equal() {
  const [totalAmount, SetTotalAmount] = useState(0);
  const [totalFriends, SetTotalFriends] = useState(0);
  const [add, SetAdd] = useState(false);
  const [friendNameList, SetFriendNameList] = useState(Array(0).fill("")); // Initialize with empty names
  const [eachAmount,SetEachAmount]=useState(0);
  const handleOnclick = () => {
    let amount = totalAmount / totalFriends;
    console.log(amount);
    SetEachAmount(amount);
    SetAdd(true); // This will toggle `add` to true to conditionally render the box
  };

  const renderFriendFields = () => {
    const fields = [];
    for (let i = 0; i < totalFriends; i++) {
      fields.push(
        <TextField
          key={i}
          id={`friend-${i}`}
          label={`Friend ${i + 1} Name`}
          variant="outlined"
          value={friendNameList[i] || ''} // Use state value for each friend
          onChange={(e) => {
            const updatedNames = [...friendNameList];
            updatedNames[i] = e.target.value; // Update the name for the specific friend
            SetFriendNameList(updatedNames); // Update the state
          }}
          sx={{ marginBottom: '10px' }}
        />
      );
    }
    return fields;
  };
  const handleOnConfirm=async()=>{
    console.log("Friend Names:", friendNameList);
    
    await addBillUsers(friendNameList,eachAmount);
  }

  return (
    <>
      {/* Enter the number of friends and total amount */}
      <Box sx={{ width: '80%', height: '80%', bgcolor: 'lightgrey', padding: '20px' ,display:'flex',flexDirection:'row'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '40%', height: '80%' }}>
          <TextField
            id="outlined-basic"
            label="Enter Total Amount"
            variant="outlined"
            onChange={(e) => SetTotalAmount(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Enter Number of Friends"
            variant="outlined"
            onChange={(e) => SetTotalFriends(e.target.value)}
          />
          <Button variant="contained" sx={{ width: 'fit-content' }} onClick={handleOnclick}>
            Submit
          </Button>
        </Box>

        {add && (
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '40%', height: '100%' }}>
            {/* Additional content to display when 'add' is true */}
            <h2>Each Friend's Share: {totalAmount / totalFriends}</h2>
            {
                <Box>
                {renderFriendFields()}
              </Box>
            }
            <Button variant="contained" sx={{ width: 'fit-content' }} onClick={(e)=>handleOnConfirm(e)}>
              Confirm
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}

export default Equal;
