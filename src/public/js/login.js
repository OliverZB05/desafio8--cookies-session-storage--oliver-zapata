const form = document.getElementById('loginForm');

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
        } else {
            result.json().then(data => {
                Swal.fire({
                    title: data.status === 'warning' ? 'Advertencia!' : 'Error!',
                    text: data.warning || data.error,
                    icon: data.status === 'warning' ? 'warning' : 'error',
                    showConfirmButton: false,
                    timer: 3000
                });
            });
        }
    })
})
