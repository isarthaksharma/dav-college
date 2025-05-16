
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

interface FacultyProps {
  name: string;
  position: string;
  department: string;
  qualification: string;
  experience: string;
  image: string;
  specialization: string;
}

const FacultyCard = ({ name, position, department, qualification, experience, image, specialization }: FacultyProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <img src={image} alt={name} className="object-cover" />
        </Avatar>
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{position}, {department}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex gap-2">
            <span className="font-medium">Qualification:</span>
            <span className="text-gray-600">{qualification}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Experience:</span>
            <span className="text-gray-600">{experience}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Specialization:</span>
            <span className="text-gray-600">{specialization}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Faculties = () => {
  const departments = [
    {
      name: "Sciences",
      faculties: [
        {
          name: "Dr. Anand Sharma",
          position: "Professor",
          department: "Physics",
          qualification: "Ph.D. in Physics",
          experience: "15+ years",
          image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFsZSUyMHByb2Zlc3NvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          specialization: "Quantum Physics"
        },
        {
          name: "Dr. Meena Patel",
          position: "Associate Professor",
          department: "Chemistry",
          qualification: "Ph.D. in Organic Chemistry",
          experience: "12+ years",
          image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZlbWFsZSUyMHByb2Zlc3NvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          specialization: "Organic Synthesis"
        },
        {
          name: "Dr. Rajat Kumar",
          position: "Assistant Professor",
          department: "Mathematics",
          qualification: "Ph.D. in Applied Mathematics",
          experience: "8+ years",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbGUlMjBwcm9mZXNzb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
          specialization: "Differential Equations"
        }
      ]
    },
    {
      name: "Arts & Humanities",
      faculties: [
        {
          name: "Dr. Priya Singh",
          position: "Professor",
          department: "English",
          qualification: "Ph.D. in English Literature",
          experience: "18+ years",
          image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGZlbWFsZSUyMHByb2Zlc3NvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          specialization: "Victorian Literature"
        },
        {
          name: "Dr. Vikram Mehta",
          position: "Associate Professor",
          department: "History",
          qualification: "Ph.D. in Modern History",
          experience: "14+ years",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hbGUlMjBwcm9mZXNzb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
          specialization: "Indian Independence Movement"
        },
        {
          name: "Dr. Sonia Verma",
          position: "Assistant Professor",
          department: "Psychology",
          qualification: "Ph.D. in Clinical Psychology",
          experience: "7+ years",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGZlbWFsZSUyMHByb2Zlc3NvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          specialization: "Cognitive Behavioral Therapy"
        }
      ]
    },
    {
      name: "Commerce & Management",
      faculties: [
        {
          name: "Dr. Ajay Gupta",
          position: "Professor",
          department: "Commerce",
          qualification: "Ph.D. in Commerce",
          experience: "20+ years",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fG1hbGUlMjBwcm9mZXNzb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
          specialization: "Financial Management"
        },
        {
          name: "Dr. Ritu Agarwal",
          position: "Associate Professor",
          department: "Business Administration",
          qualification: "Ph.D. in Management",
          experience: "16+ years",
          image: "https://images.unsplash.com/photo-1590649720174-75de55f29082?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGZlbWFsZSUyMHByb2Zlc3NvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          specialization: "Marketing Strategies"
        },
        {
          name: "Dr. Nikhil Joshi",
          position: "Assistant Professor",
          department: "Economics",
          qualification: "Ph.D. in Economics",
          experience: "9+ years",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fG1hbGUlMjBwcm9mZXNzb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
          specialization: "Macroeconomics"
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Our Faculty</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Meet our distinguished faculty members who bring their expertise and passion to DAV College,
          guiding students towards academic excellence and personal growth.
        </p>
      </div>

      {departments.map((department, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">{department.name} Department</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {department.faculties.map((faculty, idx) => (
              <FacultyCard 
                key={idx}
                name={faculty.name}
                position={faculty.position}
                department={faculty.department}
                qualification={faculty.qualification}
                experience={faculty.experience}
                image={faculty.image}
                specialization={faculty.specialization}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faculties;
