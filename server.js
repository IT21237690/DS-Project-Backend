const express = require('express');
const { connectToDatabase } = require('./db'); 
// const userRoutes = require('./routes/userRoutes');
const courseRoutes = require('./routes/courseRoutes');
// const timetableRoutes = require('./routes/timetableRoutes');
// const adminRoutes = require('./routes/adminRoutes'); 
// const classroomRoutes = require('./routes/classroomRoutes'); 


const app = express();
const PORT = process.env.PORT || 5000;


// Connect to the database
connectToDatabase();

app.use(express.json());

// Use the authentication routes
// app.use('/user', userRoutes);
app.use('/course', courseRoutes);
// app.use('/timetable', timetableRoutes);
// app.use('/admin', adminRoutes);
// app.use('/classroom', classroomRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
