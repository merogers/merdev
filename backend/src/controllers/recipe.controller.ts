import { type RequestHandler } from 'express';
import { ObjectIdSchema } from '../schema/user';
import { CreateRecipeSchema } from '../schema/recipe';
import Recipe from '../models/recipe';
import createError from 'http-errors';

const createRecipeHandler: RequestHandler = async (req, res, next) => {
  try {
    // User Input Validation
    CreateRecipeSchema.parse(req.body);

    // Check if recipe exists
    const recipeExists = await Recipe.findOne({ name: req.body.name });
    if (recipeExists !== null) return next(createError(400, 'Recipe already exists'));

    const newRecipe = new Recipe({
      name: req.body.name,
      cookTime: req.body.cookTime || null,
      prepTime: req.body.prepTime || null,
      temperature: req.body.temperature || null,
      description: req.body.description,
      method: req.body.method,
      ingredients: req.body.ingredients,
    });
    await newRecipe.save();

    // Return Response
    res.status(201).json({
      newRecipe,
    });
  } catch (error) {
    next(error);
  }
};

export const readAllRecipesHandler: RequestHandler = async (_req, res, next) => {
  try {
    // Return Recipes
    const recipes = await Recipe.find();
    if (recipes === null) return next(createError(404, 'No Recipes found'));

    res.status(200).json({
      recipes,
    });
  } catch (error) {
    next(error);
  }
};

export const readRecipeHandler: RequestHandler = async (req, res, next) => {
  try {
    // Make sure Params are correct is of the right type
    ObjectIdSchema.parse(req.params);

    const recipeExists = await Recipe.findOne({ _id: req.params.id });
    if (recipeExists === null) return next(createError(404, 'Recipe not found'));

    res.status(200).json({
      recipe: recipeExists,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRecipeHandler: RequestHandler = async (req, res, next) => {
  try {
    ObjectIdSchema.parse(req.params);
    // TODO: Add Body Validation
    const recipeExists = await Recipe.findByIdAndUpdate(req.params.id, {
      ...req.body,
    });
    if (recipeExists === null) return next(createError(404, 'User not found'));
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export const deleteRecipeHandler: RequestHandler = async (req, res, next) => {
  try {
    ObjectIdSchema.parse(req.params);
    const recipeExists = await Recipe.findOne({ _id: req.params.id });
    if (recipeExists === null) return next(createError(404, 'Recipe not found'));
    await Recipe.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

export default createRecipeHandler;
