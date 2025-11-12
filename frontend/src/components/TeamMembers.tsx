import { Avatar } from "@/components/ui/avatar";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Code,
    Database,
    FileText,
    Palette,
    UserCheck,
    Users,
} from "lucide-react";
import React from "react";

type Member = {
  name: string;
  role: string;
};

const members: Member[] = [
  { name: "Hritika Prasad", role: "Project Lead" },
  { name: "Divya Mondal", role: "UI/UX Designer" },
  { name: "Manabi Das", role: "Database Design" },
  { name: "Md Wasim Aktar", role: "Frontend Developer" },
  { name: "Md Afzal Mir", role: "Backend Developer" },
];

const TeamMembers = () => {
  return (
    <section className="py-16 container mx-auto px-4">
      <div className="mb-8 flex items-center gap-3">
        <div className="p-2 rounded-md bg-primary/10">
          <Users />
        </div>
        <h2 className="text-3xl font-bold">Team Members</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((m) => {
          // choose an icon based on role
          const RoleIcon = m.role.includes("Frontend")
            ? Code
            : m.role.includes("Backend")
            ? Database
            : m.role.includes("UI/UX")
            ? Palette
            : m.role.includes("Database") || m.role.includes("Documentation")
            ? FileText
            : UserCheck;

          return (
            <Card
              key={m.name}
              className="flex items-center gap-6 p-6 shadow-sm border"
            >
              <Avatar className="flex justify-center items-center p-2 size-12">
                <RoleIcon className="h-8 w-8 text-primary opacity-90" />
              </Avatar>

              <div className="flex-1">
                <CardHeader className="p-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-3">
                      {m.name}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    {m.role}
                  </CardDescription>
                </CardHeader>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default TeamMembers;
