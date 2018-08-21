Quick Start

## 1)Database connection

# a) create 'config' folder

# b) inside config create 'keys.js' file

# c) create your mlab db

# d) copy paste your db link into keys.js as below

module.exports = {
mongoURI : 'your mlab database',
secretKey: 'secret'
};

or connect to your localhost

## 2) Installation

npm install

# Run
nodemon server.js
