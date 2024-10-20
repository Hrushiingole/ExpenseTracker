import mongoose from "mongoose";
import User from "../model/User.js";
// import dotenv from 'dotenv';

// dotenv.config();

// const USERNAME=process.env.DB_USERNAME;
// const PASSWORD=process.env.DB_PASSWORD;

const Connection=async()=>{
    const URL='mongodb+srv://hrishikeshingole532:Hrushi%40123@cluster0.pz3wt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

    try{
        //useUnfiedTopolgy:true means to tell mongodb that use everything latest
        await mongoose.connect(URL,{
            useUnifiedTopology:true
        })

        console.log('database connected successfully');
        await insertInitialData();

    }catch(error){
        console.log('error while connection mongodb',error.message);
    }
}

const insertInitialData = async () => {
    const initialUsers = [
      {
        username: "john_doe",
        email: "john@example.com",
        mobileNumber: "1234567890",
        personalExpenses: 0,
        expenses: [
          {
            person: {
              name: "jane_doe",
              give: 50,
              take: 0,
              
            },
          },
        ],
      },
      {
        username: "jane_doe",
        email: "jane@example.com",
        mobileNumber: "0987654321",
        personalExpenses: 0,
        expenses: [
          {
            person: {
              name: "john_doe",
              give: 0,
              take: 30,
              
            },
          },
        ],
      },
    ];
  
    for (const user of initialUsers) {
      // Calculate netAmount before inserting
      
  
      // Check if user already exists
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        // If user does not exist, insert into the database
        await User.create(user);
        console.log(`Inserted user: ${user.username}`);
      } else {
        console.log(`User already exists: ${user.username}`);
      }
    }
  };
  

export default Connection;