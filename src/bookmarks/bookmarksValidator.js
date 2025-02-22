const Joi = require('joi');
const { POST_TYPES } = require('../../constant');

const createBookmarkValidator = Joi.object({
  postType: Joi.string()
    .valid(...Object.values(POST_TYPES))
    .required()
    .messages({
      'string.empty': 'Post Type is required',
      'any.required': 'Post Type is required',
    }),
  postId: Joi.string().required().messages({
    'string.empty': 'ID of post is required',
    'any.required': 'ID of post is required',
  }),
  title: Joi.string().required().messages({
    'string.empty': 'Title is required',
    'any.required': 'Title is required',
  }),
});

const updateBookmarkValidator = Joi.object({
  title: Joi.string().optional(),
  isRead: Joi.boolean().optional(),
});

module.exports = {
  createBookmarkValidator,
  updateBookmarkValidator,
};
