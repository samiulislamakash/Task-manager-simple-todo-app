const express = require('express')
const app = express()
require('./src/config/db.config.js')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use('/users', require('./src/module/user/user.controller'))
app.use('/lists', require('./src/module/list/list.controller'))
app.use('/tasks', require('./src/module/task/task.controller'))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.listen(port, () => {
    console.log('Server is listen ' + port)
})