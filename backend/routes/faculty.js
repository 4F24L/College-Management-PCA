import express from 'express';
const router = express.Router();

// Basic faculty routes placeholder
router.get('/', async (req, res) => {
  const faculties = await req.app.locals.prisma.faculty.findMany();
  res.json(faculties);
});

export default router;
