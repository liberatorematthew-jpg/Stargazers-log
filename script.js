const repositoryList = document.querySelector("#repository-list");
const repositoryStatus = document.querySelector("#repository-status");

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

  if (!Array.isArray(repositories) || repositories.length === 0) {
    repositoryStatus.textContent = "No starred repositories to show yet.";
    return;
  }

  const fragment = document.createDocumentFragment();

  for (const repository of repositories) {
    const item = document.createElement("li");
    item.className = "repository-card";

    const link = document.createElement("a");
    link.href = repository.url;
    link.textContent = `${repository.owner}/${repository.name}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const description = document.createElement("p");
    description.textContent = repository.description;

    const metadata = document.createElement("div");
    metadata.className = "repository-meta";

    const language = document.createElement("span");
    language.textContent = repository.language;

    const starredDate = document.createElement("span");
    starredDate.textContent = `Starred ${repository.starred_at}`;

    metadata.append(language, starredDate);
    item.append(link, description, metadata);
    fragment.append(item);
  }

  repositoryList.append(fragment);
  repositoryStatus.textContent = `${repositories.length} starred repositories`;
}

fetch("./events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status})`);
    }

    return response.json();
  })
  .then(renderRepositories)
  .catch((error) => {
    console.error("Failed to load starred repositories:", error);
    repositoryStatus.textContent = "Could not load repositories. Please try again later.";
  });
