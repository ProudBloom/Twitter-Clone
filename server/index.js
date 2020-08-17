const express = require('express');     //Add a library using node

const app = express();

app.listen(5000, () =>
{
    console.log('Listening on 5000')
});