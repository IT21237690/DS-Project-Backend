const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./db connection'); 
const userRoutes = require('./routes/userRoutes');




const app = express();
const PORT = process.env.PORT || 5001;


// Connect to the database
connectToDatabase();

app.use(cors());
app.use(express.json());



// Use the authentication routes
app.use('/api/user', userRoutes);
//app.use('/course', courseRoutes);


const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
