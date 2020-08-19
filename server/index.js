const express = require('express');     //Add a library using node
const cors = require('cors');
const monk = require('monk');

const app = express();                  //Add cors as a middleware to handle the headers
const db = monk('localhost/woofer');
const woofs = db.get('woofs');


app.use(cors());
app.use(express.json());                //Parses JSON body of the POST request

function isWoofValid(woof)
{
    return woof.userName && woof.userName.toString().trim() !== '' && woof.message && woof.message.toString().trim() !== '';
}

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
    if(isWoofValid(request.body))
    {
        //Add to DB
        const woof = {
            userName: request.body.userName.toString(),
            message: request.body.message.toString(),
            created: new Date(),
        }

        woofs.insert().then(createdWoof => {
            response.json(createdWoof);
        })
    }
    else
    {
        response.status(422);
        response.json({
            messgae: 'Name and content are required.'
        });
    }
    
});

app.listen(8000, () =>
{
    console.log('Listening on http://localhost:8000')
});