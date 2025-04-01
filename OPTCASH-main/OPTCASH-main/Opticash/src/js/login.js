document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = document.querySelector('.btn');
    const originalEmailPlaceholder = emailInput.placeholder;
    const originalPasswordPlaceholder = passwordInput.placeholder;

    const setErrorStyle = (input, message) => {
        input.value = '';
        input.placeholder = message;
        input.style.border = '2px solid #ff0000';
        input.style.backgroundColor = '#fff0f0';
    };

    const resetStyle = (input, placeholder) => {
        input.style.border = '';
        input.style.backgroundColor = '';
        input.placeholder = placeholder;
    };

    const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = password => password.length >= 12;

    submitButton.addEventListener('click', e => {
        e.preventDefault();
        let isValid = true;

        if (!validateEmail(emailInput.value.trim())) {
            setErrorStyle(emailInput, 'Email incorrecte');
            isValid = false;
        }

        if (!validatePassword(passwordInput.value.trim())) {
            setErrorStyle(passwordInput, 'Mot de passe incorrecte');
            isValid = false;
        }

        if (isValid) {
            console.log('Formulaire valide !');
            //Alert de connexion réussie
        }
    });

    emailInput.addEventListener('input', () => resetStyle(emailInput, originalEmailPlaceholder));
    passwordInput.addEventListener('input', () => resetStyle(passwordInput, originalPasswordPlaceholder));
});
