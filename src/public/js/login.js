/* const form = document.getElementById('loginForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            window.location.replace('/');
        }
    })
}) */

/* const form = document.getElementById('loginForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
            window.location.replace('/');
        }
    })
}) */

const form = document.getElementById('loginForm');

/* form.addEventListener('submit', e => {
    e.preventDefault();
    console.log('Form submitted'); // Verifica si el evento de envío del formulario se está activando
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    console.log(`Form data: ${JSON.stringify(obj)}`); // Verifica si los datos del formulario se están recopilando correctamente


    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    
    
    .then(result => {
        console.log(`Response status: ${result.status}`); // Verifica si se está recibiendo una respuesta del servidor
        if (result.status === 200) {
            window.location.replace('/');
        }
    })
    
}) */

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/sessions/login', {
        method: 'POST',
        body: new URLSearchParams(obj),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(result => {
        if (result.status === 200) {
            window.location.replace('/products');
        }
    })
})

/* form.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const response = await fetch('/api/sessions/login', {
        method: 'POST',
        body: formData
    });
    const data = await response.json();
    if (data.status === 'success') {
        // Redirigir al usuario a la página de productos
        window.location.href = '/products';
    } else {
        // Manejar error
    }
}); */
