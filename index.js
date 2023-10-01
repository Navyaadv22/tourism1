const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // Import the path module

const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect("mongodb+srv://navyagowda:anusha@cluster0.psvlhbx.mongodb.net/tourr",{ useNewUrlParser: true}, {useUnifiedTopology: true });

// Create a MongoDB schema and model for the form data
const formDataSchema = new mongoose.Schema({
  yourname: String,
  youremailid: String
  
  // Changed from Number to String
});

const FormData = mongoose.model('FormData', formDataSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the entire project directory as static files
app.use(express.static(path.join(__dirname, '/')));

app.post('/', function (req, res) {
  // Create a new instance of the FormData model
  let formData = new FormData({
    yourname: req.body.yourname,
    youremailid: req.body.youremailid
  
  });

  formData.save()
    .then(() => {
      res.redirect("./Contact/Thankyou/thankyou.html");
    })
    .catch((error) => {
      res.status(500).send('Error saving form data.');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
function showThankYouMessage() {
  alert("Thank you for your response! We will reach out to you soon.");
}