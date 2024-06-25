document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');

    if (localStorage.getItem('registrationSuccess')) {
        localStorage.removeItem('registrationSuccess');
        showPopup(popup);
    }

    document.getElementById('registrationForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                name,
                email,
                password
            })
        });

        if (response.ok) {
            localStorage.setItem('registrationSuccess', 'true');
            window.location.href = '/';
        } else {
            alert('Error registering user');
        }
    });
});

function showPopup(popup) {
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 1000);
}
