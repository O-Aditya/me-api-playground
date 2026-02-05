import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { validationError } from './errorHandler';

export const validateRequest = (schema: Joi.ObjectSchema) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {
            const message = error.details.map((detail) => detail.message).join(', ');
            return next(validationError(message));
        }

        req.body = value;
        next();
    };
};

// Validation schemas
export const profileSchema = Joi.object({
    name: Joi.string().max(255).required(),
    email: Joi.string().email().max(255).required(),
    education: Joi.string().allow('', null),
    githubUrl: Joi.string().uri().max(500).allow('', null),
    linkedinUrl: Joi.string().uri().max(500).allow('', null),
    portfolioUrl: Joi.string().uri().max(500).allow('', null),
});

export const skillSchema = Joi.object({
    name: Joi.string().max(100).required(),
    proficiency: Joi.string().max(50).allow('', null),
    yearsExperience: Joi.number().integer().min(0).allow(null),
});

export const projectSchema = Joi.object({
    title: Joi.string().max(255).required(),
    description: Joi.string().allow('', null),
    link: Joi.string().uri().max(500).allow('', null),
    skillsUsed: Joi.array().items(Joi.string()).allow(null),
    startDate: Joi.date().allow(null),
    endDate: Joi.date().allow(null),
});
