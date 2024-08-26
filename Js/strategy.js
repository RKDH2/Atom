// 검색 데이터 목록
const data = [
  {
    title: "조작법",
    description:
      "기본 WSAD 조작법 \n W:위쪽 방향 이동 S:아래쪽 방향 이동 \n A: 왼쪽 방향 이동 D:오른쪽 방향 이동, 마우스 클릭: 공격 Tap: 무기 변경",
  },
  { title: "stage 1", description: "플레이 방법.." },
  { title: "stage 2", description: "플레이 방법..." },
  { title: "중간보스", description: "플레이 방법.." },
  { title: "stage 3", description: "플레이 방법.." },
  { title: "stage 4", description: "플레이 방법..." },
  { title: "최종보스", description: "플레이 방법..." },
];

// 검색어 입력 시 보여줄 제안 목록
const suggestionsData = [
  "조작법",
  "stage 1",
  "stage 2",
  "중간보스",
  "stage 3",
  "stage 4",
  "최종보스",
];

// 검색창에 키를 입력했을 때 이벤트 리스너 추가
document
  .getElementById("searchInput")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      // Enter 키를 눌렀을 때 검색 함수 호출
      search();
    }
    showSuggestions(); // 제안 목록 표시
    showQuestions(); // 질문 목록 표시
  });

// 검색 기능을 수행하는 함수
function search() {
  const query = document.getElementById("searchInput").value.toLowerCase(); // 검색어 소문자 변환
  const resultsContainer = document.getElementById("results"); // 결과를 표시할 컨테이너
  resultsContainer.innerHTML = ""; // 기존 결과 초기화

  // 검색어와 일치하는 데이터를 필터링
  const results = data.filter(
    (item) =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
  );

  // 검색 결과가 없을 경우
  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>"; // "결과가 없습니다." 메시지 표시
  } else {
    results.forEach((item) => {
      const resultItem = document.createElement("div");

      let descriptionContent = item.description;
      if (descriptionContent.startsWith("http")) {
        // 설명이 링크로 시작하는 경우
        descriptionContent = `<a href="${descriptionContent}" target="_blank">${descriptionContent}</a>`;
      }

      resultItem.innerHTML = `<h2>${item.title}</h2><p>${descriptionContent}</p>`;
      resultsContainer.appendChild(resultItem); // 결과를 결과 컨테이너에 추가
    });
  }
}

// 질문 목록을 표시하는 함수 (현재 함수에서 사용되지 않음)
function showQuestions() {
  const questionsContainer = document.getElementById("questions"); // 질문을 표시할 컨테이너
  questionsContainer.innerHTML = ""; // 기존 질문 초기화
  questions.forEach((question) => {
    const questionItem = document.createElement("div");
    questionItem.innerHTML = `<p>${question}</p>`;
    questionsContainer.appendChild(questionItem); // 질문을 컨테이너에 추가
  });
}

// 검색어와 일치하는 제안 목록을 표시하는 함수
function showSuggestions() {
  const query = document.getElementById("searchInput").value.toLowerCase(); // 검색어 소문자 변환
  const suggestionsContainer = document.getElementById("suggestions"); // 제안을 표시할 컨테이너
  suggestionsContainer.innerHTML = ""; // 기존 제안 초기화

  // 검색어와 일치하는 제안 필터링
  const suggestions = suggestionsData.filter((item) =>
    item.toLowerCase().includes(query)
  );

  // 일치하는 제안이 있는 경우
  if (suggestions.length > 0) {
    suggestions.forEach((item) => {
      const suggestionItem = document.createElement("div");
      suggestionItem.className = "suggestion-item"; // 제안 항목에 클래스 추가
      suggestionItem.innerHTML = `<p onclick="selectSuggestion('${item}')">${item}</p>`;
      suggestionsContainer.appendChild(suggestionItem); // 제안을 컨테이너에 추가
    });
  }
}

// 사용자가 제안을 클릭했을 때 해당 제안을 검색어로 설정하고 검색을 수행하는 함수
function selectSuggestion(suggestion) {
  document.getElementById("searchInput").value = suggestion; // 검색창에 제안 설정
  search(); // 검색 수행
}

// 스크롤 시 네비게이션 바의 상태를 변경하는 함수
const navbar = document.querySelector(".navbar");
const NavbarHeight = navbar.getBoundingClientRect().height; // 네비게이션 바의 높이 측정

document.addEventListener("scroll", () => {
  if (window.scrollY > NavbarHeight) {
    // 스크롤이 네비게이션 바 높이보다 커지면
    navbar.classList.add("active"); // active 클래스 추가
  } else {
    navbar.classList.remove("active"); // active 클래스 제거
  }
});
