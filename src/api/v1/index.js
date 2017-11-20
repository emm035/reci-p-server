import { Router } from 'express';

import { createUser, follow, unfollow } from './users/mutations';
import { getUsers, getUser } from './users/queries';

import { createRecipe, updateRecipe, deleteRecipe } from './recipes/mutations';
import { getRecipes, getRecipe } from './recipes/queries';

const v1 = new Router();

//======//
// USER //
//======//

/* Create a user
  Expects the request body to be in the form:
  {
    "username": "user_name",
    "displayname": "Display Name",
    "id": "identifier"
  }
 */
v1.post('/users', (req, res) => {
  createUser(res, req.body);
});

// Retrieve
v1.get('/users/:id', (req, res) => {
  const { id } = req.params;
  getUser(res, id);
});

/* Retrieve MULTIPLE users
  Available query params are:
  - username   : searches for usernames with a match to the partial one given
  - followedBy : returns all users followed by the given user id
 */
v1.get('/users', (req, res) => {
  getUsers(res, req.query);
});

// Follow
v1.post('/users/:follower/follow/:target', (req, res) => {
  const { follower, target } = req.params;
  follow(res, follower, target);
});

// Unfollow
v1.delete('/users/:follower/follow/:target', (req, res) => {
  const { follower, target } = req.params;
  unfollow(res, follower, target);
});

// Retrieve a user's recipes
v1.get('/users/:id/recipes', (req, res) => {
  const { id } = req.params;
  getRecipes(res, { id });
});

// Retrieve feed
v1.get('/users/:id/feed', (req, res) => {
  const { id } = req.params;
  getRecipes(res, { feed: id });
});

//=========//
// RECIPES //
//=========//

// Create
v1.post('/recipes', (req, res) => {
  createRecipe(res, res.body);
});

// Retreive
v1.get('/recipes/:id', (req, res) => {
  const { id } = req.params;
  getRecipe(res, id);
});

// Update
v1.put('/recipes/:id', (req, res) => {
  const { id } = req.params;
  updateRecipe(res, id, req.body);
});

// Delete
v1.delete('/recipes/:id', (req, res) => {
  const { id } = req.params;
  deleteRecipe(res, id);
});

export default v1;