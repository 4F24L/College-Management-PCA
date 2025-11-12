import prisma from '../prismaClient.js';

export async function listPlacements(req, res) {
  const { studentId } = req.query;
  const where = studentId ? { studentId: Number(studentId) } : {};
  const data = await prisma.placementRecord.findMany({
    where,
    orderBy: { id: 'asc' },
    include: { student: { select: { id: true, firstName: true, lastName: true } } },
  });
  res.json(data);
}

export async function getPlacement(req, res) {
  const id = Number(req.params.id);
  const p = await prisma.placementRecord.findUnique({ where: { id }, include: { student: { select: { id: true, firstName: true, lastName: true } } } });
  if (!p) return res.status(404).json({ error: 'Placement not found' });
  res.json(p);
}

export async function createPlacement(req, res) {
  const { studentId, company, jobTitle, offerDate } = req.body;
  try {
    const pl = await prisma.placementRecord.create({ data: { studentId: Number(studentId), company, jobTitle, offerDate: offerDate ? new Date(offerDate) : null } });
    res.status(201).json(pl);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
}

export async function updatePlacement(req, res) {
  const id = Number(req.params.id);
  try {
    const p = await prisma.placementRecord.update({ where: { id }, data: req.body });
    res.json(p);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
}

export async function deletePlacement(req, res) {
  const id = Number(req.params.id);
  try {
    await prisma.placementRecord.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
}
