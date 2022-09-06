const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8085;
const bodyparser = require('body-parser');
const routes = require('./routes.js');
const server = require('http').createServer(app);

app.use(cors());
app.use(bodyparser.json())


server.listen(port, () => {
    console.log('Server started at port ' + `http://localhost:${port}/api/`)
});

app.use('/api', routes);