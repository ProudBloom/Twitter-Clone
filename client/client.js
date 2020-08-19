const form = document.querySelector('form');
const loadingGif = document.querySelector('.loading');
const API_URL = 'http://localhost:8000/woofs';

loadingGif.style.display = 'none';


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
    loadingGif.style.display = 'block';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(woof),
        headers: {'content-type': 'application/json'}
    })
});