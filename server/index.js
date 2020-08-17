const express = require('express');     //Add a library using node

const app = express();

app.get('/', (request, response) =>
{
    response.json(
        {
            messgae: 'Hello!',
        }
    )
});

app.listen(5000, () =>
{
    console.log('Listening on 5000')
});