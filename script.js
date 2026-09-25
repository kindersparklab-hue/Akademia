// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-xl', 'bg-akademiaDark/90');
    } else {
        navbar.classList.remove('shadow-xl', 'bg-akademiaDark/90');
    }
});

// WhatsApp Floating Chat Popup Toggle
const whatsappToggle = document.getElementById('whatsapp-toggle');
const whatsappPopup = document.getElementById('whatsapp-popup');
const closeWhatsapp = document.getElementById('close-whatsapp');
const popupSound = document.getElementById('popup-sound');

if (whatsappToggle && whatsappPopup) {
    whatsappToggle.addEventListener('click', () => {
        whatsappPopup.classList.toggle('hidden');
        if (!whatsappPopup.classList.contains('hidden') && popupSound) {
            popupSound.play().catch(e => console.log("Audio play prevented:", e));
        }
    });
}

if (closeWhatsapp && whatsappPopup) {
    closeWhatsapp.addEventListener('click', () => {
        whatsappPopup.classList.add('hidden');
    });
}

// Admission Form WhatsApp Dynamic Compilation & Dispatch
const admissionForm = document.getElementById('admission-form');
const formSuccess = document.getElementById('form-success');

if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = admissionForm.querySelectorAll('input, select, textarea');
        const studentName = inputs[0].value;
        const parentName = inputs[1].value;
        const phone = inputs[2].value;
        const grade = inputs[3].value;
        const message = inputs[4] ? inputs[4].value : '';

        const whatsappNumber = '923104241477';
        const text = `*New Admission Inquiry - The Akademia Institute*%0A%0A*Student Name:* ${encodeURIComponent(studentName)}%0A*Parent Name:* ${encodeURIComponent(parentName)}%0A*Phone Number:* ${encodeURIComponent(phone)}%0A*Grade Level:* ${encodeURIComponent(grade)}%0A*Additional Message:* ${encodeURIComponent(message)}`;

        admissionForm.classList.add('hidden');
        if (formSuccess) {
            formSuccess.classList.remove('hidden');
        }

        setTimeout(() => {
            window.location.href = `https://wa.me/${whatsappNumber}?text=${text}`;
        }, 1500);
    });
}

// Three.js Background Animation
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 700;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.025,
        color: 0xd97706,
        transparent: true,
        opacity: 0.7
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    // Animation loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        particlesMesh.rotation.y = elapsedTime * 0.03 + mouseX * 0.2;
        particlesMesh.rotation.x = elapsedTime * 0.02 + mouseY * 0.2;

        renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
