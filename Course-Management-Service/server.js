const express = require('express');
const { connectToDatabase } = require('./db'); 
const cors = require('cors');
const courseRoutes = require('./routes/courseRoutes');



const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());

app.use(cors());
// Connect to the database
connectToDatabase();



app.use('/api/course', courseRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
