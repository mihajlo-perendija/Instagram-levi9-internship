var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;

const uri = "mongodb://mihajlo:instagraminternship@instagram-internship-shard-00-00-nzjce.mongodb.net:27017,instagram-internship-shard-00-01-nzjce.mongodb.net:27017,instagram-internship-shard-00-02-nzjce.mongodb.net:27017/Instagram?ssl=true&replicaSet=instagram-internship-shard-0&authSource=admin&retryWrites=true&w=majority";



mongoose.connect(uri, (err) => {
        if(err) {
            console.log('Some problem with the connection ' +err);
        } else {
            console.log('The Mongoose connection is ready');
        }
});

module.exports = {mongoose}