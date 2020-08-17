const express = require('express');     //Add a library using node
const cors = require('cors');

const app = express();                  //Add cors as a middleware to handle the headers

app.use(cors());
app.use(express.json());                //Parses JSON body of the POST request

app.get('/', (request, response) =>
{
    response.json(
        {
            messgae: 'Hello!',
        }
    )
});

app.post('/woofs', (request, response) => 
{
    console.log(request.body);
});

app.listen(5000, () =>
{
    console.log('Listening on 5000')
});