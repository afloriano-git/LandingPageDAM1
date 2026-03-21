const card = document.querySelector('#presentationFrame');
const spotlight = document.querySelector('#spotlight');

let targetX = 10; let targetY = 90;
let currentX = 90; let currentY = 10;

card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    targetX = ((e.clientX - rect.left) / rect.width) * 100;
    targetY = ((e.clientY - rect.top) / rect.height) * 100;
});

card.addEventListener('mouseleave', () => {
    targetX = 10; targetY = 90; 
});


function animate() {
    let dx = targetX - currentX;
    let dy = targetY - currentY;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let force = getDynamicForce(distance);

    currentX += dx * force;
    currentY += dy * force;

    spotlight.style.background = `radial-gradient(
        circle at ${currentX}% ${currentY}%, 
        #cba4efff 10%,
        #a855f7 25%,
        #8809ffff 20%,    
        transparent 80%
    )`;

    requestAnimationFrame(animate);
}

function getDynamicForce(distance) {
    let normalizedDist = Math.min(distance / 120, 1);
    let power = Math.pow(normalizedDist, 2);

    const minForce = 0.03;
    const maxForce = 0.4;

    return minForce + (maxForce - minForce) * power;
}

animate();