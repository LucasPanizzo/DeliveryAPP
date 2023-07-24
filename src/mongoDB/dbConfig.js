import mongoose from "mongoose";
const URI = "mongodb+srv://pani:Panizzo99@deliveryapp.zurq1pr.mongodb.net/delivery?retryWrites=true&w=majority";

mongoose.connect(URI)
  .then(() => {
    console.log('Successfully connected to the DataBase');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
