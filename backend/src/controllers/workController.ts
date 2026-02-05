import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';

// Get work experience
export const getWorkExperience = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workExperience = await prisma.workExperience.findMany({
            orderBy: { startDate: 'desc' },
        });

        res.json({
            success: true,
            data: workExperience.map(work => ({
                company: work.company,
                role: work.role,
                startDate: work.startDate,
                endDate: work.endDate,
                description: work.description,
                isCurrent: work.isCurrent,
            })),
        });
    } catch (error) {
        next(error);
    }
};
