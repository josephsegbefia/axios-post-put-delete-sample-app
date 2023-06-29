// routes/movie-characters.routes.js

const express = require("express");
const router = express.Router();
const ApiService = require("../services/api.service");
const apiService = new ApiService();

// List all the characters from the API.
router.get("/movie-characters/list", (req, res) => {
  apiService
    .getAllCharacters()
    .then((response) => {
      // uncomment the line below
      res.render("pages/characters-list", { characters: response.data });
    })
    .catch((error) => console.log(error));
});

// Render a form to create a new character.
router.get("/movie-characters/create", (req, res) => {
  // add the line below
  res.render("pages/new-character-form");
});

// Submit info to create a new character.
router.post("/movie-characters/create", (req, res) => {
  const characterInfo = req.body;

  apiService
    .createCharacter(characterInfo)
    .then((response) => {
      // uncomment the line below
      res.redirect("/movie-characters/list");
    })
    .catch((error) => console.log(error));
});

// Render a form to edit a character.
router.get("/movie-characters/edit/:id", (req, res) => {
  const characterId = req.params.id;

  apiService
    .getOneCharacter(characterId)
    .then((response) => {
      // add the line below
      res.render("pages/edit-character-form", { character: response.data });
    })
    .catch((error) => console.log(error));
});

// Submit info to edit a character with a matching id.
router.post("/movie-characters/edit/:id", (req, res) => {
  const characterId = req.params.id;
  const characterInfo = req.body;

  apiService
    .editCharacter(characterId, characterInfo)
    .then((response) => {
      // uncomment the line below
      res.redirect("/movie-characters/list");
    })
    .catch((error) => console.log(error));
});

// Delete a character with a matching id
router.get("/movie-characters/delete/:id", (req, res) => {
  const characterId = req.params.id;

  apiService
    .deleteCharacter(characterId)
    .then((response) => {
      // uncomment the line below
      res.redirect(`/movie-characters/list`);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
