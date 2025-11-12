import prisma from '../prismaClient.js';

export async function listFaculties(req, res) {
  const { search = '', page = '1', limit = '20' } = req.query;
  const pageNum = Math.max(1, Number(page));
  const take = Math.max(1, Math.min(100, Number(limit)));
  const skip = (pageNum - 1) * take;
  const where = search
    ? {
        OR: [
          { firstName: { contains: String(search), mode: 'insensitive' } },
          { lastName: { contains: String(search), mode: 'insensitive' } },
          { email: { contains: String(search), mode: 'insensitive' } },
        ],
      }
    : {};
  const [data, total] = await Promise.all([
    prisma.faculty.findMany({ where, skip, take, orderBy: { id: 'asc' }, include: { department: true } }),
    prisma.faculty.count({ where }),
  ]);
  res.json({ data, meta: { total, page: pageNum, limit: take } });
}

export async function getFaculty(req, res) {
  const id = Number(req.params.id);
  const f = await prisma.faculty.findUnique({ where: { id }, include: { department: true } });
  if (!f) return res.status(404).json({ error: 'Faculty not found' });
  res.json(f);
}

export async function createFaculty(req, res) {
  const { firstName, lastName, email, phone, qualification, departmentId } = req.body;
  try {
    const faculty = await prisma.faculty.create({ data: { firstName, lastName, email, phone, qualification, departmentId: departmentId ? Number(departmentId) : null } });
    res.status(201).json(faculty);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
}

export async function updateFaculty(req, res) {
  const id = Number(req.params.id);
  try {
    const f = await prisma.faculty.update({ where: { id }, data: req.body });
    res.json(f);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
}

export async function deleteFaculty(req, res) {
  const id = Number(req.params.id);
  try {
    await prisma.faculty.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
}
