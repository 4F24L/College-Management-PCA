import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCreateFaculty, useDeleteFaculty, useDepartments, useFaculties } from "@/lib/api";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";

const Faculties: React.FC = () => {
  const { data, isLoading, error } = useFaculties();
  const createMutation = useCreateFaculty();
  const deleteMutation = useDeleteFaculty();
  const { data: departments } = useDepartments();

  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", qualification: "", departmentId: "" });
  const [open, setOpen] = useState(false);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.firstName.trim() || !form.lastName.trim()) {
      alert('Please enter first name and last name');
      return;
    }

    await createMutation.mutateAsync({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      qualification: form.qualification,
      departmentId: form.departmentId ? Number(form.departmentId) : undefined,
    });
    setForm({ firstName: "", lastName: "", email: "", phone: "", qualification: "", departmentId: "" });
    setOpen(false);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Faculties</h1>

      <div className="mb-6 flex justify-end">
        <Button onClick={() => setOpen(true)} className="flex items-center gap-2"><Plus className="h-4 w-4" /> Add Faculty</Button>
      </div>

      <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add faculty</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="grid gap-3">
            <Input label="First name" name="firstName" value={form.firstName} onChange={onChange} placeholder="Ex: Jane" />
            <Input label="Last name" name="lastName" value={form.lastName} onChange={onChange} placeholder="Ex: Doe" />
            <Input label="Email" name="email" value={form.email} onChange={onChange} placeholder="you@college.edu" />
            <Input label="Phone" name="phone" value={form.phone} onChange={onChange} placeholder="Phone" />
            <Input label="Qualification" name="qualification" value={form.qualification} onChange={onChange} placeholder="MSc / PhD" />
            <Input label="Department" as="select" name="departmentId" value={form.departmentId} onChange={onChange}>
              <option value="">Select department</option>
              {departments?.map((d: { id: number; name: string }) => (
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
      {error && <div className="text-red-600">Error loading faculties</div>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Qualification</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((s: { id: number; firstName: string; lastName: string; email?: string; phone?: string; qualification?: string; department?: { name?: string } }) => (
            <TableRow key={s.id}>
              <TableCell>{s.id}</TableCell>
              <TableCell>{s.firstName} {s.lastName}</TableCell>
              <TableCell>{s.email}</TableCell>
              <TableCell>{s.phone}</TableCell>
              <TableCell>{s.qualification}</TableCell>
              <TableCell>{s.department?.name ?? '-'}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => { if (confirm('Delete this faculty?')) deleteMutation.mutate(s.id); }}><Trash2 className="h-4 w-4" /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Faculties;
