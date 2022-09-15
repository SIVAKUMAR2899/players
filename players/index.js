const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const config = require('./config');
const userRoutes = require('./routes/userroutes')

const PORT = process.env.PORT || 5000

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyparser.json());


app.use('/api',userRoutes.routes)

app.listen(PORT,()=>{
    console.log('server is runningon port ${PORT}');
});

