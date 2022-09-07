const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const config = require('./config');
const playerRoutes = require('./routes/playerroutes')

const PORT = process.env.PORT || 5000

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyparser.json());


app.use('/api',playerRoutes.routes)

app.listen(PORT,()=>{
    console.log('server is runningon port ${PORT}');
});

