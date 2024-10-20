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
  


