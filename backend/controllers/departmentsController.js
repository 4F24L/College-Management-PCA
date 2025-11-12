import prisma from '../prismaClient.js';

export async function listDepartments(req, res) {
  const deps = await prisma.department.findMany();
  res.json(deps);
}
