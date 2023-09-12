function fetchRandomUser() {
  return fetch("https://randomuser.me/api")
    .then(response => response.json())
    .then(data => data.results[0]);
}
function renderUser(user) {
  const userContainer = document.getElementById("user");
  userContainer.innerHTML = `
    <img src="${user.picture.large}" alt="User Photo">
    <p>Name: ${user.name.first} ${user.name.last}</p>
  `;
}


fetchRandomUser()
  .then(user => renderUser(user))
  .catch(error => console.error(error));