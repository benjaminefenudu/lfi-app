const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

exports.connectDatabase = async (app) => {
  try {
    await mongoose.connect(
      process.env.DB_URI,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      },
      () => {
        console.log("Connected to database...");
        app.listen(PORT, () => {
          console.log(`Server listening on port ${PORT}...`);
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
};
