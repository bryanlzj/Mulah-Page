document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const noEmailCheckbox = document.getElementById('noEmail');
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');

    const nameError = document.getElementById('nameError');
    const birthdayError = document.getElementById('birthdayError');
    const emailError = document.getElementById('emailError');

    // Prefill form if editing
    const isEditing = sessionStorage.getItem('editing') === 'true';
    if (isEditing) {
        nameInput.value = sessionStorage.getItem('name') || '';
        const email = sessionStorage.getItem('email') || '';
        const birthday = sessionStorage.getItem('birthday') || '';
        const [day, month, year] = birthday.split('/');

        if (day) dayInput.value = day;
        if (month) monthInput.value = month;
        if (year) yearInput.value = year;

        if (email === 'N/A') {
            noEmailCheckbox.checked = true;
            emailInput.disabled = true;
            emailInput.value = '';
        } else {
            emailInput.value = email;
        }

        sessionStorage.removeItem('editing');
    }

    // 🔴 Show all errors on load
    nameError.style.display = 'block';
    birthdayError.style.display = 'block';
    if (!noEmailCheckbox.checked) {
        emailError.style.display = 'block';
    }

    // ✅ Real-time name validation
    nameInput.addEventListener('input', function () {
        if (nameInput.value.trim()) {
            nameError.style.display = 'none';
        } else {
            nameError.style.display = 'block';
        }
    });

    // ✅ Real-time birthday validation
    [dayInput, monthInput, yearInput].forEach(field => {
        field.addEventListener('input', () => {
            if (dayInput.value && monthInput.value && yearInput.value) {
                birthdayError.style.display = 'none';
            } else {
                birthdayError.style.display = 'block';
            }
        });
    });

    // ✅ Email checkbox behavior
    noEmailCheckbox.addEventListener('change', function () {
        if (this.checked) {
            emailInput.disabled = true;
            emailInput.value = '';
            emailError.style.display = 'none';
        } else {
            emailInput.disabled = false;
            if (!validateEmail(emailInput.value.trim())) {
                emailError.style.display = 'block';
            }
        }
    });

    // ✅ Real-time email validation
    emailInput.addEventListener('input', function () {
        const value = emailInput.value.trim();
        if (!noEmailCheckbox.checked && validateEmail(value)) {
            emailError.style.display = 'none';
        } else if (!noEmailCheckbox.checked) {
            emailError.style.display = 'block';
        }
    });

    // On form submit
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = nameInput.value.trim();
        const day = dayInput.value.trim();
        const month = monthInput.value.trim();
        const year = yearInput.value.trim();
        const email = emailInput.value.trim();
        const noEmail = noEmailCheckbox.checked;

        let isValid = true;

        if (!name) {
            nameError.style.display = 'block';
            isValid = false;
        }

        if (!day || !month || !year) {
            birthdayError.style.display = 'block';
            isValid = false;
        }

        if (!noEmail && !validateEmail(email)) {
            emailError.style.display = 'block';
            isValid = false;
        }

        if (!isValid) return;

        const birthday = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('birthday', birthday);
        sessionStorage.setItem('email', noEmail ? 'N/A' : email);

        window.location.href = 'page3.html';
    });

    // ✅ Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});