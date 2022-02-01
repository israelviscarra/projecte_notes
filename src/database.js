var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:root@cluster0.8x627.mongodb.net/WebToken?retryWrites=true&w=majority')
    .then(function (db) { return console.log('db is connect'); })["catch"](function (err) { return console.log(err); });
