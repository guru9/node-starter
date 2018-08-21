const JwtStrategy = require('passport-jwt').Strategy; //Add jwt passport strategy
const ExtractJwt = require('passport-jwt').ExtractJwt; //Extrcting required strategy
const mongoose = require('mongoose');
const User = mongoose.model('users'); //Require user model
const keys = require('../../../../../config/keys'); //Require keys

//add jwt request options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;

//Exporting strategy for authentication and process with payload
module.exports = passport => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			User.findById(jwt_payload.id)
				.then(user => {
					if (user) {
						return done(null, user);
					}
					//return false if no user
					return done(null, false);
				})
				.catch(err => new Error('Error:', err));
		})
	);
};
