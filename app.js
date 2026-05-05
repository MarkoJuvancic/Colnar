const categoryNames = {
  1: "Meteorologija",
  2: "Mornarska dela",
  3: "Motorji",
  4: "Navigacija",
  5: "Predpisi",
  6: "Pravila"
};

let activeCategory = 0;
let currentIndex = 0;
let filteredList = [];

function getFiltered() {
  return activeCategory === 0
    ? questions
    : questions.filter(q => q.cat === activeCategory);
}

function renderCard(index) {
  const container = document.getElementById("question-list");
  container.innerHTML = "";

  if (filteredList.length === 0) {
    container.innerHTML = "<p style='text-align:center;color:#789'>Ni vpra\u0161anj v tej kategoriji.</p>";
    return;
  }

  const item = filteredList[index];
  const catName = categoryNames[item.cat] || "";

  const card = document.createElement("div");
  card.className = "card";

  const btn = document.createElement("button");
  btn.className = "card-question";
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = `
    <span class="q-text">
      ${catName ? `<span class="card-meta">${catName}</span>` : ""}
      ${item.q}
    </span>
    <span class="toggle-icon"></span>
  `;

  const answer = document.createElement("div");
  answer.className = "card-answer";
  answer.textContent = item.a;

  btn.addEventListener("click", () => {
    const isOpen = card.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen);
  });

  card.appendChild(btn);
  card.appendChild(answer);
  container.appendChild(card);

  const counter = document.createElement("div");
  counter.className = "question-counter";
  counter.textContent = `${index + 1}/${filteredList.length}`;
  container.appendChild(counter);

  const nav = document.createElement("div");
  nav.className = "nav-bar";
  nav.innerHTML = `<button class="nav-btn">Naslednje vpra\u0161anje \u2192</button>`;
  nav.querySelector(".nav-btn").addEventListener("click", () => {
    currentIndex = randNext(currentIndex, filteredList.length);
    renderCard(currentIndex);
  });
  container.appendChild(nav);
}

function randNext(cur,len){if(len<=1)return 0;var n;do{n=Math.floor(Math.random()*len);}while(n===cur);return n;}
function render() {
  filteredList = getFiltered();
  currentIndex = randNext(-1, filteredList.length);
  renderCard(currentIndex);
}

document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = parseInt(btn.dataset.id, 10);
    render();
  });
});

render();
