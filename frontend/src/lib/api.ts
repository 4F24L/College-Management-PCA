import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";

// --- Types ---
export type Student = { id: number; firstName: string; lastName: string; rollNumber?: string; email?: string; department?: { id: number; name: string } };
export type StudentsResponse = { data: Student[]; meta: { total: number; page: number; limit: number } };

export type CreateMarkPayload = { studentId: number; course: string; semester: number; score: number };
export type Mark = { id: number } & CreateMarkPayload;

export type CreatePlacementPayload = { studentId: number; company: string; jobTitle: string; offerDate?: string };
export type Placement = { id: number } & CreatePlacementPayload;


export async function fetchStudents({ queryKey }) {
    // queryKey = ['students', { page, search, limit }]
    const [_key, params] = queryKey ?? [];
    const page = params?.page ?? 1;
    const search = params?.search ?? '';
    const limit = params?.limit ?? 20;
    const qs = new URLSearchParams();
    if (search) qs.set('search', String(search));
    qs.set('page', String(page));
    qs.set('limit', String(limit));
    const res = await fetch(`${API_BASE}/api/students?${qs.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch students');
    return res.json(); // { data, meta }
}

export async function createStudent(payload) {
    const res = await fetch(`${API_BASE}/api/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to create student");
    return res.json();
}

// generic create helpers should use proper payload types; keep any for now but we can tighten later

export async function deleteStudent(id: number) {
    const res = await fetch(`${API_BASE}/api/students/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete student");
    return res.json();
}

export async function fetchDepartments() {
    const res = await fetch(`${API_BASE}/api/departments`);
    if (!res.ok) throw new Error("Failed to fetch departments");
    return res.json();
}

// Marks
export async function fetchMarks(): Promise<Mark[]> {
    const res = await fetch(`${API_BASE}/api/marks`);
    if (!res.ok) throw new Error('Failed to fetch marks');
    return res.json();
}

export async function createMark(payload: CreateMarkPayload): Promise<Mark> {
    const res = await fetch(`${API_BASE}/api/marks`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create mark');
    return res.json();
}

export async function deleteMark(id: number): Promise<{ success?: boolean }> {
    const res = await fetch(`${API_BASE}/api/marks/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete mark');
    return res.json();
}

export function useMarks(studentId?: number) {
    const queryKey = studentId ? ['marks', { studentId }] : ['marks'];
    return useQuery<Mark[], Error>({ queryKey, queryFn: () => fetch(`${API_BASE}/api/marks${studentId ? `?studentId=${studentId}` : ''}`).then(r => { if (!r.ok) throw new Error('Failed'); return r.json() }) });
}

export function useCreateMark() {
    const qc = useQueryClient();
    return useMutation<Mark, Error, CreateMarkPayload>({ mutationFn: (payload) => createMark(payload), onSuccess: () => qc.invalidateQueries({ queryKey: ['marks'] }) });
}

export function useDeleteMark() {
    const qc = useQueryClient();
    return useMutation<{ success?: boolean }, Error, number>({ mutationFn: (id: number) => deleteMark(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['marks'] }) });
}

// Placements
export async function fetchPlacements() {
    const res = await fetch(`${API_BASE}/api/placements`);
    if (!res.ok) throw new Error('Failed to fetch placements');
    return res.json();
}

export async function createPlacement(payload: { studentId: number; company: string; jobTitle: string; offerDate?: string }) {
    const res = await fetch(`${API_BASE}/api/placements`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (!res.ok) throw new Error('Failed to create placement');
    return res.json();
}

export async function deletePlacement(id: number) {
    const res = await fetch(`${API_BASE}/api/placements/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete placement');
    return res.json();
}

export function usePlacements(studentId?: number) {
    const queryKey = studentId ? ['placements', { studentId }] : ['placements'];
    return useQuery({ queryKey, queryFn: () => fetch(`${API_BASE}/api/placements${studentId ? `?studentId=${studentId}` : ''}`).then(r => { if (!r.ok) throw new Error('Failed'); return r.json(); }) });
}

export function useCreatePlacement() {
    const qc = useQueryClient();
    return useMutation({ mutationFn: (payload: any) => createPlacement(payload), onSuccess: () => qc.invalidateQueries({ queryKey: ['placements'] }) });
}

export function useDeletePlacement() {
    const qc = useQueryClient();
    return useMutation({ mutationFn: (id: number) => deletePlacement(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['placements'] }) });
}

export async function fetchFaculties() {
    const res = await fetch(`${API_BASE}/api/faculties`);
    if (!res.ok) throw new Error('Failed to fetch faculties');
    return res.json();
}

export async function createFaculty(payload) {
    const res = await fetch(`${API_BASE}/api/faculties`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create faculty');
    return res.json();
}

export async function deleteFaculty(id: number) {
    const res = await fetch(`${API_BASE}/api/faculties/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete faculty');
    return res.json();
}

export async function fetchStaffs() {
    const res = await fetch(`${API_BASE}/api/staffs`);
    if (!res.ok) throw new Error('Failed to fetch staffs');
    return res.json();
}

export async function createStaff(payload) {
    const res = await fetch(`${API_BASE}/api/staffs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Failed to create staff');
    return res.json();
}

export async function deleteStaff(id: number) {
    const res = await fetch(`${API_BASE}/api/staffs/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete staff');
    return res.json();
}

export function useDepartments() {
    return useQuery({ queryKey: ['departments'], queryFn: fetchDepartments, staleTime: 1000 * 60 * 5 });
}

export function useFaculties() {
    return useQuery({ queryKey: ['faculties'], queryFn: fetchFaculties, staleTime: 1000 * 60 });
}

export function useCreateFaculty() {
    const qc = useQueryClient();
    return useMutation({ mutationFn: createFaculty, onSuccess: () => qc.invalidateQueries({ queryKey: ['faculties'] }) });
}

export function useDeleteFaculty() {
    const qc = useQueryClient();
    return useMutation({ mutationFn: (id: number) => deleteFaculty(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['faculties'] }) });
}

export function useStaffs() {
    return useQuery({ queryKey: ['staffs'], queryFn: fetchStaffs, staleTime: 1000 * 60 });
}

export function useCreateStaff() {
    const qc = useQueryClient();
    return useMutation({ mutationFn: createStaff, onSuccess: () => qc.invalidateQueries({ queryKey: ['staffs'] }) });
}

export function useDeleteStaff() {
    const qc = useQueryClient();
    return useMutation({ mutationFn: (id: number) => deleteStaff(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['staffs'] }) });
}

export function useStudents(params?: { page?: number; search?: string; limit?: number }) {
    return useQuery({ queryKey: ['students', params ?? {}], queryFn: fetchStudents, staleTime: 1000 * 60 });
}

export async function fetchStudent(id: number) {
    const res = await fetch(`${API_BASE}/api/students/${id}`);
    if (!res.ok) throw new Error('Failed to fetch student');
    return res.json();
}

export function useStudent(id?: number) {
    return useQuery({ queryKey: ['student', id], queryFn: () => fetchStudent(id as number), enabled: Boolean(id) });
}

export function useCreateStudent() {
    const qc = useQueryClient();
    return useMutation({ mutationFn: createStudent, onSuccess: () => qc.invalidateQueries({ queryKey: ['students'] }) });
}

export function useDeleteStudent() {
    const qc = useQueryClient();
    return useMutation({ mutationFn: (id: number) => deleteStudent(id), onSuccess: () => qc.invalidateQueries({ queryKey: ['students'] }) });
}
