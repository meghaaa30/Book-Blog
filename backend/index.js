const connectTo = require('./db')
const bodyParser = require('body-parser');
const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000;

app.use(bodyParser.json());

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/addreviews', require('./routes/addreviews'))


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

connectTo();