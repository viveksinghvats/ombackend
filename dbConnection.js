const mongoose = require("mongoose");

const URI = 'mongodb+srv://omwork:vivek101@omwork.qqgza.mongodb.net/onwork?retryWrites=true&w=majority';
//DB Connection
const connectDB = async () => await mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

  module.exports = connectDB