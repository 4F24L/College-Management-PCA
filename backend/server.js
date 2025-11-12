import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import prisma from './prismaClient.js';
import authRouter from './routes/auth.js';
import departmentsRouter from './routes/departments.js';
import facultiesRouter from './routes/faculties.js';
import marksRouter from './routes/marks.js';
import placementsRouter from './routes/placements.js';
import staffsRouter from './routes/staffs.js';
import studentsRouter from './routes/students.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ status: 'ok', message: 'GCELT PCA backend running' }));

app.use('/api/students', studentsRouter);
app.use('/api/faculties', facultiesRouter);
app.use('/api/staffs', staffsRouter);
app.use('/api/departments', departmentsRouter);
app.use('/auth', authRouter);
app.use('/api/marks', marksRouter);
app.use('/api/placements', placementsRouter);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
