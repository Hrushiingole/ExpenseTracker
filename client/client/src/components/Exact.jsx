import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { addExactExpense } from '../service/api';
function Exact() {
    const [totalFriends, setTotalFriends] = useState(0);
    const [add, setAdd] = useState(false);
    // Initialize with empty objects for each friend
    const [friendNameList, setFriendNameList] = useState([]);
    const [myname,setMyName]=useState();
    const handleOnClick = () => {
        // Create an array of objects with name and amount_to_pay properties
        const initialFriends = Array.from({ length: totalFriends }, () => ({
            name: "",
            amount_to_pay: 0
        }));
        setFriendNameList(initialFriends);
        setAdd(true); // Show the input fields
    };

    const renderFriendFields = () => {
        return friendNameList.map((friend, index) => (
            <Box key={index} sx={{ marginBottom: '10px' }}>
                <TextField
                    label={`Friend ${index + 1} Name`}
                    variant="outlined"
                    value={friend.name} // Use name from the object
                    onChange={(e) => {
                        const updatedFriends = [...friendNameList];
                        updatedFriends[index].name = e.target.value; // Update the name
                        setFriendNameList(updatedFriends); // Update the state
                    }}
                    sx={{ marginRight: '10px' }}
                />
                <TextField
                    label={`Amount to Pay`}
                    variant="outlined"
                    type="number" // Input type for amounts
                    value={friend.amount_to_pay || ''} // Use amount_to_pay from the object
                    onChange={(e) => {
                        const updatedFriends = [...friendNameList];
                        updatedFriends[index].amount_to_pay = e.target.value; // Update amount
                        setFriendNameList(updatedFriends); // Update the state
                    }}
                />
            </Box>
        ));
    };

    const handleOnConfirm = async () => {
        console.log("Friend Names and Amounts:", friendNameList);
        await addExactExpense(friendNameList,myname);
        console.log(myname)
    };

    return (
        <>
            <Box sx={{ width: '95%', height: '90%', bgcolor: 'lightgray', padding: '20px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        id="outlined-basic"
                        label="Enter The Number of Friends"
                        variant="outlined"
                        type="number" // Input type for number
                        onChange={(e) => setTotalFriends(e.target.value)}
                    />
                    <Button variant="contained" sx={{ width: 'fit-content' }} onClick={handleOnClick}>
                        Submit
                    </Button>
                </Box>
                <TextField
                        id="outlined-basic"
                        label="Enter your name"
                        variant="outlined"
                        type="text" // Input type for number
                        onChange={(e) => setMyName(e.target.value)}
                    />
                {add && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '40%', height: '100%' }}>
                        <Box>
                            {renderFriendFields()}
                        </Box>
                        <Button variant="contained" sx={{ width: 'fit-content' }} onClick={handleOnConfirm}>
                            Confirm
                        </Button>
                    </Box>
                )}
            </Box>
        </>
    );
}

export default Exact;
