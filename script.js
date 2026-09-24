// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Three.js 3D Animated Background (Particle Network & Floating Orbs)
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Particles
const particlesCount = 700;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Gold & Blue particle material
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.025,
    color: 0xd97706,
    transparent: true,
    opacity: 0.8,
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Floating 3D geometric accent shapes
const geometry1 = new THREE.IcosahedronGeometry(0.8, 0);
const material1 = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, wireframe: true, transparent: true, opacity: 0.25 });
const sphere1 = new THREE.Mesh(geometry1, material1);
sphere1.position.set(4, 2, -3);
scene.add(sphere1);

const geometry2 = new THREE.BoxGeometry(1, 1, 1);
const material2 = new THREE.MeshStandardMaterial({ color: 0xd97706, wireframe: true, transparent: true, opacity: 0.2 });
const cube2 = new THREE.Mesh(geometry2, material2);
cube2.position.set(-4, -2, -4);
scene.add(cube2);

// Lighting for 3D elements
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xd97706, 2, 50);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

camera.position.z = 5;

// Mouse move interaction
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    particlesMesh.rotation.y = elapsedTime * 0.03;
    particlesMesh.rotation.x = elapsedTime * 0.015;

    sphere1.rotation.x = elapsedTime * 0.2;
    sphere1.rotation.y = elapsedTime * 0.3;

    cube2.rotation.x = elapsedTime * 0.15;
    cube2.rotation.y = elapsedTime * -0.25;

    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

animate();

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Admission Form Handling
const admissionForm = document.getElementById('admission-form');
const formSuccess = document.getElementById('form-success');

admissionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    admissionForm.style.display = 'none';
    formSuccess.classList.remove('hidden');
});

// WhatsApp Popup Logic with Sound
const whatsappToggle = document.getElementById('whatsapp-toggle');
const whatsappPopup = document.getElementById('whatsapp-popup');
const closeWhatsapp = document.getElementById('close-whatsapp');
const popupSound = document.getElementById('popup-sound');

// Auto pop up after 3 seconds with sound
setTimeout(() => {
    if (whatsappPopup.classList.contains('hidden')) {
        whatsappPopup.classList.remove('hidden');
        popupSound.volume = 0.4;
        popupSound.play().catch(e => console.log("Audio autoplay restricted by browser policy"));
    }
}, 3000);

whatsappToggle.addEventListener('click', () => {
    whatsappPopup.classList.toggle('hidden');
    if (!whatsappPopup.classList.contains('hidden')) {
        popupSound.play().catch(e => {});
    }
});

closeWhatsapp.addEventListener('click', () => {
    whatsappPopup.classList.add('hidden');
});
