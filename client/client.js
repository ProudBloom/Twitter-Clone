const form = document.querySelector('form');
const loadingGif = document.querySelector('.loading');
const woofsElement = document.querySelector('.woofs');
const API_URL = 'http://localhost:8000/woofs';

loadingGif.style.display = '';

listWoofs();

function listWoofs()
{
    woofsElement.innerHTML = '';
    fetch(API_URL).then(response => response.json()).then((woofs) => 
    {
        woofs.reverse();
        woofs.forEach(woof => 
        {
            const div = document.createElement('div');
            const header = document.createElement('h3');
            const contents = document.createElement('p');
            const date = document.createElement('small');

            header.textContent = woof.userName;
            contents.textContent = woof.message;
            date.textContent = new Date(woof.created);

            div.appendChild(header);
            div.appendChild(contents);
            div.appendChild(date);

            woofsElement.appendChild(div);
            loadingGif.style.display = 'none';
        })
    });
}

form.addEventListener('submit', (event) =>
{
    event.preventDefault(); //Prevent the default behaviour

    const formData = new FormData(form);
    const userName = formData.get('name');
    const message = formData.get('content');
    
    const woof = 
    {
        userName,
        message,
    };

    form.style.display = 'none'
    loadingGif.style.display = '';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(woof),
        headers: {'content-type': 'application/json'}
    })
        .then(response => response.json()).then(createdWoof => {
            console.log(createdWoof);
            form.reset();
            setTimeout(() => {
                form.style.display = ''
            }, 30000)
            listWoofs();
        });
});