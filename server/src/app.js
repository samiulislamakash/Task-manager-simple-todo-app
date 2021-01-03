const express = require('express')
const app = express()
require('./db/mongoose')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

/** Middleware Start */
const port = process.env.PORT || 3000;

// CORS origin middleware 
app.use(cors())
app.use(express.json())
app.use(require('./router/lists'))
app.use(require('./router/task'))
app.use(require('./router/user'))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


app.get('/', (req, res) => {
    res.status(200).send('Hello server is working')
})

/** Middleware End */

app.listen(port, () => {
    console.log('Server is listen ' + port)
})