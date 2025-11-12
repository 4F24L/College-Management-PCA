import prisma from '../prismaClient.js';

export async function listMarks(req, res) {
  const { studentId } = req.query;
  const where = studentId ? { studentId: Number(studentId) } : {};
  const data = await prisma.mark.findMany({
    where,
    orderBy: { id: 'asc' },
    include: { student: { select: { id: true, firstName: true, lastName: true } } },
  });
  res.json(data);
}

export async function getMark(req, res) {
  const id = Number(req.params.id);
  const m = await prisma.mark.findUnique({ where: { id }, include: { student: { select: { id: true, firstName: true, lastName: true } } } });
  if (!m) return res.status(404).json({ error: 'Mark not found' });
  res.json(m);
}

export async function createMark(req, res) {
  const { studentId, course, semester, score } = req.body;
  try {
    const mark = await prisma.mark.create({ data: { studentId: Number(studentId), course, semester: Number(semester), score: Number(score) } });
    res.status(201).json(mark);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
}

export async function updateMark(req, res) {
  const id = Number(req.params.id);
  try {
    const m = await prisma.mark.update({ where: { id }, data: req.body });
    res.json(m);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
}

export async function deleteMark(req, res) {
  const id = Number(req.params.id);
  try {
    await prisma.mark.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
}
