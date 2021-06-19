const express = require('express');
const app = express();
const cors = require('cors');
const socketio = require('socket.io');
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// mongoose config setup
// this is the equivalent of running the code from that file right here!
require('./config/mongoose.config');

// routes setup
// import what was exported, and then invoke that function with app as the argument
//    to the returned / imported / required function
require('./routes/covid.routes')(app);

const server = app.listen(port, () => console.log("your server is running for covid data!"));

const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: [ 'GET', 'POST' ],
    allowedHeaders: [ '*' ],
  }
});

// start listening for clients wanting to connect
io.on("connection", (socket) => {
  console.log('Server side of socket id: ' + socket.id);

  // .on() is for listening to conversation / events from clients
  socket.on("added_covid", (data) => {
    console.log(data);

    // emits an event to all clients other than this particular one, referenced by the socket variable
    //    the one that originally sent us this message
    socket.broadcast.emit("covid_added", data);

  })

  socket.on("deleted_covid", (data) => {
    console.log("covid deleted - covid ID: " + data);
    socket.broadcast.emit("covid_deleted", data);
  })

})