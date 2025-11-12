import prisma from '../prismaClient.js';

export async function listStaffs(req, res) {
  const { search = '', page = '1', limit = '20' } = req.query;
  const pageNum = Math.max(1, Number(page));
  const take = Math.max(1, Math.min(100, Number(limit)));
  const skip = (pageNum - 1) * take;
  const where = search
    ? {
        OR: [
          { firstName: { contains: String(search), mode: 'insensitive' } },
          { lastName: { contains: String(search), mode: 'insensitive' } },
          { role: { contains: String(search), mode: 'insensitive' } },
        ],
      }
    : {};
  const [data, total] = await Promise.all([
    prisma.nonTeachingStaff.findMany({ where, skip, take, orderBy: { id: 'asc' }, include: { department: true } }),
    prisma.nonTeachingStaff.count({ where }),
  ]);
  res.json({ data, meta: { total, page: pageNum, limit: take } });
}

export async function getStaff(req, res) {
  const id = Number(req.params.id);
  const s = await prisma.nonTeachingStaff.findUnique({ where: { id }, include: { department: true } });
  if (!s) return res.status(404).json({ error: 'Staff not found' });
  res.json(s);
}

export async function createStaff(req, res) {
  const { firstName, lastName, email, phone, role, departmentId } = req.body;
  try {
    const staff = await prisma.nonTeachingStaff.create({ data: { firstName, lastName, email, phone, role, departmentId: departmentId ? Number(departmentId) : null } });
    res.status(201).json(staff);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
}

export async function updateStaff(req, res) {
  const id = Number(req.params.id);
  try {
    const s = await prisma.nonTeachingStaff.update({ where: { id }, data: req.body });
    res.json(s);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
}

export async function deleteStaff(req, res) {
  const id = Number(req.params.id);
  try {
    await prisma.nonTeachingStaff.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
}
