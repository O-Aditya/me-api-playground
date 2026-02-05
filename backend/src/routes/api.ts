import { Router } from 'express';
import { getProfile, createProfile, updateProfile, deleteProfile } from '../controllers/profileController';
import { getProjects, getProjectById } from '../controllers/projectController';
import { getSkills, getTopSkills } from '../controllers/skillController';
import { getWorkExperience } from '../controllers/workController';
import { search } from '../controllers/searchController';
import { validateRequest, profileSchema } from '../middleware/validation';

const router = Router();

// Health check
router.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Profile routes
router.get('/profile', getProfile);
router.post('/profile', validateRequest(profileSchema), createProfile);
router.put('/profile/:id', validateRequest(profileSchema), updateProfile);
router.delete('/profile/:id', deleteProfile);

// Project routes
router.get('/projects', getProjects);
router.get('/projects/:id', getProjectById);

// Skill routes
router.get('/skills', getSkills);
router.get('/skills/top', getTopSkills);

// Work experience routes
router.get('/work', getWorkExperience);

// Search route
router.get('/search', search);

export default router;
