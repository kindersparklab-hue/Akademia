// Mobile Navigation Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// WhatsApp Floating Widget Pop-up Control
const whatsappToggle = document.getElementById('whatsapp-toggle');
const whatsappPopup = document.getElementById('whatsapp-popup');
const closeWhatsapp = document.getElementById('close-whatsapp');

if (whatsappToggle && whatsappPopup) {
    whatsappToggle.addEventListener('click', () => {
        whatsappPopup.classList.toggle('hidden');
    });
}

if (closeWhatsapp && whatsappPopup) {
    closeWhatsapp.addEventListener('click', () => {
        whatsappPopup.classList.add('hidden');
    });
}

// Direct WhatsApp Admission Form Dispatch
const admissionForm = document.getElementById('admission-form');
const formSuccess = document.getElementById('form-success');

if (admissionForm) {
    admissionForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Extract input values safely
        const inputs = admissionForm.querySelectorAll('input, select, textarea');
        const studentName = inputs[0].value.trim();
        const parentName = inputs[1].value.trim();
        const phone = inputs[2].value.trim();
        const grade = inputs[3].value;
        const additionalMsg = inputs[4] ? inputs[4].value.trim() : '';

        // Construct formatted WhatsApp message string
        const whatsappNumber = '923104241477';
        let message = `🎓 *New Admission Inquiry - The Akademia Institute*\n\n` +
                      `*Student Name:* ${studentName}\n` +
                      `*Parent Name:* ${parentName}\n` +
                      `*Contact Number:* ${phone}\n` +
                      `*Grade / Program:* ${grade}`;

        if (additionalMsg) {
            message += `\n*Additional Query:* ${additionalMsg}`;
        }

        // Encode and open WhatsApp Web / App directly
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Show success UI state briefly before redirecting
        admissionForm.classList.add('hidden');
        if (formSuccess) {
            formSuccess.classList.remove('hidden');
        }

        // Open WhatsApp chat in a new tab
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
        }, 1000);
    });
}

// Three.js Abstract Subtle Starfield / Background Animation (Optional Polish)
const canvas = document.getElementById('bg-canvas');
if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create subtle particles
    const particleCount = 700;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 50;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
        size: 0.08,
        color: 0xd97706,
        transparent: true,
        opacity: 0.5
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 15;

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.y += 0.0005;
        particles.rotation.x += 0.0002;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
