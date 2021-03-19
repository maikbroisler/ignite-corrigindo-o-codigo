const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", async(request, response) => {
  return response.status(200).json(repositories);
});

app.post("/repositories", async (request, response) => {
  const { title, url, techs } = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", async (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const repository = { 
    ...repositories[repositoryIndex],
    title, 
    techs, 
    url
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", async (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", async (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  ++repositories[repositoryIndex].likes;

  return response.json(repositories[repositoryIndex]);
});

module.exports = app;
