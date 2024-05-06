const mongoose = require('mongoose')

const mongoURL = process.env.MONGODB_URL || 'mongodb://localhost:27017/user_jwt_auth_app';

const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(mongoURL).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
})

const db = mongoose.connection;

db.on('disconnected', () => {
    console.warn('MongoDB connection disconnected');
})
db.on('reconnected', () => {
    console.info('MongoDB connection reconnected');
})

module.exports = db;
