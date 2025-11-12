import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePlacements } from '@/lib/api';
import React, { useState } from 'react';

const Placements: React.FC = () => {
  const { data, isLoading, error } = usePlacements();
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Placements</h1>
      </div>
      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-600">Error loading placements</div>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Offer Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((p: { id: number; student?: { firstName?: string; lastName?: string }; studentId?: number; company: string; jobTitle: string; offerDate?: string }) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.student ? `${p.student.firstName ?? ''} ${p.student.lastName ?? ''}`.trim() : p.studentId}</TableCell>
              <TableCell>{p.company}</TableCell>
              <TableCell>{p.jobTitle}</TableCell>
              <TableCell>{p.offerDate ? new Date(p.offerDate).toLocaleDateString() : '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onOpenChange={(v) => setOpen(v)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Placement</DialogTitle>
          </DialogHeader>
          {/* Form omitted for brevity: can reuse createPlacement hook and a small form */}
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Placements;
