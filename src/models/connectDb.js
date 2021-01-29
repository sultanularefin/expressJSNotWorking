const mongoose = require('mongoose');
const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL);
};

const db = mongoose.connection;

console.log("_______db is:_______",db);

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
});


// module.exports = db;

module.exports = {connectDb,db};
// export default connectDb;
