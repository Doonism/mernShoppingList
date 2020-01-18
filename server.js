const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items')

// Create an instance of express
const app = express();

// Bodyparser Middleware
app.use(bodyParser.json())

// DB config
const db = require('./config/keys').mongoURI;

// Connect to mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connection Established'))
  .catch(error => console.log(error))

// Use Routes
app.use('/api/items', items)


// So unless we are hitting the above api (app.use('/api/items')) and any other routes inside
// Then we want to load the index.html file to load our front end.

// Serve static assets (create the build folder) if in production.
if(process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res)=> {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on PORT ${port}`));

