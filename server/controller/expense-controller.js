import User from "../model/User.js"; // Assuming User schema is imported

export const addExpense = async (request, response) => {
  const { friendNameList, eachAmount } = request.body.friend; // Getting friend details from the request body

  try {
    // Loop through each friend in the friendNameList and update their personalExpenses
    for (let friendName of friendNameList) {
      // Find the friend by username and update their personalExpenses
      await User.findOneAndUpdate(
        { username: friendName }, // Assuming 'username' is the field in your User schema
        { $inc: { personalExpenses: eachAmount } }, // Increment their personalExpenses by eachAmount
        { new: true, useFindAndModify: false } // Options to return the updated document
      );
    }

    return response.status(200).json('Expenses updated successfully for all friends');
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Error while adding expenses' });
  }

    
};







export const addExactExpense = async (request, response) => {
  const { friendNameList, myname } = request.body.friend; // Getting friend details from the request body

  try {
    // Find the user by myname
    const user = await User.findOne({ username: myname });
    if (!user) {
      return response.status(404).json({ error: 'User not found' });
    }

    // Iterate through each friend in friendNameList
    for (const friend of friendNameList) {
      let { name, amount_to_pay } = friend;
      amount_to_pay = Number(amount_to_pay);
      // Check if the friend's expense exists
      const existingFriend = user.expenses.find(expense => expense.person.name === name);
      
      if (existingFriend) {
        // If the friend exists, update their take amount
        existingFriend.person.take += amount_to_pay; // Add amount_to_pay to the existing take
       
      } else {
        // If the friend doesn't exist, create a new expense entry for the friend
        user.expenses.push({
          person: {
            name: name,
            take:amount_to_pay, // Assuming give starts at 0 for new friends
            give: 0, // Set the take amount
            // Initial net value, could also be 0 if preferred
          }
        });
      }
    }

    for (const friend of friendNameList) {
        let { name, amount_to_pay } = friend;
        amount_to_pay = Number(amount_to_pay);
        const friendobj = await User.findOne({ username: name });
        const myExistingExpense = friendobj.expenses.find(expense => expense.person.name === myname);
        if (myExistingExpense) {
            myExistingExpense.person.give += amount_to_pay; // Add amount_to_pay to the existing take
        }
        else{
            user.expenses.push({
                person: {
                  name: myname,
                  give: amount_to_pay, // Total amount_to_pay from all friends
                  take: 0, // Assuming take starts at 0 for myname
                 
                }
              });
            }
        await friendobj.save();
        }
      

    
    
    
    

    // Save the updated user to the database
    await user.save();
    console.log('exact expenses  updated');


    return response.status(200).json('Exact Expenses updated successfully for all friends');
  } catch (error) {
    console.error(error);
    return response.status(500).json({ error: 'Error while adding expenses' });
  }
};



  


