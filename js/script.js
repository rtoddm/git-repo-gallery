//Profile "overview" class
const profileOverview = document.querySelector(".overview");
const userName = "rtoddm";

//Github Profile Info - Async Function
const githubProfile = async function () {
  const profileInfo = await fetch(`https://api.github.com/users/${userName}`);
  const response = await profileInfo.json();
  console.log(response);

  displayUserData(response);
};

githubProfile();

const displayUserData = function (response) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
  <figure>
  <img alt="user avatar" src=${response.avatar_url} />
</figure>
<div>
  <p><strong>Name:</strong> ${response.name}</p>
  <p><strong>Bio:</strong> ${response.bio}</p>
  <p><strong>Location:</strong> ${response.location}</p>
  <p><strong>Number of public repos:</strong> ${response.public_repos}</p>
</div>
  `;

  profileOverview.append(div);
};
