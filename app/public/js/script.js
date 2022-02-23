const button = document.getElementById("search-button");
const search = document.getElementById("search");

button.addEventListener("click", async () => {
  let searchText = search.value;
  if (searchText) {
    const res = await fetch("/artist?search=" + encodeURIComponent(searchText));
    const json = await res.json();
    console.log(json);
  }
});
