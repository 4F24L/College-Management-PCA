import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Departments
  const departments = [
    { name: 'Computer Science' },
    { name: 'Mechanical Engineering' },
    { name: 'Business Administration' },
    { name: 'Mathematics' },
    { name: 'Electronics' },
  ];

  for (const d of departments) {
    await prisma.department.upsert({ where: { name: d.name }, update: {}, create: d });
  }

  const cs = await prisma.department.findUnique({ where: { name: 'Computer Science' } });
  const me = await prisma.department.findUnique({ where: { name: 'Mechanical Engineering' } });
  const ba = await prisma.department.findUnique({ where: { name: 'Business Administration' } });

  // Users (note: passwordHash is a placeholder; replace with real bcrypt hash in prod)
  await prisma.user.upsert({
    where: { email: 'admin@college.edu' },
    update: {},
    create: { email: 'admin@college.edu', passwordHash: 'seeded', firstName: 'Admin', lastName: 'User', role: 'admin' },
  });

  // Faculties
  const faculties = [
    { firstName: 'Alice', lastName: 'Anderson', email: 'alice@college.edu', qualification: 'PhD', departmentId: cs?.id },
    { firstName: 'Bob', lastName: 'Brown', email: 'bob@college.edu', qualification: 'MSc', departmentId: me?.id },
  ];
  for (const f of faculties) {
    await prisma.faculty.upsert({ where: { email: f.email }, update: f, create: f });
  }

  // Non-teaching staff
  const staffs = [
    { firstName: 'Carol', lastName: 'Clark', email: 'carol@college.edu', role: 'librarian', departmentId: ba?.id },
    { firstName: 'Dave', lastName: 'Davis', email: 'dave@college.edu', role: 'accountant', departmentId: me?.id },
  ];
  for (const s of staffs) {
    await prisma.nonTeachingStaff.upsert({ where: { email: s.email }, update: s, create: s });
  }

  // Students
  const students = [
    { firstName: 'Eve', lastName: 'Edwards', rollNumber: 'CS1001', email: 'eve@student.edu', departmentId: cs?.id },
    { firstName: 'Frank', lastName: 'Foster', rollNumber: 'ME1001', email: 'frank@student.edu', departmentId: me?.id },
  ];
  for (const s of students) {
    await prisma.student.upsert({ where: { rollNumber: s.rollNumber }, update: s, create: s });
  }

  // Extra sample students using createMany with skipDuplicates
  await prisma.student.createMany({
    data: [
      { firstName: 'Divya', lastName: 'Mondal', rollNumber: '11200123014', email: 'divya@example.com', departmentId: cs?.id },
      { firstName: 'Hritika', lastName: 'Prasad', rollNumber: '11200123015', email: 'hritika@example.com', departmentId: cs?.id },
    ],
    skipDuplicates: true,
  });

  const eve = await prisma.student.findUnique({ where: { rollNumber: 'CS1001' } });
  const frank = await prisma.student.findUnique({ where: { rollNumber: 'ME1001' } });

  // Marks (create only if not exists to avoid duplicates)
  const marks = [
    { studentId: eve.id, course: 'Data Structures', semester: 1, score: 85.5 },
    { studentId: eve.id, course: 'Algorithms', semester: 2, score: 90.0 },
    { studentId: frank.id, course: 'Thermodynamics', semester: 1, score: 78.0 },
  ];
  for (const m of marks) {
    const exists = await prisma.mark.findFirst({ where: { studentId: m.studentId, course: m.course, semester: m.semester } });
    if (!exists) {
      await prisma.mark.create({ data: m });
    }
  }

  // Placements (avoid duplicates)
  const placements = [
    { studentId: eve.id, company: 'TechCorp', jobTitle: 'Software Engineer', offerDate: new Date() },
  ];
  for (const p of placements) {
    const exists = await prisma.placementRecord.findFirst({ where: { studentId: p.studentId, company: p.company, jobTitle: p.jobTitle } });
    if (!exists) {
      await prisma.placementRecord.create({ data: p });
    }
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
