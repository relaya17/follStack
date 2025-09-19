// Quiz check
document.getElementById("check-quiz")?.addEventListener("click", () => {
  const items = Array.from(document.querySelectorAll("#quiz-list > li"));
  let correct = 0;
  items.forEach((li, idx) => {
    const user = prompt(`שאלה ${idx + 1}: הזינו A/B/C/D`);
    const ans = (li.getAttribute("data-answer") || "").trim().toUpperCase();
    if ((user || "").trim().toUpperCase() === ans) correct++;
  });
  const out = document.getElementById("quiz-result");
  if (out) out.textContent = `נכון: ${correct} מתוך ${items.length}`;
});

// Simple memory game (pairs)
(function initMemory() {
  const terms = [
    ["typeof", "בודק טיפוס נתון"],
    ["falsy", '0, "", null, undefined, false'],
    ["map", "ממפה למערך חדש"],
    ["filter", "מסנן לפי תנאי"],
    ["reduce", "מצמצם לערך יחיד"],
    ["closure", "סגירה על משתנים לקסיקליים"],
  ];
  const cards = [];
  terms.forEach(([t, d]) => {
    (cards.push({ t, face: t }), cards.push({ t, face: d }));
  });
  // shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  const grid = document.getElementById("memory-grid");
  if (!grid) return;
  let flipped = [],
    matched = new Set();
  cards.forEach((c, idx) => {
    const el = document.createElement("div");
    el.className = "card";
    el.textContent = "❓";
    el.addEventListener("click", () => {
      if (matched.has(c.t) || el.classList.contains("flipped")) return;
      el.classList.add("flipped");
      el.textContent = c.face;
      flipped.push({ idx, c, el });
      if (flipped.length === 2) {
        const [a, b] = flipped;
        if (a.c.t === b.c.t && a.idx !== b.idx) {
          matched.add(a.c.t);
        } else {
          setTimeout(() => {
            a.el.classList.remove("flipped");
            a.el.textContent = "❓";
            b.el.classList.remove("flipped");
            b.el.textContent = "❓";
          }, 700);
        }
        flipped = [];
      }
    });
    grid.appendChild(el);
  });
})();
