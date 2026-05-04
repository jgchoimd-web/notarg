const plain = document.getElementById("plain");
const keyword = document.getElementById("keyword");
const result = document.getElementById("result");
const slots = document.getElementById("keySlots");

function normalizeKey() {
  const key = keyword.value.toUpperCase().replace(/[^A-Z]/g, "");
  keyword.value = key || "KILP";
  renderSlots(keyword.value);
  return keyword.value;
}

function vigenere(text, key, dir = 1) {
  let out = "";
  let i = 0;
  for (const ch of text) {
    const code = ch.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      const shift = key.charCodeAt(i % key.length) - 65;
      const moved = ((code - 65 + dir * shift + 26) % 26) + 65;
      out += String.fromCharCode(moved);
      i++;
    } else if (code >= 97 && code <= 122) {
      const shift = key.charCodeAt(i % key.length) - 65;
      const moved = ((code - 97 + dir * shift + 26) % 26) + 97;
      out += String.fromCharCode(moved);
      i++;
    } else {
      out += ch;
    }
  }
  return out;
}

function renderSlots(key) {
  slots.innerHTML = "";
  [...key.slice(0, 8)].forEach((c) => {
    const div = document.createElement("div");
    div.className = "slot";
    div.textContent = c;
    slots.appendChild(div);
  });
}

document.getElementById("encryptBtn").addEventListener("click", () => {
  const key = normalizeKey();
  result.value = vigenere(plain.value, key, 1);
});

document.getElementById("decryptBtn").addEventListener("click", () => {
  const key = normalizeKey();
  result.value = vigenere(plain.value, key, -1);
});

document.getElementById("copyBtn").addEventListener("click", async () => {
  await navigator.clipboard.writeText(result.value);
});

normalizeKey();

const canvas = document.getElementById("rain");
const ctx = canvas.getContext("2d");
const cols = 140;
const drops = Array(cols).fill(0);
function rain() {
  ctx.fillStyle = "rgba(2, 3, 8, 0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < cols; i++) {
    const x = (i * canvas.width) / cols;
    const h = 4 + Math.random() * 16;
    const y = drops[i];
    ctx.fillStyle = ["#3950ff", "#6be8ff", "#9f8dff", "#ffffff"][Math.floor(Math.random() * 4)];
    ctx.fillRect(x, y, 3, h);
    drops[i] = y > canvas.height ? -20 : y + h + Math.random() * 8;
  }
  requestAnimationFrame(rain);
}
rain();
