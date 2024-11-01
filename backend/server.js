const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/taskRoutes"));

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello World" });
});

// MongoDB connection
mongoose
  .connect("mongodb+srv://aliallu3xa:Je0G3RMoB6ix76UU@cluster0.fxaol.mongodb.net/task-manager?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
