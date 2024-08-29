const data = [
  {
    title: "버그 제보",
    description:
      "https://docs.google.com/forms/d/1yNpDtUdPTE8RZ6wqsiferUI5V9axPieeltRR9QLAuCM/edit",
  },
  {
    title: "게임 플레이 방법",
    description:
      '기본 WASD조작 + 마우스를 이용한 공격, Tab키를 활용하여 무기전환. 자세한 조작법은 "공략 노트" 페이지를 참고해 주세요.',
  },
  { title: "전화 문의", description: "010 6828 2374" },
  {
    title: "게임 공략",
    description: '자세한 내용은 게임 "공략 노트" 페이지를 참고해주십시오',
  },
  {
    title: "게임 플레이 후기",
    description:
      "https://docs.google.com/forms/d/1vhVgFXKJ4XyxDV1DKnTkD405g-qcPDwK1VyffpiFJ9s/edit",
  },
];

const suggestionsData = [
  "버그 제보",
  "플레이 방법",
  "전화 문의",
  "게임 공략",
  "게임 플레이 후기",
];

document
  .getElementById("searchInput")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      search();
    }
    showSuggestions();
    showQuestions();
  });

function search() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  const results = data.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
  } else {
    results.forEach((item) => {
      const resultItem = document.createElement("div");

      let descriptionContent = item.description;
      if (descriptionContent.startsWith("http")) {
        descriptionContent = `<a href="${descriptionContent}" target="_blank">${descriptionContent}</a>`;
      }

      resultItem.innerHTML = `<h2>${item.title}</h2><p>${descriptionContent}</p>`;
      resultsContainer.appendChild(resultItem);
    });
  }
}

function showQuestions() {
  const questionsContainer = document.getElementById("questions");
  questionsContainer.innerHTML = "";
  questions.forEach((question) => {
    const questionItem = document.createElement("div");
    questionItem.innerHTML = `<p>${question}</p>`;
    questionsContainer.appendChild(questionItem);
  });
}

function showSuggestions() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const suggestionsContainer = document.getElementById("suggestions");
  suggestionsContainer.innerHTML = "";

  const suggestions = suggestionsData.filter((item) =>
    item.toLowerCase().includes(query)
  );

  if (suggestions.length > 0) {
    suggestions.forEach((item) => {
      const suggestionItem = document.createElement("div");
      suggestionItem.className = "suggestion-item";
      suggestionItem.innerHTML = `<p onclick="selectSuggestion('${item}')">${item}</p>`;
      suggestionsContainer.appendChild(suggestionItem);
    });
  }
}

function selectSuggestion(suggestion) {
  document.getElementById("searchInput").value = suggestion;
  search();
}

const navbar = document.querySelector(".navbar");
const NavbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY > NavbarHeight) {
    navbar.classList.add("active");
  } else {
    navbar.classList.remove("active");
  }
});
