
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

// Type definitions for the Supabase tables
type EducationalTour = {
  id: number;
  title: string;
  description?: string;
  location: string;
  date: string;
  image?: string;
}

type AcademicTopper = {
  id: number;
  name: string;
  course: string;
  year: string;
  achievement: string;
  percentage?: number;
  image?: string;
}

type TournamentAchiever = {
  id: number;
  name: string;
  tournament: string;
  position: string;
  year: string;
  sport: string;
  image?: string;
}

type Internship = {
  id: number;
  company: string;
  role: string;
  duration: string;
  year: string;
  department: string;
  student_count?: number;
  image?: string;
}

type PlacementStat = {
  id: number;
  company: string;
  year: string;
  department: string;
  students_placed: number;
  average_package?: string;
  highest_package?: string;
  image?: string;
}

// Component for displaying educational tours
const EducationalTours = () => {
  const [tours, setTours] = useState<EducationalTour[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const { data, error } = await supabase
          .from('educational_tours')
          .select('*')
          .order('date', { ascending: false })
          .limit(4);

        if (error) throw error;
        setTours(data || []);
      } catch (error) {
        console.error('Error fetching tours:', error);
        toast({
          title: "Error",
          description: "Failed to load educational tours",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No educational tours found.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {tours.map((tour) => (
        <Card key={tour.id} className="overflow-hidden">
          {tour.image && (
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={tour.image} 
                alt={tour.title} 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <CardHeader>
            <CardTitle>{tour.title}</CardTitle>
            <div className="flex gap-2 text-sm text-gray-500">
              <span>{new Date(tour.date).toLocaleDateString()}</span>
              <span>•</span>
              <span>{tour.location}</span>
            </div>
          </CardHeader>
          {tour.description && (
            <CardContent>
              <p>{tour.description}</p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

// Component for displaying academic toppers
const AcademicToppers = () => {
  const [toppers, setToppers] = useState<AcademicTopper[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchToppers = async () => {
      try {
        const { data, error } = await supabase
          .from('academic_toppers')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) throw error;
        setToppers(data || []);
      } catch (error) {
        console.error('Error fetching toppers:', error);
        toast({
          title: "Error",
          description: "Failed to load academic toppers",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchToppers();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (toppers.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No academic toppers found.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {toppers.map((topper) => (
        <Card key={topper.id}>
          <div className="p-2">
            {topper.image ? (
              <div className="aspect-square w-full overflow-hidden rounded-md mb-4">
                <img 
                  src={topper.image} 
                  alt={topper.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square w-full bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-300">
                  {topper.name.charAt(0)}
                </span>
              </div>
            )}
            <h3 className="font-bold text-lg">{topper.name}</h3>
            <p className="text-sm text-gray-500">{topper.course} - {topper.year}</p>
            <p className="font-medium mt-2">{topper.achievement}</p>
            {topper.percentage && (
              <p className="text-sm font-semibold mt-1">{topper.percentage}%</p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

// Component for displaying tournament achievers
const TournamentAchievers = () => {
  const [achievers, setAchievers] = useState<TournamentAchiever[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAchievers = async () => {
      try {
        const { data, error } = await supabase
          .from('tournament_achievers')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) throw error;
        setAchievers(data || []);
      } catch (error) {
        console.error('Error fetching tournament achievers:', error);
        toast({
          title: "Error",
          description: "Failed to load tournament achievers",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAchievers();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (achievers.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No tournament achievers found.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {achievers.map((achiever) => (
        <Card key={achiever.id}>
          <div className="p-2">
            {achiever.image ? (
              <div className="aspect-square w-full overflow-hidden rounded-md mb-4">
                <img 
                  src={achiever.image} 
                  alt={achiever.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square w-full bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-300">
                  {achiever.name.charAt(0)}
                </span>
              </div>
            )}
            <h3 className="font-bold text-lg">{achiever.name}</h3>
            <div className="mt-2">
              <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                {achiever.position}
              </span>
            </div>
            <p className="text-sm mt-2">{achiever.tournament} - {achiever.year}</p>
            <p className="text-sm text-gray-500">{achiever.sport}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

// Component for displaying internships
const Internships = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const { data, error } = await supabase
          .from('internships')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) throw error;
        setInternships(data || []);
      } catch (error) {
        console.error('Error fetching internships:', error);
        toast({
          title: "Error",
          description: "Failed to load internships",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInternships();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (internships.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No internships found.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {internships.map((internship) => (
        <Card key={internship.id}>
          <CardHeader>
            <div className="h-12 flex items-center">
              {internship.image ? (
                <img 
                  src={internship.image} 
                  alt={internship.company} 
                  className="h-8 object-contain"
                />
              ) : (
                <span className="font-bold text-xl">{internship.company}</span>
              )}
            </div>
            <CardTitle className="text-xl">{internship.role}</CardTitle>
            <CardDescription>
              {internship.department} | {internship.duration} | {internship.year}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {internship.student_count && internship.student_count > 1 ? (
              <p>{internship.student_count} students participated</p>
            ) : (
              <p>1 student participated</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Component for displaying placement stats
const PlacementStats = () => {
  const [placements, setPlacements] = useState<PlacementStat[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPlacements = async () => {
      try {
        const { data, error } = await supabase
          .from('placement_stats')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4);

        if (error) throw error;
        setPlacements(data || []);
      } catch (error) {
        console.error('Error fetching placement stats:', error);
        toast({
          title: "Error",
          description: "Failed to load placement statistics",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPlacements();
  }, [toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (placements.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No placement statistics found.</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {placements.map((placement) => (
        <Card key={placement.id}>
          <CardHeader>
            <div className="h-12 flex items-center">
              {placement.image ? (
                <img 
                  src={placement.image} 
                  alt={placement.company} 
                  className="h-8 object-contain"
                />
              ) : (
                <span className="font-bold text-xl">{placement.company}</span>
              )}
            </div>
            <CardTitle>{placement.year} - {placement.department}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Students Placed:</span>
              <span className="font-semibold">{placement.students_placed}</span>
            </div>
            {placement.average_package && (
              <div className="flex justify-between">
                <span>Average Package:</span>
                <span className="font-semibold">{placement.average_package}</span>
              </div>
            )}
            {placement.highest_package && (
              <div className="flex justify-between">
                <span>Highest Package:</span>
                <span className="font-semibold">{placement.highest_package}</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Main Student Desk Component
const StudentDesk = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Student Desk</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Discover the achievements and experiences of our students through educational tours, 
          academic excellence, sports achievements, internships, and placement opportunities.
        </p>
      </div>

      <Tabs defaultValue="tours" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="tours">Educational Tours</TabsTrigger>
            <TabsTrigger value="toppers">Academic Toppers</TabsTrigger>
            <TabsTrigger value="achievers">Tournament Achievers</TabsTrigger>
            <TabsTrigger value="internships">Internships</TabsTrigger>
            <TabsTrigger value="placements">Placements</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="tours" className="mt-6">
          <h2 className="text-2xl font-bold mb-6">Educational Tours</h2>
          <EducationalTours />
        </TabsContent>
        
        <TabsContent value="toppers" className="mt-6">
          <h2 className="text-2xl font-bold mb-6">Academic Toppers</h2>
          <AcademicToppers />
        </TabsContent>
        
        <TabsContent value="achievers" className="mt-6">
          <h2 className="text-2xl font-bold mb-6">Tournament Achievers</h2>
          <TournamentAchievers />
        </TabsContent>
        
        <TabsContent value="internships" className="mt-6">
          <h2 className="text-2xl font-bold mb-6">Internships</h2>
          <Internships />
        </TabsContent>
        
        <TabsContent value="placements" className="mt-6">
          <h2 className="text-2xl font-bold mb-6">Placement Statistics</h2>
          <PlacementStats />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDesk;
