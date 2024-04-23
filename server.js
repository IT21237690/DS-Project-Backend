const express = require('express');
const { connectToDatabase } = require('./db'); 
const courseRoutes = require('./routes/courseRoutes');



const app = express();
const PORT = process.env.PORT || 5000;


// Connect to the database
connectToDatabase();

app.use(express.json());

app.use('/course', courseRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
