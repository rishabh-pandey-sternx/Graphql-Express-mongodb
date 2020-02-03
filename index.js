import app from './app';
import config from './config/config';
import mongoose from 'mongoose';

mongoose.connect(config.DB);
var db = mongoose.connection;
db.on('error', () => { console.log('FAILED to connect to mongoose') })
db.once('open', () => {
    console.log('Connected to MongoDb')
})

app.listen(config.PORT, () => { console.log("Express Server is Running @ Port -> 3000!!!") })