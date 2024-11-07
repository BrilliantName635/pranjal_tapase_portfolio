document.addEventListener("DOMContentLoaded", () => {
    const homeSection = document.getElementById("home");
    if (homeSection) {
        const canvas = document.createElement('canvas');
        canvas.id = 'round';
        homeSection.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const MAX_PARTICLES = 280;
        const COLOURS = ['#69D2E7', '#A7DBD8', '#E0E4CC', '#F38630', '#FA6900', '#FF4E50', '#F9D423'];

        const particles = [];
        const pool = [];

        class Particle {
            constructor(x, y, radius) {
                this.init(x, y, radius);
            }

            init(x, y, radius) {
                this.alive = true;
                this.radius = radius || 10;
                this.wander = 0.15;
                this.theta = Math.random() * Math.PI * 2;
                this.drag = 0.92;
                this.color = '#fff';

                this.x = x || 0.0;
                this.y = y || 0.0;

                this.vx = 0.0;
                this.vy = 0.0;
            }

            move() {
                this.x += this.vx;
                this.y += this.vy;

                this.vx *= this.drag;
                this.vy *= this.drag;

                this.theta += (Math.random() - 0.5) * this.wander;
                this.vx += Math.sin(this.theta) * 0.1;
                this.vy += Math.cos(this.theta) * 0.1;

                this.radius *= 0.96;
                this.alive = this.radius > 0.5;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        function spawn(x, y) {
            if (particles.length >= MAX_PARTICLES) {
                pool.push(particles.shift());
            }

            const radius = Math.random() * 35 + 5;
            const particle = pool.length ? pool.pop() : new Particle();
            particle.init(x, y, radius);

            particle.wander = Math.random() * 1.5 + 0.5;
            particle.color = COLOURS[Math.floor(Math.random() * COLOURS.length)];
            particle.drag = Math.random() * 0.09 + 0.9;

            const theta = Math.random() * Math.PI * 2;
            const force = Math.random() * 6 + 2;

            particle.vx = Math.sin(theta) * force;
            particle.vy = Math.cos(theta) * force;

            particles.push(particle);
        }

        function update() {
            for (let i = particles.length - 1; i >= 0; i--) {
                const particle = particles[i];
                if (particle.alive) {
                    particle.move();
                } else {
                    pool.push(particles.splice(i, 1)[0]);
                }
            }
        }

        function draw() {
            ctx.globalCompositeOperation = 'lighter';
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.draw();
            });
        }

        function loop() {
            update();
            draw();
            requestAnimationFrame(loop);
        }

        // Only spawn particles when the mouse is within the "home" section
        canvas.addEventListener('mousemove', (event) => {
            const homeRect = homeSection.getBoundingClientRect();
            if (
                event.clientY >= homeRect.top &&
                event.clientY <= homeRect.bottom
            ) {
                const maxParticles = Math.floor(Math.random() * 4) + 1;
                for (let i = 0; i < maxParticles; i++) {
                    spawn(event.clientX, event.clientY);
                }
            }
        });

        loop();
    }
});
