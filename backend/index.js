const connectTo= require('./db')

const express = require('express')
var cors= require('cors')
const app = express()
const port=5000;


app.use(cors())
app.use(express.json())
// respond with "hello world" when a GET request is made to the homepage


app.use('/api/authentication', require('./routes/authentication'))
 app.use('/api/addreviews', require('./routes/addreviews'))


app.listen(port, ()=>{
    console.log(`successfully built on port http://localhost:${port}`)
})

connectTo();