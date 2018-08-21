const router = require('express').Router();

// import api files
const userRoutes = require('./users/routes/users');

// use dummy routes
router.get('/api/mern', (req, res) => res.send('Hello Mern-user!'));

// Routes for user
router.use('/api/users', userRoutes);

//exporting all router
module.exports = router;
