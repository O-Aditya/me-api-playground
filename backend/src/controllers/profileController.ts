import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { notFound, conflict } from '../middleware/errorHandler';
import logger from '../utils/logger';

// Get complete profile with all relations
export const getProfile = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const profile = await prisma.profile.findFirst({
            include: {
                skills: {
                    orderBy: { yearsExperience: 'desc' },
                },
                projects: {
                    orderBy: { createdAt: 'desc' },
                },
                workExperience: {
                    orderBy: { startDate: 'desc' },
                },
            },
        });

        if (!profile) {
            return next(notFound('Profile'));
        }

        res.json({
            success: true,
            data: {
                id: profile.id,
                name: profile.name,
                email: profile.email,
                education: profile.education,
                githubUrl: profile.githubUrl,
                linkedinUrl: profile.linkedinUrl,
                portfolioUrl: profile.portfolioUrl,
                avatarUrl: profile.avatarUrl,
                skills: profile.skills.map(skill => ({
                    name: skill.name,
                    proficiency: skill.proficiency,
                    years: skill.yearsExperience,
                })),
                projects: profile.projects.map(project => ({
                    id: project.id,
                    title: project.title,
                    description: project.description,
                    link: project.link,
                    skillsUsed: project.skillsUsed,
                    startDate: project.startDate,
                    endDate: project.endDate,
                })),
                work: profile.workExperience.map(work => ({
                    company: work.company,
                    role: work.role,
                    startDate: work.startDate,
                    endDate: work.endDate,
                    description: work.description,
                    isCurrent: work.isCurrent,
                })),
            },
        });
    } catch (error) {
        next(error);
    }
};

// Create new profile
export const createProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, education, githubUrl, linkedinUrl, portfolioUrl } = req.body;

        // Check if profile with email already exists
        const existingProfile = await prisma.profile.findUnique({
            where: { email },
        });

        if (existingProfile) {
            return next(conflict('Profile with this email already exists'));
        }

        const profile = await prisma.profile.create({
            data: {
                name,
                email,
                education,
                githubUrl,
                linkedinUrl,
                portfolioUrl,
            },
        });

        logger.info(`Profile created: ${profile.id}`);

        res.status(201).json({
            success: true,
            data: profile,
        });
    } catch (error) {
        next(error);
    }
};

// Update profile
export const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { name, email, education, githubUrl, linkedinUrl, portfolioUrl } = req.body;

        const profile = await prisma.profile.update({
            where: { id: parseInt(id) },
            data: {
                name,
                email,
                education,
                githubUrl,
                linkedinUrl,
                portfolioUrl,
                updatedAt: new Date(),
            },
        });

        logger.info(`Profile updated: ${profile.id}`);

        res.json({
            success: true,
            data: profile,
        });
    } catch (error) {
        next(error);
    }
};

// Delete profile
export const deleteProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        await prisma.profile.delete({
            where: { id: parseInt(id) },
        });

        logger.info(`Profile deleted: ${id}`);

        res.json({
            success: true,
            message: 'Profile deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};
