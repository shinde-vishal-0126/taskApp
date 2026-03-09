require('dotenv').config();
const express = require('express');
const server = express();
let port = process.env.PORT || 3000


server.listen(port, () => {
    console.log(`server start on port ${port}`)
})