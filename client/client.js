const form = document.querySelector('form');


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
});