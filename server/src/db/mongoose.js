const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb/TaskManager',{
    useCreateIndex:true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Connected to MongoDB Successfull')
}).catch((e)=>{
    console.log('Not connected in MongoDB ')
    console.log(e)
})
