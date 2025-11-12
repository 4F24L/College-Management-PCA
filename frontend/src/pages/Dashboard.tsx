import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFaculties, usePlacements, useStudents } from '@/lib/api';
import { getMe, signout } from "@/lib/auth";
import { Briefcase, GraduationCap, LogOut, UserCog, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const QuickStats: React.FC = () => {
  const { data: studentsData, isLoading: sLoading } = useStudents({ page: 1, limit: 1 });
  const { data: facultiesData, isLoading: fLoading } = useFaculties();
  const { data: placementsData, isLoading: pLoading } = usePlacements();

  const studentsCount = studentsData?.meta?.total ?? (Array.isArray(studentsData) ? studentsData.length : 0);
  const facultiesCount = Array.isArray(facultiesData) ? facultiesData.length : (facultiesData?.data ? facultiesData.data.length : 0);
  const placementsCount = Array.isArray(placementsData) ? placementsData.length : (placementsData?.data ? placementsData.data.length : 0);

  const loading = sLoading || fLoading || pLoading;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Total Students</CardDescription>
          <CardTitle className="text-3xl">{loading ? '...' : studentsCount}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Faculty Members</CardDescription>
          <CardTitle className="text-3xl">{loading ? '...' : facultiesCount}</CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="pb-3">
          <CardDescription>Placement Records</CardDescription>
          <CardTitle className="text-3xl">{loading ? '...' : placementsCount}</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getMe().then((u) => {
      if (!mounted) return;
      if (!u) return navigate("/auth");
      setUser(u);
      setLoading(false);
    });
    return () => { mounted = false };
  }, [navigate]);

  const handleSignOut = () => {
    signout();
    toast.success("Signed out successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;

  const modules = [
    {
      title: "Students",
      description: "Manage student records, marks, and placement",
      icon: GraduationCap,
      color: "bg-primary",
      route: '/students',
    },
    {
      title: "Faculty",
      description: "Manage faculty profiles and assignments",
      icon: Users,
      color: "bg-secondary",
      route: '/faculties',
    },
    {
      title: "Staff",
      description: "Manage non-teaching staff information",
      icon: UserCog,
      color: "bg-accent",
      route: '/staffs',
    },
    {
      title: "Placements",
      description: "Manage student placement records",
      icon: Briefcase,
      color: "bg-primary-light",
      route: '/placements',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">College Database System</h1>
              <p className="text-sm text-muted-foreground">Management Dashboard</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome, {user.email?.split("@")[0]}
          </h2>
          <p className="text-muted-foreground">
            Select a module to manage your institution's data
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <Card
                key={module.title}
                className="h-full hover:shadow-lg transition-shadow border-2 hover:border-primary flex flex-col"
              >
                <CardHeader className="mb-4">
                  <div className={`${module.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle>{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <div className="flex-1" />
                <CardContent className="pt-0">
                  <Button
                    variant="default"
                    onClick={(e) => { e.stopPropagation(); if (module.route) { navigate(module.route); } }}
                    className="w-full py-2 rounded-md bg-teal-600 hover:bg-teal-800"
                    aria-label={`Manage ${module.title}`}
                  >
                    Manage {module.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Quick Statistics</h3>
          <QuickStats />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
