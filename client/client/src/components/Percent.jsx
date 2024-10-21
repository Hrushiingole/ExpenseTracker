import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { addPercentExpense } from '../service/api';

function Percent() {
    const [totalFriends, setTotalFriends] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0); // Track total amount from the user
    const [add, setAdd] = useState(false);
    const [friendNameList, setFriendNameList] = useState([]);

    const handleOnClick = () => {
        // Create an array of objects with name and percent fields
        const initialFriends = Array.from({ length: totalFriends }, () => ({
            name: "",
            percent: 0,
            amount_to_pay: 0
        }));
        setFriendNameList(initialFriends);
        setAdd(true); // Show the input fields
    };

    const handleOnConfirm = async () => {
        // Calculate amount_to_pay for each friend based on percent and totalAmount
        const updatedFriends = friendNameList.map(friend => ({
            ...friend,
            amount_to_pay: (friend.percent * totalAmount) / 100 // Calculate amount based on percentage
        }));

        setFriendNameList(updatedFriends); // Update the state with calculated amounts
        console.log("Friend Names and Amounts:", updatedFriends);
        await addPercentExpense(updatedFriends);
        // You can now send this updated list for further processing (e.g., addExactExpense(friendNameList, myname))
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
                    label={`Percent`}
                    variant="outlined"
                    type="number" // Input type for percentages
                    value={friend.percent || ''} // Use percent from the object
                    onChange={(e) => {
                        const updatedFriends = [...friendNameList];
                        updatedFriends[index].percent = e.target.value; // Update percent
                        setFriendNameList(updatedFriends); // Update the state
                    }}
                />
            </Box>
        ));
    };

    return (
        <>
            <Box sx={{ width: '95%', height: '80%', bgcolor: 'lightgray', padding: '20px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '40%' }}>
                    <TextField
                        id="outlined-basic"
                        label="Enter The Number of Friends"
                        variant="outlined"
                        type="number" // Input type for number
                        onChange={(e) => setTotalFriends(Number(e.target.value))} // Ensure this is a number
                        sx={{ marginBottom: '10px' }}
                    />
                    <TextField
                        id="outlined-amount"
                        label="Enter Total Amount"
                        variant="outlined"
                        type="number" // Input type for total amount
                        onChange={(e) => setTotalAmount(Number(e.target.value))} // Set total amount
                        sx={{ marginBottom: '10px' }}
                    />
                    <Button variant="contained" sx={{ width: 'fit-content' }} onClick={handleOnClick}>
                        Submit
                    </Button>
                </Box>
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

export default Percent;
