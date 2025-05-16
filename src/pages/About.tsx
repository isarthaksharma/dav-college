
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">About DAV College</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Founded in 1948, DAV College has a rich legacy of academic excellence and holistic development,
          serving the community for over 75 years with quality education and value-based learning.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 my-16">
        <Link to="/about" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
          <h2 className="text-xl font-bold mb-3">Our History</h2>
          <p className="text-gray-600 mb-4">Learn about our foundation and journey through the decades of educational excellence.</p>
          <Button variant="outline" className="w-full">
            Read More <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        
        <Link to="/leadership" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
          <h2 className="text-xl font-bold mb-3">Leadership</h2>
          <p className="text-gray-600 mb-4">Meet our visionary leaders and administrative team guiding the institution.</p>
          <Button variant="outline" className="w-full">
            Read More <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        
        <Link to="/campus" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
          <h2 className="text-xl font-bold mb-3">Campus</h2>
          <p className="text-gray-600 mb-4">Explore our state-of-the-art campus facilities designed for holistic learning.</p>
          <Button variant="outline" className="w-full">
            Read More <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        
        <Link to="/achievements" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
          <h2 className="text-xl font-bold mb-3">Achievements</h2>
          <p className="text-gray-600 mb-4">Discover our milestones, awards, and recognitions over the years.</p>
          <Button variant="outline" className="w-full">
            Read More <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Our Mission & Vision</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-3">Mission</h3>
            <p className="text-gray-700">
              To empower students with knowledge, skills, and values to excel in their chosen fields and contribute meaningfully to society,
              fostering a culture of innovation, research, and academic excellence.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-3">Vision</h3>
            <p className="text-gray-700">
              To be a premier educational institution, recognized globally for academic excellence,
              innovative teaching methodologies, and producing leaders who make significant contributions to society.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
