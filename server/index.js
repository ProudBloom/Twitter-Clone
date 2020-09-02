const express = require('express');     //Add a library using node
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');

const app = express();                  //Add cors as a middleware to handle the headers
const db = monk('localhost/woofer');
const woofs_collection = db.get('woofs');          //Get the collection (or cretae if doesen't exist)
const filter = new Filter();

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

app.get('/woofs', (request, response) =>
    {
        woofs_collection.find().then(woofs => 
            {
                response.json(woofs);
            });
    });

//Placing necessary to limit only post requests
app.use(rateLimit({
    windowMs: 30 * 1000, //1 woof every 30s
    max: 1
}));

app.post('/woofs', (request, response) => 
{
    if(isWoofValid(request.body))
    {
        //Add to DB
        const woof = {
            userName: filter.clean(request.body.userName.toString()),
            message: filter.clean(request.body.message.toString()),
            created: new Date(),
        }

        woofs_collection.insert(woof).then(createdWoof => {
            response.json(createdWoof);
            console.log(createdWoof);
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