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