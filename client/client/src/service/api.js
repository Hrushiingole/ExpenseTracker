import axios from 'axios';
const url="http://localhost:8000"



export const addBillUsers =async(friendNameList, eachAmount)=>{
    try{
        const response=await axios.post(`${url}/addExpense`,{
            friend: {
              friendNameList,
              eachAmount,
            },
          });
          console.log('Response:', response.data);
  }
  catch(error){
      console.log('error while calling add user api',error.message);
  }
}
export const addExactExpense =async(friendNameList, myname)=>{
    try{
        const response=await axios.post(`${url}/addExactExpense`,{
            friend: {
              friendNameList,
              myname,
            },
          });
          console.log('Response:', response.data);
  }
  catch(error){
      console.log('error while calling add user api',error.message);
  }
}
export const addPercentExpense =async(updatedFriends)=>{
    try{
        const response=await axios.post(`${url}/addPercentExpense`,updatedFriends);
          console.log('Response:', response.data);
  }
  catch(error){
      console.log('error while calling add user api',error.message);
  }
}


// Example function to get user based on username
export const getUser = async (username) => {
  try {
    const response = await axios.get(`${url}/getUser`, {
      params: { username } // Sending username as a query parameter
    });
    console.log(response.data); 
    return response// Handle the response data
  } catch (error) {
    console.error('Error fetching user:', error.message); // Handle error
  }
};

// // Example usage
// fetchUser('exampleUsername');

