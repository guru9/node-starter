const mongoose = require('mongoose');
const passport = require('passport');
const app = require('./server/app');

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB connected to:', db))
  .catch(err => console.log('Error while connecting to MongoDB:', err));

//passport middleware
app.use(passport.initialize());

//Passport config
require('./server/api/users/middleware/Authentication/passport')(passport);

//Listening server port
const port = process.env.PORT || 5000;

app.listen(port, err => {
  if (err) {
    console.log('Error:' + err);
  }
  console.log(`Server running on port: ${port}`);
});
