// 获取 canvas 元素及其上下文
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

// 设置 canvas 大小为窗口大小
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// 定义粒子类
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; // 随机大小 1-4
        this.speedX = Math.random() * 1 - 0.5; // 随机速度 X 方向
        this.speedY = Math.random() * 1 - 0.5; // 随机速度 Y 方向
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`; // 半透明白色
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // 边界检测，让粒子在屏幕内循环移动
        if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

let particles = [];
const particleCount = 100; // 粒子数量

// 初始化粒子
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// 动画循环函数
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }

    requestAnimationFrame(animateParticles); // 请求下一帧
}

animateParticles(); // 启动动画

// 可选：动态改变欢迎词
const highlightElement = document.getElementById('highlight');
const greetings = ["热烈欢迎", "诚挚欢迎", "恭候多时", "期待已久"];
let greetingIndex = 0;

setInterval(() => {
    greetingIndex = (greetingIndex + 1) % greetings.length;
    highlightElement.textContent = greetings[greetingIndex];
}, 2000); // 每2秒切换一次