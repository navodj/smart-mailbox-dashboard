document.addEventListener('DOMContentLoaded', () => {
    // Check auth state
    auth.onAuthStateChanged(user => {
        if (user) window.location.href = 'dashboard.html';
    });

    // Email login
    document.getElementById('emailLogin').addEventListener('submit', e => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        auth.signInWithEmailAndPassword(email, password)
            .catch(error => {
                document.getElementById('loginError').textContent = error.message;
            });
    });

    // Google login
    document.getElementById('googleLogin').addEventListener('click', () => {
        auth.signInWithPopup(googleProvider)
            .catch(error => {
                document.getElementById('loginError').textContent = error.message;
            });
    });
});