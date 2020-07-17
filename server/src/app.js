const express = require('express')
const app = express()
require('./db/mongoose')
const cors = require('cors')


/** Middleware Start */

// load in routes
const ListRoute = require('./router/lists')
const TaskRoute = require('./router/task')
const UserRoute = require('./router/user')

const port = process.env.PORT || 3000;

// CORS origin middleware 
app.use(cors())
app.use(express.json())
app.use(ListRoute)
app.use(TaskRoute)
app.use(UserRoute)


app.get('/',(req, res)=>{
    res.status(200).send('Hello server is working')
})



/** Middleware End */

app.listen(port, () => {
    console.log('Server is listen ' + port)
})