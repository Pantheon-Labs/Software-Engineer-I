const clearIcon = document.querySelector(".clear-icon");
const searchBar = document.querySelector(".search");
const searchButton = document.querySelector(".search-button");

async function searchQuery() {
  let query = searchBar.value;
  if (query) {
    const res = await fetch("/artist?search=" + encodeURIComponent(query));
    const json = await res.json();
    console.log(json);
  }
}

clearIcon.addEventListener("click", () => {
  searchBar.value = "";
  clearIcon.style.visibility = "hidden";
});

searchBar.addEventListener("keyup", () => {
  if (searchBar.value && clearIcon.style.visibility != "visible") {
    clearIcon.style.visibility = "visible";
  } else if (!searchBar.value) {
    clearIcon.style.visibility = "hidden";
  }
});

searchBar.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    searchQuery();
  }
});

searchButton.addEventListener("click", searchQuery);
