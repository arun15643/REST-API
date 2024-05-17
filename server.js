const express = require("express");
const mongoose = require("mongoose");
const IDInfo = require("./models/iDInfoSchema");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.get("/idInfos", async (req, res) => {
  try {
    const idInfo = await IDInfo.find({});
    res.status(200).json(idInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/idInfoID/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const idInfo = await IDInfo.findById(id);
    res.status(200).json(idInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/idInfo/:mobileNo", async (req, res) => {
  try {
    const { mobileNo } = req.params;
    const idInfo = await IDInfo.findOne({ mobileNo });
    if (!idInfo) {
      return res
        .status(404)
        .json({ message: `Cannot find IDInfo with mobileNo ${mobileNo}` });
    }
    res.status(200).json(idInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/idInfo", async (req, res) => {
  try {
    const idInfo = await IDInfo.create(req.body);
    res.status(200).json(idInfo);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// update a idInfo
app.put("/idInfo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const idInfo = await IDInfo.findByIdAndUpdate(id, req.body);
    // we cannot find any idInfo in database
    if (!idInfo) {
      return res
        .status(404)
        .json({ message: `cannot find any idInfo with ID ${id}` });
    }
    const updatedProduct = await IDInfo.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a idInfo
app.delete("/idInfo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const idInfo = await IDInfo.findByIdAndDelete(id);
    if (!idInfo) {
      return res
        .status(404)
        .json({ message: `cannot find any idInfo with ID ${id}` });
    }
    res.status(200).json(idInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/checkUniqueness", async (req, res) => {
  try {
    const { aadhar, voterId } = req.body;
    const existingAadhar = await IDInfo.findOne({ aadhar });
    const existingVoterId = await IDInfo.findOne({ voterId });
    if (existingAadhar && existingVoterId) {
      res.json({
        isUnique: false,
        message: "Aadhar and Voter ID must be unique",
      });
    } else if (existingAadhar) {
      res.json({ isUnique: false, message: "Aadhar must be unique" });
    } else if (existingVoterId) {
      res.json({ isUnique: false, message: "Voter ID must be unique" });
    } else {
      res.json({ isUnique: true });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false);
mongoose
  connect('mongodb+srv://admin:12345678Admin@devtaminapi.zpncstm.mongodb.net/Node-API?retryWrites=true&w=majority')
  .then(() => {
    console.log("connected to MongoDB");
    app.listen(3000, () => {
      console.log(`Node API app is running on port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
