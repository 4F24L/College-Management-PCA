import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCreateStudent, useDeleteStudent, useDepartments, useStudents } from "@/lib/api";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Students: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const studentsQuery = useStudents({ page, search, limit: 10 });
  const { data, isLoading, error } = studentsQuery;
  const createMutation = useCreateStudent();
  const deleteMutation = useDeleteStudent();

  const { data: departments } = useDepartments();

  const [form, setForm] = useState({ firstName: "", lastName: "", rollNumber: "", email: "", departmentId: "" });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // basic validation: require first and last name
    if (!form.firstName.trim() || !form.lastName.trim()) {
      alert('Please enter first name and last name');
      return;
    }

    await createMutation.mutateAsync({
      firstName: form.firstName,
      lastName: form.lastName,
      rollNumber: form.rollNumber,
      email: form.email,
      departmentId: form.departmentId ? Number(form.departmentId) : undefined,
    });
    setForm({ firstName: "", lastName: "", rollNumber: "", email: "", departmentId: "" });
    setOpen(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Students</h1>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Input placeholder="Search" value={search} onChange={(e) => setSearch((e.target as HTMLInputElement).value)} />
          <button type="button" onClick={() => setPage(1)} className="btn">Search</button>
        </div>
        <div>
          <Button onClick={() => setOpen(true)} className="flex items-center gap-2"><Plus className="h-4 w-4" /> Add Student</Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new student</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="grid gap-3">
            <Input label="First name" name="firstName" value={form.firstName} onChange={onChange} placeholder="Ex: John" />
            <Input label="Last name" name="lastName" value={form.lastName} onChange={onChange} placeholder="Ex: Doe" />
            <Input label="Roll number" name="rollNumber" value={form.rollNumber} onChange={onChange} placeholder="Roll number" />
            <Input label="Email" name="email" value={form.email} onChange={onChange} placeholder="you@college.edu" />
            <Input label="Department" as="select" name="departmentId" value={form.departmentId} onChange={onChange}>
              <option value="">Select department</option>
              {departments?.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </Input>
            <DialogFooter>
              <Button type="submit">Save</Button>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-600">Error loading students</div>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Roll</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.id}</TableCell>
              <TableCell>{s.firstName} {s.lastName}</TableCell>
              <TableCell>{s.rollNumber}</TableCell>
              <TableCell>{s.email}</TableCell>
              <TableCell>{s.department?.name ?? '-'}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => navigate(`/students/${s.id}/marks`)}>Marks</Button>
                  <Button size="sm" onClick={() => navigate(`/students/${s.id}/placements`)}>Placements</Button>
                  <Button variant="destructive" size="sm" onClick={() => {
                    if (confirm('Delete this student? This action cannot be undone.')) deleteMutation.mutate(s.id);
                  }}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex items-center gap-2">
        <button className="btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={data?.meta?.page <= 1}>Previous</button>
        <div>Page {data?.meta?.page} / {Math.ceil((data?.meta?.total ?? 0) / (data?.meta?.limit ?? 10) )}</div>
        <button className="btn" onClick={() => setPage((p) => p + 1)} disabled={(data?.meta?.page ?? 1) * (data?.meta?.limit ?? 10) >= (data?.meta?.total ?? 0)}>Next</button>
      </div>
    </div>
  );
};

export default Students;
