var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;

const uri = "mongodb+srv://mihajlo:instagram%2Dinternship@instagram-internship-nzjce.mongodb.net/test?retryWrites=true&w=majority";


mongoose.connect(uri);

module.exports = {mongoose}