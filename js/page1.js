document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const phoneInput = document.getElementById('phone').value.trim();
    const fullPhone = `+60${phoneInput}`;

    if (fullPhone === '+60173527250') {
        sessionStorage.setItem('phone', fullPhone);
        window.location.href = 'page2.html';
    } else {
        alert('Only +60173527250 is allowed to check loyalty points.');
    }
});
