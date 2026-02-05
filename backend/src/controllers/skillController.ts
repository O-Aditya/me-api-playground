import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';

// Get all skills
export const getSkills = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const skills = await prisma.skill.findMany({
            orderBy: { yearsExperience: 'desc' },
        });

        res.json({
            success: true,
            data: skills.map(skill => ({
                name: skill.name,
                proficiency: skill.proficiency,
                years: skill.yearsExperience,
            })),
        });
    } catch (error) {
        next(error);
    }
};

// Get top skills (most frequently used across projects)
export const getTopSkills = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        // Get all projects and count skill usage
        const projects = await prisma.project.findMany({
            select: {
                skillsUsed: true,
            },
        });

        // Count skill frequency
        const skillCount: Record<string, number> = {};

        projects.forEach(project => {
            if (Array.isArray(project.skillsUsed)) {
                (project.skillsUsed as string[]).forEach((skill: string) => {
                    skillCount[skill] = (skillCount[skill] || 0) + 1;
                });
            }
        });

        // Convert to array and sort by count
        const topSkills = Object.entries(skillCount)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);

        res.json({
            success: true,
            data: topSkills,
        });
    } catch (error) {
        next(error);
    }
};
