
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;
const FILE_PATH = "formData.json";


app.use(bodyParser.json());


app.post("/form", (req, res) => {
  const formData = req.body;

  
  if (!formData.id || !Array.isArray(formData.fields)) {
    return res.status(400).json({
      message: "Invalid form structure. Must include 'id' and 'fields' (array).",
    });
  }

  
  fs.writeFile(FILE_PATH, JSON.stringify(formData, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to save form data." });
    }
    res.status(201).json({ message: "Form data saved successfully." });
  });
});


app.get("/form", (req, res) => {
 
  fs.readFile(FILE_PATH, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        return res.status(404).json({ message: "No form data found." });
      }
      return res.status(500).json({ message: "Failed to retrieve form data." });
    }

    res.status(200).json(JSON.parse(data));
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
