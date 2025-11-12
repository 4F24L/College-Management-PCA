import prisma from '../prismaClient.js';

export async function listStudents(req, res) {
  const { search = '', page = '1', limit = '20' } = req.query;
  const pageNum = Math.max(1, Number(page));
  const take = Math.max(1, Math.min(100, Number(limit)));
  const skip = (pageNum - 1) * take;

  const where = search
    ? {
        OR: [
          { firstName: { contains: String(search), mode: 'insensitive' } },
          { lastName: { contains: String(search), mode: 'insensitive' } },
          { rollNumber: { contains: String(search), mode: 'insensitive' } },
          { email: { contains: String(search), mode: 'insensitive' } },
        ],
      }
    : {};

  const [students, total] = await Promise.all([
    prisma.student.findMany({ where, include: { department: true }, skip, take, orderBy: { createdAt: 'desc' } }),
    prisma.student.count({ where }),
  ]);

  res.json({ data: students, meta: { total, page: pageNum, limit: take } });
}

export async function getStudent(req, res) {
  const id = Number(req.params.id);
  const student = await prisma.student.findUnique({ where: { id }, include: { department: true } });
  if (!student) return res.status(404).json({ error: 'Student not found' });
  res.json(student);
}

export async function createStudent(req, res) {
  const { firstName, lastName, rollNumber, email, phone, departmentId } = req.body;
  try {
    const student = await prisma.student.create({
      data: {
        firstName,
        lastName,
        rollNumber,
        email,
        phone,
        department: departmentId ? { connect: { id: Number(departmentId) } } : undefined,
      },
    });
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
}

export async function updateStudent(req, res) {
  const id = Number(req.params.id);
  try {
    const student = await prisma.student.update({ where: { id }, data: req.body });
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
}

export async function deleteStudent(req, res) {
  const id = Number(req.params.id);
  try {
    await prisma.student.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: String(err) });
  }
}
