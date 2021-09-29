const Joi = require("joi");

// Lost Item Validation
exports.lostItem = (item) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    category: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(2).max(255).required(),
    imageURI: Joi.string().max(255).required(),
    dateLost: Joi.string().min(2).max(255).required(),
    state: Joi.string().min(2).max(255).required(),
    town: Joi.string().min(2).max(255).required(),
    preciseLocation: Joi.string().max(255).required(),
    reward: Joi.string().min(2).max(255).required(),
  }).unknown();

  return schema.validate(item);
};

// Found Item Validation
exports.foundItem = (item) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    category: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(2).max(255).required(),
    imageURI: Joi.string().min(2).max(255).required(),
    dateFound: Joi.string().min(2).max(255).required(),
    state: Joi.string().min(2).max(255).required(),
    town: Joi.string().min(2).max(255).required(),
    preciseLocation: Joi.string().max(255).required(),
    reward: Joi.string().min(2).max(255).required(),
  }).unknown();

  return schema.validate(item);
};
