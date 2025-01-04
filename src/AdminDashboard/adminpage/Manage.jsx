import React from "react";

export default function RoleCardsGrid() {
  const roles = [
    {
      title: "Super Admin",
      description:
        "They can see and do everything – best not to have many with this role.",
      image: "/api/placeholder/64/64",
      link: "/super-admin",
    },
    {
      title: "Admin",
      description:
        "Admin to help sort stuff, but have less access to confidential information like salaries.",
      image: "/api/placeholder/64/64",
      link: "/admin",
    },
    {
      title: "Payroll Admin",
      description:
        "They sort out your payroll and have access to everyone's salary information.",
      image: "/api/placeholder/64/64",
      link: "/payroll-admin",
    },
    {
      title: "Team Member",
      description:
        "Team Members have the most limited access – most people should have this role.",
      image: "/api/placeholder/64/64",
      link: "/team-members",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roles.map((role, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-800">
                  {role.title}
                </h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">{role.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <img
                      src={role.image}
                      alt={`${role.title} avatar`}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <a
                    href={role.link}
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    View Permissions
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}