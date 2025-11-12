import TeamMembers from "@/components/TeamMembers";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  CheckCircle2,
  Database,
  FileText,
  GraduationCap,
  Shield,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Database,
      title: "Centralized Data Management",
      description:
        "Store and manage all student, faculty, and staff information in one secure location",
    },
    {
      icon: Shield,
      title: "Role-Based Access Control",
      description:
        "Secure authentication with different permission levels for admins, faculty, students, and staff",
    },
    {
      icon: FileText,
      title: "Academic Records",
      description:
        "Track marks, attendance, course enrollment, and placement records efficiently",
    },
    {
      icon: Users,
      title: "Faculty Management",
      description:
        "Manage faculty profiles, qualifications, department assignments, and course schedules",
    },
    {
      icon: BarChart3,
      title: "Comprehensive Reports",
      description:
        "Generate detailed reports for academic performance, attendance, and placement statistics",
    },
  ];

  const benefits = [
    "Efficient data management with minimal errors",
    "Enhanced accessibility for authorized users",
    "Data security and privacy protection",
    "Support for academic planning and scheduling",
    "Automated report generation",
    "Real-time data updates and synchronization",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        className="relative text-white overflow-hidden"
        style={{
          backgroundImage: `url('https://gcelt.gov.in/wp-content/uploads/2023/04/IMG_4577-scaled.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* dark overlay for readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container relative mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                <GraduationCap className="h-16 w-16" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Centralized College Database System
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Manage all information related to students, faculty, and staff in
              a single, integrated platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8"
                onClick={() => navigate("/auth")}
              >
                Get Started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Team Members Section (added) */}
      <TeamMembers />

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your educational institution
            effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-2 hover:shadow-lg transition-all hover:border-primary"
              >
                <CardHeader>
                  <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              System Modules
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Four comprehensive modules for complete institutional management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Student Module",
                desc: "Add, edit, search, and manage student records",
                color: "bg-primary",
              },
              {
                title: "Faculty Module",
                desc: "Manage faculty profiles and assignments",
                color: "bg-secondary",
              },
              {
                title: "Staff Module",
                desc: "Handle non-teaching staff information",
                color: "bg-accent",
              },
              {
                title: "Security Module",
                desc: "Role-based access and data protection",
                color: "bg-primary-light",
              },
            ].map((module, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div
                    className={`${module.color} h-24 rounded-lg flex items-center justify-center mb-4`}
                  >
                    <div className="text-5xl font-bold text-white">
                      {index + 1}
                    </div>
                  </div>
                  <CardTitle>{module.title}</CardTitle>
                  <CardDescription>{module.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our System?
            </h2>
            <p className="text-xl text-muted-foreground">
              Built for efficiency, security, and ease of use
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 | GCELT | All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
