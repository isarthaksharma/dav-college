
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, ChevronRight, Newspaper, CalendarDays } from 'lucide-react';

interface NewsProps {
  title: string;
  date: string;
  excerpt: string;
  category: string;
  image: string;
}

const NewsCard = ({ title, date, excerpt, category, image }: NewsProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-[16/9] relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
        <Badge className="absolute top-3 left-3">{category}</Badge>
      </div>
      <CardHeader>
        <CardDescription>{date}</CardDescription>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{excerpt}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Read More</Button>
      </CardFooter>
    </Card>
  );
};

interface EventProps {
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
}

const EventCard = ({ title, date, time, location, description, category }: EventProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardDescription>{date}</CardDescription>
            <CardTitle>{title}</CardTitle>
          </div>
          <Badge>{category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{location}</span>
          </div>
        </div>
        <p className="text-gray-600">{description}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">Event Details</Button>
      </CardFooter>
    </Card>
  );
};

const News = () => {
  const newsItems = [
    {
      title: "DAV College Receives 'A++' Grade in NAAC Accreditation",
      date: "May 10, 2025",
      excerpt: "DAV College has been awarded the prestigious 'A++' grade by the National Assessment and Accreditation Council (NAAC), marking a significant milestone in its academic journey.",
      category: "Achievement",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "College Signs MoU with International Universities",
      date: "May 5, 2025",
      excerpt: "DAV College has signed Memorandums of Understanding with three prestigious international universities to facilitate student exchange programs and collaborative research.",
      category: "Partnership",
      image: "https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "DAV Student Wins National Science Competition",
      date: "April 28, 2025",
      excerpt: "Aarav Sharma, a final year student of B.Sc. Physics, has won the first prize at the National Science Competition for his innovative project on renewable energy solutions.",
      category: "Student Achievement",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "New Advanced Research Center Inaugurated",
      date: "April 15, 2025",
      excerpt: "The state-of-the-art Advanced Research Center was inaugurated at DAV College campus by the Education Minister, enhancing the research capabilities of the institution.",
      category: "Infrastructure",
      image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "DAV College Launches New Courses for Upcoming Academic Year",
      date: "April 8, 2025",
      excerpt: "The college has announced the introduction of five new undergraduate and three postgraduate programs for the upcoming academic year, focusing on emerging fields.",
      category: "Academics",
      image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Faculty Member Published in Prestigious International Journal",
      date: "March 25, 2025",
      excerpt: "Dr. Priya Sharma, Associate Professor of Chemistry, has published her groundbreaking research on sustainable chemical processes in the prestigious 'Nature Chemistry' journal.",
      category: "Research",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ];

  const upcomingEvents = [
    {
      title: "Annual Cultural Festival 'Ehsaas 2025'",
      date: "May 15-18, 2025",
      time: "10:00 AM - 9:00 PM",
      location: "College Main Auditorium and Campus Grounds",
      description: "The annual cultural extravaganza featuring music, dance, drama, literary events, and art exhibitions with participation from colleges across the country.",
      category: "Cultural"
    },
    {
      title: "National Conference on Sustainable Development",
      date: "May 22-23, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Seminar Hall, Academic Block",
      description: "A two-day conference bringing together researchers, policymakers, and industry experts to discuss challenges and solutions for sustainable development.",
      category: "Academic"
    },
    {
      title: "Career Fair 2025",
      date: "May 25, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "College Stadium",
      description: "Annual job fair with over 50 companies from various sectors offering placement opportunities for final year students and alumni.",
      category: "Career"
    },
    {
      title: "Workshop on Artificial Intelligence",
      date: "May 28-29, 2025",
      time: "9:30 AM - 4:30 PM",
      location: "Computer Science Lab, Tech Block",
      description: "Hands-on workshop on AI technologies, machine learning algorithms, and their practical applications in different industries.",
      category: "Workshop"
    }
  ];

  const pastEvents = [
    {
      title: "Alumni Meet 2025",
      date: "April 10, 2025",
      time: "5:00 PM - 9:00 PM",
      location: "College Amphitheater",
      description: "Annual gathering of alumni across different batches to reconnect, network, and share their experiences with current students.",
      category: "Alumni"
    },
    {
      title: "Science Exhibition",
      date: "March 25-26, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Science Block",
      description: "Exhibition of innovative science projects by students showcasing their practical understanding and application of scientific concepts.",
      category: "Academic"
    },
    {
      title: "Inter-College Sports Tournament",
      date: "March 15-20, 2025",
      time: "8:00 AM - 6:00 PM",
      location: "College Sports Complex",
      description: "Annual sports competition featuring cricket, football, basketball, volleyball, athletics, and indoor games with participation from regional colleges.",
      category: "Sports"
    },
    {
      title: "Blood Donation Camp",
      date: "March 5, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "College Health Center",
      description: "Voluntary blood donation campaign organized in collaboration with the Red Cross Society to support local blood banks.",
      category: "Social"
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">News & Events</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Stay updated with the latest news, announcements, and events happening at DAV College.
          From academic achievements to cultural celebrations, find all the information here.
        </p>
      </div>

      <Tabs defaultValue="news">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              <span>News</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>Events</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="news">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsItems.map((news, index) => (
              <NewsCard 
                key={index}
                title={news.title}
                date={news.date}
                excerpt={news.excerpt}
                category={news.category}
                image={news.image}
              />
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All News <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="events">
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              <div className="grid md:grid-cols-2 gap-6">
                {upcomingEvents.map((event, index) => (
                  <EventCard 
                    key={index}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    location={event.location}
                    description={event.description}
                    category={event.category}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="past">
              <div className="grid md:grid-cols-2 gap-6">
                {pastEvents.map((event, index) => (
                  <EventCard 
                    key={index}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    location={event.location}
                    description={event.description}
                    category={event.category}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All Events <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Stay updated with the latest news, events, and announcements from DAV College.
          Subscribe to our newsletter for regular updates delivered directly to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary flex-grow"
          />
          <Button>Subscribe</Button>
        </div>
      </div>
    </div>
  );
};

export default News;
