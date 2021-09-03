const express = require('express');
const cors = require('cors')
const db = require('./config/mysql')
const logger = require('./utils/logger')
const studentRoutes= require('./student/router')
const usersRoutes = require('./user/router')
const hostelRoutes=require('./hostel/router')

global.__base = __dirname + '/'
const PORT = process.env.npm_package_config_port || 4000

const app = module.exports = express();

app.use(express.json())
app.options('*', cors())
app.use(cors())



app.get('/ping', function (req, res) {
    res.send('pong')
});


// Routes
app.use('/users', usersRoutes);
app.use('/hostel', hostelRoutes);
app.use('/student',studentRoutes);






db.connect(null, (err) => {
    if (err) {
      logger.log.info('Unable to connect to MySQL.');
      process.exit(1)
    } else {
      app.listen(PORT, async () => {
        logger.log.info(`App listening started on port ${PORT}`);
      })
    }
  })