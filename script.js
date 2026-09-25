// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking outside or on a link
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-xl', 'bg-akademiaDark/95');
        } else {
            navbar.classList.remove('shadow-xl', 'bg-akademiaDark/95');
        }
    }
});

// WhatsApp Floating Chat Popup Toggle & Mobile Fix
const whatsappToggle = document.getElementById('whatsapp-toggle');
const whatsappPopup = document.getElementById('whatsapp-popup');
const closeWhatsapp = document.getElementById('close-whatsapp');

if (whatsappToggle && whatsappPopup) {
    whatsappToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        whatsappPopup.classList.toggle('hidden');
    });
}

if (closeWhatsapp && whatsappPopup) {
    closeWhatsapp.addEventListener('click', (e) => {
        e.stopPropagation();
        whatsappPopup.classList.add('hidden');
    });
}

// Admission Form WhatsApp Dynamic Compilation & Mobile Fallback Dispatch
const admissionForm = document.getElementById('admission-form');
const formSuccess = document.getElementById('form-success');

if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const studentName = document.getElementById('student-name').value;
        const parentName = document.getElementById('parent-name').value;
        const phone = document.getElementById('phone-number').value;
        const grade = document.getElementById('grade-level').value;
        const message = document.getElementById('additional-msg').value;

        const whatsappNumber = '923104241477';
        const text = `*New Admission Inquiry - The Akademia Institute*%0A%0A*Student Name:* ${encodeURIComponent(studentName)}%0A*Parent Name:* ${encodeURIComponent(parentName)}%0A*Phone Number:* ${encodeURIComponent(phone)}%0A*Grade Level:* ${encodeURIComponent(grade)}%0A*Additional Message:* ${encodeURIComponent(message)}`;

        admissionForm.classList.add('hidden');
        if (formSuccess) {
            formSuccess.classList.remove('hidden');
        }

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;

        // Reliable dispatch for both mobile and desktop browsers
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1200);
    });
}

// Three.js Background Animation
const canvas = document.getElementById('bg-canvas');
if (canvas) {
    try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 500;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 20;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.025,
            color: 0xd97706,
            transparent: true,
            opacity: 0.6
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        camera.position.z = 3;

        let mouseX = 0;
        let mouseY = 0;

        window.addEventListener('mousemove', (event) => {
            mouseX = event.clientX / window.innerWidth - 0.5;
            mouseY = event.clientY / window.innerHeight - 0.5;
        });

        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            particlesMesh.rotation.y = elapsedTime * 0.02 + mouseX * 0.15;
            particlesMesh.rotation.x = elapsedTime * 0.01 + mouseY * 0.15;

            renderer.render(scene, camera);
        }

        animate();

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    } catch (err) {
        console.log("Three.js initialization skipped:", err);
    }
}
