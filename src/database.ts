const mongoose =require('mongoose')
mongoose.connect('mongodb+srv://root:root@cluster0.8x627.mongodb.net/WebToken?retryWrites=true&w=majority')
.then(db => console.log('db is connect'))
.catch(err => console.log(err));