const connectTo = require('./db')

const express = require('express')
var cors = require('cors')
const app = express()
const port = 5000;


app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/addreviews', require('./routes/addreviews'))
app.use('/api/books', require('./routes/books'))


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

connectTo();