//Profile "overview" class
const profileOverview = document.querySelector(".overview");
//GitHub Username
const userName = "rtoddm";
const repoList = document.querySelector(".repo-list");

//Selects <section> where all repo information appears -- includes an unordered list
const repos = document.querySelector(".repos");
//Selects the <section> where the inddividual repo data will appear
const repoData = document.querySelector(".repo-data");

//Selects the "Back to Repo Gallery Button" -- "view-repos" class
const viewReposButton = document.querySelector(".view-repos");
//Selects Input Element
const filterInput = document.querySelector(".filter-repos");

//Github Profile Info - Async Function
const githubProfile = async function () {
  const profileInfo = await fetch(`https://api.github.com/users/${userName}`);
  const response = await profileInfo.json();
  console.log(response);

  displayUserData(response);
};

githubProfile();

// Function to Display User Info from JSON Response
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
  fetchRepos();
};

//Function to Fetch Repos - Async Function
const fetchRepos = async function () {
  const repos = await fetch(
    `https://api.github.com/users/${userName}/repos?sort=updated&per_page=100`
  );
  //console.log(repos);
  const usersRepos = await repos.json();
  console.log(usersRepos);

  displayRepos(usersRepos);
};

//Function to Display Info about Repos
const displayRepos = function (usersRepos) {
  for (let elem of usersRepos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${elem.name}</h3>`;
    repoList.append(li);
  }
  filterInput.classList.remove("hide");
};

//EventListener to Grab the Name of the Repo That's Clicked
repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    specificRepo(repoName);
  }
});

//Function to Grab Specific Repo Info
const specificRepo = async function (repoName) {
  const fetchRepoInfo = await fetch(
    `https://api.github.com/repos/${userName}/${repoName}`
  );
  const repoInfo = await fetchRepoInfo.json();

  //Grab Languages
  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData);

  const languages = [];
  for (let elem in languageData) {
    languages.push(elem);
  }

  //   console.log(languages);

  displayInfo(repoInfo, languages);
};

//Function to Display Specific Repo Info
const displayInfo = function (repoInfo, languages) {
  repoData.innerHTML = "";
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${
    repoInfo.html_url
  }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  repoData.append(newDiv);
  repoData.classList.remove("hide");
  repos.classList.add("hide");
  viewReposButton.classList.remove("hide");
};

viewReposButton.addEventListener("click", function () {
  repos.classList.remove("hide");
  repoData.classList.add("hide");
  viewReposButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
  const searchTextValue = e.target.value;
  const repos = document.querySelectorAll(".repo");
  const lowercaseSearch = searchTextValue.toLowerCase();

  for (let elem of repos) {
    const lowerCaseInnerText = elem.innerText.toLowerCase();
    if (lowerCaseInnerText.includes(lowercaseSearch)) {
      elem.classList.remove("hide");
    } else {
      elem.classList.add("hide");
    }
    console.log(typeof repos);
  }
});
