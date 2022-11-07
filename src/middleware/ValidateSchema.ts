import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import Logging from '../library/Logging';
import { IAuthor } from '../models/Author';

export const ValidateSchema = (schema: ObjectSchema) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await schema.validateAsync(req.body);
		} catch (error) {
			Logging.error(error);
			return res.status(422).json({ error });
		}
	};
};

export const Schemas = {
	author: {
		create: Joi.object<IAuthor>({
			name: Joi.string().required,
		}),
		update: Joi.object<IAuthor>({
			name: Joi.string().required(),
		}),
	},
};
