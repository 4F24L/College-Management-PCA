import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCreatePlacement, useDeletePlacement, usePlacements, useStudent } from '@/lib/api';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const StudentPlacements: React.FC = () => {
  const { id } = useParams();
  const studentId = Number(id);
  const { data, isLoading, error } = usePlacements(studentId);
  const { data: studentData } = useStudent(studentId || undefined);
  const createMutation = useCreatePlacement();
  const deleteMutation = useDeletePlacement();

  const [form, setForm] = useState({ company: '', jobTitle: '', offerDate: '' });
  const [open, setOpen] = useState(false);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target as HTMLInputElement;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.company.trim() || !form.jobTitle.trim()) {
      alert('Please enter company and job title');
      return;
    }

    await createMutation.mutateAsync({ studentId, company: form.company, jobTitle: form.jobTitle, offerDate: form.offerDate || undefined });
    setForm({ company: '', jobTitle: '', offerDate: '' });
    setOpen(false);
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Placements for : {studentData ? `${studentData.firstName ?? ''} ${studentData.lastName ?? ''}`.trim() : `#${studentId}`}</h2>
        <Button onClick={() => setOpen(true)}>Add Placement</Button>
      </div>

      <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add placement</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="grid gap-3">
            <Input label="Company" name="company" value={form.company} onChange={onChange} placeholder="Company name" />
            <Input label="Job Title" name="jobTitle" value={form.jobTitle} onChange={onChange} placeholder="Job title" />
            <Input label="Offer Date" name="offerDate" type="date" value={form.offerDate} onChange={onChange} />
            <DialogFooter>
              <Button type="submit">Save</Button>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-600">Error loading placements</div>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Offer Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.company}</TableCell>
              <TableCell>{p.jobTitle}</TableCell>
              <TableCell>{p.offerDate ? new Date(p.offerDate).toLocaleDateString() : '-'}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => { if (confirm('Delete this placement?')) deleteMutation.mutate(p.id); }}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentPlacements;
