import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCreateMark, useDeleteMark, useMarks } from '@/lib/api';
import React, { useState } from 'react';

const Marks: React.FC = () => {
  const { data, isLoading, error } = useMarks();
  const createMutation = useCreateMark();
  const deleteMutation = useDeleteMark();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ studentId: '', course: '', semester: 1, score: 0 });

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target as HTMLInputElement;
    setForm((s) => ({ ...s, [name]: name === 'semester' || name === 'score' ? Number(value) : value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.studentId || !form.course.trim()) {
      alert('Please provide a student ID and course');
      return;
    }
    await createMutation.mutateAsync({ studentId: Number(form.studentId), course: form.course, semester: Number(form.semester), score: Number(form.score) });
    setForm({ studentId: '', course: '', semester: 1, score: 0 });
    setOpen(false);
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Marks</h1>
        <Button onClick={() => setOpen(true)}>Add Mark</Button>
      </div>

      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-600">Error loading marks</div>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((m: { id: number; student?: { firstName?: string; lastName?: string }; studentId?: number; course: string; semester: number; score: number }) => (
            <TableRow key={m.id}>
              <TableCell>{m.id}</TableCell>
              <TableCell>{m.student ? `${m.student.firstName ?? ''} ${m.student.lastName ?? ''}`.trim() : m.studentId}</TableCell>
              <TableCell>{m.course}</TableCell>
              <TableCell>{m.semester}</TableCell>
              <TableCell>{m.score}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => { if (confirm('Delete this mark?')) deleteMutation.mutate(m.id); }}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add mark</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="grid gap-3">
            <Input label="Student ID" name="studentId" value={form.studentId} onChange={onChange} placeholder="Student ID" />
            <Input label="Course" name="course" value={form.course} onChange={onChange} placeholder="Course" />
            <div className="flex items-end gap-2">
              <Input label="Semester" name="semester" type="number" value={String(form.semester)} onChange={onChange} className="w-24" />
              <Input label="Score" name="score" type="number" value={String(form.score)} onChange={onChange} className="w-24" />
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Marks;
