import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { notFound } from '../middleware/errorHandler';

// Get all projects with optional skill filter
export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { skill } = req.query;

        let projects;

        if (skill) {
            // Filter projects by skill
            projects = await prisma.project.findMany({
                where: {
                    skillsUsed: {
                        array_contains: [skill as string],
                    },
                },
                orderBy: { createdAt: 'desc' },
            });
        } else {
            // Get all projects
            projects = await prisma.project.findMany({
                orderBy: { createdAt: 'desc' },
            });
        }

        res.json({
            success: true,
            data: projects.map(project => ({
                id: project.id,
                title: project.title,
                description: project.description,
                link: project.link,
                skillsUsed: project.skillsUsed,
                startDate: project.startDate,
                endDate: project.endDate,
            })),
        });
    } catch (error) {
        next(error);
    }
};

// Get specific project by ID
export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const project = await prisma.project.findUnique({
            where: { id: parseInt(id) },
        });

        if (!project) {
            return next(notFound(`Project with ID ${id}`));
        }

        res.json({
            success: true,
            data: {
                id: project.id,
                title: project.title,
                description: project.description,
                link: project.link,
                skillsUsed: project.skillsUsed,
                startDate: project.startDate,
                endDate: project.endDate,
            },
        });
    } catch (error) {
        next(error);
    }
};
