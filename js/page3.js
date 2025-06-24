document.addEventListener('DOMContentLoaded', function () {
    const phone = sessionStorage.getItem('phone') || '-';
    const name = sessionStorage.getItem('name') || '-';
    const birthday = sessionStorage.getItem('birthday') || '-';
    const email = sessionStorage.getItem('email') || '-';

    document.getElementById('summaryPhone').textContent = phone;
    document.getElementById('summaryName').textContent = name;
    document.getElementById('summaryBirthday').textContent = birthday;
    document.getElementById('summaryEmail').textContent = email;

    document.getElementById('editBtn').addEventListener('click', function () {
        sessionStorage.setItem('editing', 'true'); // flag to trigger prefill
        window.location.href = 'page2.html';
    });
});