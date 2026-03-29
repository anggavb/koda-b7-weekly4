const registerForm = document.querySelector('.register-form-wrapper form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');

const emailError = emailInput.closest('.relative').querySelector('.error-msg');
const passwordError = passwordInput.closest('.relative').querySelector('.error-msg');
const confirmError = confirmInput.closest('.relative').querySelector('.error-msg');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Reset errors
    [emailError, passwordError, confirmError].forEach(el => el.classList.add('hidden'));
    [emailInput, passwordInput, confirmInput].forEach(el => el.classList.remove('border-red-500'));

    const existingUsers = JSON.parse(localStorage.getItem('moviespace_users')) || [];
    const isUserExists = existingUsers.some(user => user.email === emailInput.value);

    // Basic Email validation
    if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
        emailError.textContent = 'Valid email is required!';
        emailError.classList.remove('hidden');
        emailInput.classList.add('border-red-500');
        isValid = false;
    } else if (emailInput.value === 'admin@moviespace.com' || isUserExists) { // Mock existing user
        emailError.textContent = 'User already exists!';
        emailError.classList.remove('hidden');
        emailInput.classList.add('border-red-500');
        isValid = false;
    }

    // Basic Password validation
    if (!passwordInput.value.trim() || passwordInput.value.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters!';
        passwordError.classList.remove('hidden');
        passwordInput.classList.add('border-red-500');
        isValid = false;
    }

    // Confirm Password validation
    if (passwordInput.value !== confirmInput.value) {
        confirmError.textContent = 'Passwords do not match!';
        confirmError.classList.remove('hidden');
        confirmInput.classList.add('border-red-500');
        isValid = false;
    }

    if (isValid) {
        existingUsers.push({ email: emailInput.value, password: passwordInput.value });
        localStorage.setItem('moviespace_users', JSON.stringify(existingUsers));
        alert('Registration successful! Redirecting to login...');
        window.location.href = './';
    }
});

// Clear errors on input
[emailInput, passwordInput, confirmInput].forEach(input => {
    input.addEventListener('input', function() {
        const err = this.closest('.relative').querySelector('.error-msg');
        err.classList.add('hidden');
        this.classList.remove('border-red-500');
    });
});
