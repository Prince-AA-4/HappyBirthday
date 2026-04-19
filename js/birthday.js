const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const colors = [
  "#ff6eb4",
  "#ff3d7f",
  "#ffd700",
  "#ff9de2",
  "#c97bff",
  "#fff",
  "#ffb347",
  "#ff69b4",
];
const particles = [];

for (let i = 0; i < 160; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 7 + 3,
    d: Math.random() * 160 + 40,
    color: colors[Math.floor(Math.random() * colors.length)],
    tilt: Math.floor(Math.random() * 10) - 10,
    tiltAngle: 0,
    tiltAngleInc: Math.random() * 0.07 + 0.05,
    shape: Math.random() > 0.5 ? "circle" : "rect",
  });
}

let angle = 0;
function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  angle += 0.01;
  particles.forEach((p, i) => {
    p.tiltAngle += p.tiltAngleInc;
    p.y += (Math.cos(angle + p.d) + 2.5 + p.r / 2) * 0.9;
    p.x += Math.sin(angle) * 1.2;
    p.tilt = Math.sin(p.tiltAngle - i / 3) * 15;
    if (p.y > canvas.height) {
      p.x = Math.random() * canvas.width;
      p.y = -20;
    }
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.globalAlpha = 0.85;
    if (p.shape === "circle") {
      ctx.arc(p.x + p.tilt, p.y, p.r, 0, 2 * Math.PI);
    } else {
      ctx.save();
      ctx.translate(p.x + p.tilt, p.y);
      ctx.rotate(p.tiltAngle);
      ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      ctx.restore();
    }
    ctx.fill();
    ctx.globalAlpha = 1;
  });
  requestAnimationFrame(drawConfetti);
}
drawConfetti();

const heartsEl = document.getElementById("hearts");
const heartChars = ["♥", "❤", "💕", "💗", "💓"];
for (let i = 0; i < 18; i++) {
  const h = document.createElement("span");
  h.className = "heart";
  h.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
  h.style.left = Math.random() * 100 + "%";
  h.style.fontSize = Math.random() * 18 + 12 + "px";
  h.style.animationDuration = Math.random() * 8 + 7 + "s";
  h.style.animationDelay = Math.random() * 8 + "s";
  heartsEl.appendChild(h);
}

function openModal() {
  document.getElementById("modalOverlay").classList.add("open");
}
function closeModal() {
  document.getElementById("modalOverlay").classList.remove("open");
}
document.getElementById("modalOverlay").addEventListener("click", function (e) {
  if (e.target === this) closeModal();
});
