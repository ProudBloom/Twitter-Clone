const form = document.querySelector('form');
const loadingGif = document.querySelector('.loading');

loadingGif.style.display = 'none';


form.addEventListener('submit', (event) =>
{
    event.preventDefault(); //Prevent the default behaviour

    const formData = new FormData(form);
    const userName = formData.get('name');
    const message = formData.get('content');

    const tweet = {
        userName,
        message,
    };

    console.log(tweet);

    form.style.display = 'none'
    loadingGif.style.display = 'block';
});