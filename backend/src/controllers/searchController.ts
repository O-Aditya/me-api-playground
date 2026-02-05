import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';

// Full-text search across all entities
export const search = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { q } = req.query;

        if (!q || typeof q !== 'string') {
            return res.json({
                success: true,
                data: {
                    projects: [],
                    skills: [],
                    work: [],
                },
            });
        }

        const searchTerm = q.toLowerCase();

        // Search projects
        const projects = await prisma.project.findMany({
            where: {
                OR: [
                    { title: { contains: searchTerm, mode: 'insensitive' } },
                    { description: { contains: searchTerm, mode: 'insensitive' } },
                ],
            },
            take: 10,
        });

        // Search skills
        const skills = await prisma.skill.findMany({
            where: {
                name: { contains: searchTerm, mode: 'insensitive' },
            },
            take: 10,
        });

        // Search work experience
        const work = await prisma.workExperience.findMany({
            where: {
                OR: [
                    { company: { contains: searchTerm, mode: 'insensitive' } },
                    { role: { contains: searchTerm, mode: 'insensitive' } },
                    { description: { contains: searchTerm, mode: 'insensitive' } },
                ],
            },
            take: 10,
        });

        res.json({
            success: true,
            data: {
                projects: projects.map(p => ({
                    id: p.id,
                    title: p.title,
                    description: p.description,
                    type: 'project',
                })),
                skills: skills.map(s => ({
                    name: s.name,
                    proficiency: s.proficiency,
                    type: 'skill',
                })),
                work: work.map(w => ({
                    company: w.company,
                    role: w.role,
                    type: 'work',
                })),
            },
        });
    } catch (error) {
        next(error);
    }
};
