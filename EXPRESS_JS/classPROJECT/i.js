const express = require("express");
const app = express();

 
app.use(express.json());

 
let feedbacks = [];
 
app.post("/feedback", (req, res) => {
   const { customerName, email, message, rating } = req.body;

   if (!customerName || !email || !message || !rating) {
    res.send("Please fill all details!");
    return;
  }

 
  feedbacks.push({ customerName, email, message, rating });

  res.send("Thank you! Your feedback has been submitted.");
});

 app.get("/average-rating", (req, res) => {
  if (feedbacks.length === 0) {
    res.send("No feedbacks available yet.");
    return;
  }

  let total = 0;

   for (let i = 0; i < feedbacks.length; i++) {
    total = total + Number(feedbacks[i].rating);
  }

   let average = total / feedbacks.length;

  res.send("Average rating is: " + average.toFixed(2));
});

 app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});