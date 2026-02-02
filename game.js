const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let myPos = { x: 300, y: 300 };
let otherPlayers = {};

// Реєстрація та вхід
async function register() {
    const e = document.getElementById('email').value;
    const p = document.getElementById('pass').value;
    await auth.createUserWithEmailAndPassword(e, p);
}
async function login() {
    const e = document.getElementById('email').value;
    const p = document.getElementById('pass').value;
    await auth.signInWithEmailAndPassword(e, p);
}

auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('auth').style.display = 'none';
        document.getElementById('ui').style.display = 'block';
        startHeartbeat();
        gameLoop();
    }
});

// Відправка позиції в Firebase
function startHeartbeat() {
    setInterval(() => {
        db.collection('players').doc(auth.currentUser.uid).set({
            x: myPos.x, y: myPos.y, email: auth.currentUser.email
        });
    }, 100);

    db.collection('players').onSnapshot(snap => {
        snap.forEach(doc => {
            if (doc.id !== auth.currentUser.uid) otherPlayers[doc.id] = doc.data();
        });
    });
}

// Керування
window.onkeydown = (e) => {
    if (e.key === 'w') myPos.y -= 10;
    if (e.key === 's') myPos.y += 10;
    if (e.key === 'a') myPos.x -= 10;
    if (e.key === 'd') myPos.x += 10;
};

function gameLoop() {
    ctx.fillStyle = "#222"; // Колір асфальту
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Малюємо тебе (Жовтий)
    ctx.fillStyle = "yellow";
    ctx.fillRect(myPos.x, myPos.y, 40, 40);

    // Малюємо інших (Сині)
    ctx.fillStyle = "blue";
    for (let id in otherPlayers) {
        ctx.fillRect(otherPlayers[id].x, otherPlayers[id].y, 40, 40);
    }

    requestAnimationFrame(gameLoop);
}