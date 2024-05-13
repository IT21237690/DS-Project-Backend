const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./db connection'); 
const userRoutes = require('./routes/userRoutes');
const authorizeUser = require('./controllers/authorization');



const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// Connect to the database
connectToDatabase();

app.use(express.json());



// Use the authentication routes
 app.use('/api/user', userRoutes);

 app.get('/authorize', (req, res) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ authorized: false });
  }

  const authorizationResult = authorizeUser(token);
  //console.log(authorizationResult)

  return res.status(authorizationResult.authorized ? 200 : 403).json(authorizationResult);
});


const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
