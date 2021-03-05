const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://TodoDB:TodoDB@cluster0.eykna.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Successfull')
}).catch((e) => {
    console.log('Not connected in MongoDB ')
    console.log(e)
})