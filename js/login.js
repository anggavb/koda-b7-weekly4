const loginForm = document.querySelector('.login-form-wrapper form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = emailInput.closest('.relative').querySelector('.error-msg');
const passwordError = passwordInput.closest('.relative').querySelector('.error-msg');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Reset errors
    emailError.classList.add('hidden');
    passwordError.classList.add('hidden');
    emailInput.classList.remove('border-red-500');
    passwordInput.classList.remove('border-red-500');

    if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required!';
        emailError.classList.remove('hidden');
        emailInput.classList.add('border-red-500');
        isValid = false;
    } else if (!emailInput.value.includes('@')) {
        emailError.textContent = 'Invalid email format!';
        emailError.classList.remove('hidden');
        emailInput.classList.add('border-red-500');
        isValid = false;
    }

    if (!passwordInput.value.trim()) {
        passwordError.textContent = 'Password is required!';
        passwordError.classList.remove('hidden');
        passwordInput.classList.add('border-red-500');
        isValid = false;
    }

    if (isValid) {
        const existingUsers = JSON.parse(localStorage.getItem('moviespace_users')) || [];
        const validUser = existingUsers.find(user => user.email === emailInput.value && user.password === passwordInput.value);

        // Mock authentication or localStorage authentication
        if ((emailInput.value === 'admin@moviespace.com' && passwordInput.value === 'password') || validUser) {
            window.location.href = 'pages/films.html';
        } else {
            passwordError.textContent = 'Invalid email or password!';
            passwordError.classList.remove('hidden');
        }
    }
});

// Clear errors on input
[emailInput, passwordInput].forEach(input => {
    input.addEventListener('input', function() {
        const err = this.closest('.relative').querySelector('.error-msg');
        err.classList.add('hidden');
        this.classList.remove('border-red-500');
    });
});
