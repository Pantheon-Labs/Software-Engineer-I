const button = document.getElementById("search-button");
const search = document.getElementById("search");

button.addEventListener("click", async () => {
  const res = await fetch("/get?search=" + encodeURIComponent(search.value));
  const json = await res.json();
  console.log(JSON.stringify(json, 4));
});
