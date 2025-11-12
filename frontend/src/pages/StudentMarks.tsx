import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Input from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCreateMark, useDeleteMark, useMarks } from '@/lib/api';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const StudentMarks: React.FC = () => {
  const { id } = useParams();
  const studentId = Number(id);
  const { data, isLoading, error } = useMarks(studentId);
  const createMutation = useCreateMark();
  const deleteMutation = useDeleteMark();

  const [form, setForm] = useState({ course: '', semester: 1, score: 0 });
  const [open, setOpen] = useState(false);

  function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target as HTMLInputElement;
    setForm((s) => ({ ...s, [name]: name === 'score' || name === 'semester' ? Number(value) : value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.course.trim()) {
      alert('Please enter a course name');
      return;
    }
    await createMutation.mutateAsync({ studentId, course: form.course, semester: form.semester, score: form.score });
    setForm({ course: '', semester: 1, score: 0 });
    setOpen(false);
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Marks for student #{studentId}</h2>
        <Button onClick={() => setOpen(true)}>Add Mark</Button>
      </div>

      <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add mark</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="grid gap-3">
            <Input label="Course" name="course" value={form.course} onChange={onChange} placeholder="Course name" />
            <div className="flex items-end gap-2">
              <Input label="Semester" name="semester" type="number" value={String(form.semester)} onChange={onChange} className="w-24" />
              <Input label="Score" name="score" type="number" value={String(form.score)} onChange={onChange} className="w-24" />
            </div>
            <DialogFooter>
              <Button type="submit">Save</Button>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-600">Error loading marks</div>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((m) => (
            <TableRow key={m.id}>
              <TableCell>{m.id}</TableCell>
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
    </div>
  );
};

export default StudentMarks;
