// Mailbox dimensions
const MAILBOX_EMPTY_DISTANCE = 30;
const MAILBOX_FULL_DISTANCE = 5;

document.addEventListener('DOMContentLoaded', () => {
    // Check auth
    auth.onAuthStateChanged(user => {
        if (!user) return window.location.href = 'index.html';
        document.getElementById('userEmail').textContent = user.email;

        // Load sensor data
        loadSensors();
    });

    // Logout button
    document.getElementById('logoutBtn').addEventListener('click', () => {
        auth.signOut();
    });

    // Open mailbox button
    document.getElementById('openMailboxBtn').addEventListener('click', openMailbox);
});

function loadSensors() {
    // Sensor references
    const sensors = {
        rain: db.ref('letterBoxWater'),
        animal: db.ref('postMotionBox'),
        ultrasonic: db.ref('letterBoxStorage'),
        access: db.ref('letterBoxAccess'),
        letters: db.ref('postLetterCount')
    };

    // Listen for real-time updates
    sensors.rain.on('value', snap => {
        const status = snap.val();
        document.getElementById('waterStatus').textContent =
            status ? 'Water Detected!' : 'No Water';
        document.getElementById('waterCard').className =
            `sensor-card ${status ? 'alert' : ''}`;
    });

    sensors.animal.on('value', snap => {
        const status = snap.val();
        document.getElementById('animalStatus').textContent =
            status ? 'Animal Detected!' : 'No Animals';
        document.getElementById('animalCard').className =
            `sensor-card ${status ? 'alert' : ''}`;
    });

    sensors.ultrasonic.on('value', snap => {
        const distance = snap.val();
        const percentage = calculateFillPercentage(distance);
        document.getElementById('fillLevel').style.width = `${percentage}%`;
        document.getElementById('fillText').textContent = `${percentage}%`;
        document.getElementById('distanceValue').textContent = `${distance} cm`;
    });

    sensors.access.on('value', snap => {
        const timestamp = snap.val();
        document.getElementById('lastAccess').textContent =
            timestamp ? new Date(timestamp).toLocaleString() : 'Never';
    });

    sensors.letters.on('value', snap => {
        document.getElementById('letterCount').textContent = snap.val() || 0;
    });
}

function calculateFillPercentage(distance) {
    const range = MAILBOX_EMPTY_DISTANCE - MAILBOX_FULL_DISTANCE;
    if (range <= 0) return 0;

    const currentFill = MAILBOX_EMPTY_DISTANCE - distance;
    let percentage = (currentFill / range) * 100;
    percentage = Math.max(0, Math.min(100, percentage));

    return Math.round(percentage);
}

function openMailbox() {
    const cmdRef = db.ref('openMailboxCommand');
    cmdRef.set(true)
        .then(() => {
            setTimeout(() => cmdRef.set(false), 3000);
            alert('Mailbox opening command sent!');
        })
        .catch(error => {
            alert('Error: ' + error.message);
        });
}