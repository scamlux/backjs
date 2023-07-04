const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRouter = require("./authRouter");
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://scamlux:m7umar4ik@authnodejs.mwbxcus.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
