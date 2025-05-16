
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface LeaderProps {
  name: string;
  position: string;
  image: string;
  description: string;
}

const LeaderCard = ({ name, position, image, description }: LeaderProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[4/3] relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover" 
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-primary font-medium mb-3">{position}</p>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

const Leadership = () => {
  const leaders = [
    {
      name: "Dr. Amardeep Gupta",
      position: "Principal",
      image: "https://www.davcollegeasr.org/images/about_02.jpg",
      description: "Dr.Gupts has over 25 years of academic experience and has been leading DAV College since 2015."
    },
    {
      name: "Dr. Priya Sharma",
      position: "Vice Principal",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      description: "Dr. Sharma oversees academic affairs and has implemented several innovative teaching methodologies."
    },
    {
      name: "Prof. Amit Patel",
      position: "Dean of Students",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      description: "Prof. Patel focuses on student welfare and has developed several student support programs."
    },
    {
      name: "Dr. banvir",
      position: "Head of Research",
      image: "https://www.google.com/imgres?q=banvir%20joha%3Bl&imgurl=https%3A%2F%2Flookaside.fbsbx.com%2Flookaside%2Fcrawler%2Fmedia%2F%3Fmedia_id%3D627420826052138&imgrefurl=https%3A%2F%2Fwww.facebook.com%2Fbanvirrjohal%2F&docid=2oacbDLzfqkLsM&tbnid=KrDiL4AeltDfUM&vet=12ahUKEwimqKbAzKiNAxUZjq8BHdJ3DocQM3oECGYQAA..i&w=720&h=893&hcb=2&ved=2ahUKEwimqKbAzKiNAxUZjq8BHdJ3DocQM3oECGYQAA",
      description: "Dr. Desai has published over 50 research papers and leads the institution's research initiatives."
    },
    {
      name: "Prof. Vijay Singh",
      position: "Administrative Director",
      image: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2Zlc3Npb25hbCUyMG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      description: "Prof. Singh manages the operational aspects of the college and ensures smooth functioning."
    },
    {
      name: "Dr. Ananya Rao",
      position: "Head of Admissions",
      image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2Zlc3Npb25hbCUyMHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      description: "Dr. Rao oversees the admission process and has digitized several procedures for efficiency."
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Our Leadership</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Meet the visionary leaders who guide DAV College towards excellence in education and innovation,
          bringing together decades of experience in academia and administration.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {leaders.map((leader, index) => (
          <LeaderCard 
            key={index}
            name={leader.name}
            position={leader.position}
            image={leader.image}
            description={leader.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Leadership;
