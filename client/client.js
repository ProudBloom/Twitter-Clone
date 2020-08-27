const form = document.querySelector('form');
const loadingGif = document.querySelector('.loading');
const woofsElement = document.querySelector('.woofs');
const API_URL = 'http://localhost:8000/woofs';

loadingGif.style.display = '';

listWoofs();

function listWoofs()
{
    fetch(API_URL).then(response => response.json()).then((woofs) => {
        console.log(woofs);
        woofs.forEach(woof => {
            const div = document.createElement('div');
            const header = document.createElement('h3');
            const contents = document.createElement('p');

            header.textContent = woof.userName;
            contents.textContent = woof.message;

            div.appendChild(header);
            div.appendChild(contents);

            woofsElement.appendChild(div);
        })
    });
}

form.addEventListener('submit', (event) =>
{
    event.preventDefault(); //Prevent the default behaviour

    const formData = new FormData(form);
    const userName = formData.get('name');
    const message = formData.get('content');
    
    const woof = {
        userName,
        message,
    };

    form.style.display = 'none'
    loadingGif.style.display = '';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(woof),
        headers: {'content-type': 'application/json'}
    }).then(response => response.json()).then(createdWoof => {
        console.log(createdWoof);
        form.style.display = ''
        loadingGif.style.display = 'none';
        form.reset();
    })
});