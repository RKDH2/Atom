const data = [
    { title: '버그 제보', description: 'https://docs.google.com/forms/d/e/1FAIpQLScoqTRI0DLrU1LU51CK_m6lABcAXrJDIiYS6E0u8aBGW43Fvw/viewform?vc=0&c=0&w=1&flr=0' },
    { title: '게임 플레이 방법', description: '플레이 방법..' },
    { title: '전화 문의', description: '010-4407-9105.' },
    { title: '게임 공략', description: '----------------------- 자세한 내용은 게임 공략 페이지를 참고해주십시오'},
    { title: '게임 플레이 후기', description: 'https://docs.google.com/forms/d/e/1FAIpQLSdTsNLvkmlgfKlqKm5xTyC0bSpUKoWDyNFSc60hkWfg-dma5Q/viewform?vc=0&c=0&w=1&flr=0' }
];

const suggestionsData = [
    '버그 제보', '플레이 방법', '전화 문의', '게임 공략', '게임 플레이 후기'
];

document.getElementById('searchInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        search();
    }
    showSuggestions();
    showQuestions();
});

function search() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    const results = data.filter(item => 
        item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query)
    );

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    } else {
        results.forEach(item => {
            const resultItem = document.createElement('div');
            
            let descriptionContent = item.description;
            if (descriptionContent.startsWith('http')) {
                descriptionContent = `<a href="${descriptionContent}" target="_blank">${descriptionContent}</a>`;
            }

            resultItem.innerHTML = `<h2>${item.title}</h2><p>${descriptionContent}</p>`;
            resultsContainer.appendChild(resultItem);
        });
    }
}

function showQuestions() {
    const questionsContainer = document.getElementById('questions');
    questionsContainer.innerHTML = '';
    questions.forEach(question => {
        const questionItem = document.createElement('div');
        questionItem.innerHTML = `<p>${question}</p>`;
        questionsContainer.appendChild(questionItem);
    });
}

function showSuggestions() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const suggestionsContainer = document.getElementById('suggestions');
    suggestionsContainer.innerHTML = '';

    const suggestions = suggestionsData.filter(item => item.toLowerCase().includes(query));

    if (suggestions.length > 0) {
        suggestions.forEach(item => {
            const suggestionItem = document.createElement('div');
            suggestionItem.className = 'suggestion-item';
            suggestionItem.innerHTML = `<p onclick="selectSuggestion('${item}')">${item}</p>`;
            suggestionsContainer.appendChild(suggestionItem);
        });
    }
}

function selectSuggestion(suggestion) {
    document.getElementById('searchInput').value = suggestion;
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
