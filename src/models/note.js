var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var NoteSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        "default": Date.now
    },
    user: { type: String }
});
module.exports = mongoose.model('Note', NoteSchema);
