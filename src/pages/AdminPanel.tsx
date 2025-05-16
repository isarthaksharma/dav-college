import React, { useState, useEffect } from 'react';
import { BadgeDollarSign, UserPlus, Trash2, Edit, BookOpen, Award, AlertTriangle, Eye, Loader2, Medal, Briefcase, GraduationCap, UsersRound } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  EducationalToursTab,
  AcademicToppersTab,
  TournamentAchieversTab,
  InternshipsTab,
  PlacementStatsTab
} from "@/components/admin/StudentDeskTabs";

// Predefined admin users
const ADMIN_USERS = [
  { email: "amardeep.gupta@gmail.com", password: "123456" },
  { email: "puneet.sharma@gmail.com", password: "123456" }
];

// Department and Course Type as constant types to ensure type safety
type Department = "Science" | "Arts & Humanities" | "Commerce" | "Computer Science";
type CourseType = "undergraduate" | "postgraduate" | "diploma" | "certificate";

// Type definitions - updated to match Supabase schema
type Faculty = {
  id?: number;
  user_id?: number;
  department: Department;
  designation: string;
  qualification: string;
  experience: string;
  specialization?: string;
  phone?: string;
  bio?: string;
  name?: string; // Added to our type but not in database
};

type Course = {
  id?: number;
  title: string;
  code: string;
  department: Department;
  type: CourseType;
  duration: string;
  description?: string;
  eligibility?: string;
};

type Scholarship = {
  id?: number;
  title: string;
  description: string;
  eligibility: string;
  amount: string;
  deadline?: string;
};

type Leader = {
  id?: number;
  name: string;
  position: string;
  bio: string;
  image?: string;
};

type NewsArticle = {
  id?: number;
  title: string;
  content: string;
  publish_date?: string;
  image?: string;
  featured?: boolean;
};

// For form submissions
type NewFaculty = {
  name: string;
  department: Department;
  designation: string;
  qualification: string;
  experience: string;
  specialization?: string;
  phone?: string;
  bio?: string;
};

const AdminPanel = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("faculty");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Data states
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [scholarshipList, setScholarshipList] = useState<Scholarship[]>([]);
  const [leadershipList, setLeadershipList] = useState<Leader[]>([]);
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  
  // Form states
  const [newFaculty, setNewFaculty] = useState<NewFaculty>({ 
    name: '', department: 'Computer Science', designation: '', qualification: '', experience: '' 
  });
  const [newCourse, setNewCourse] = useState<Course>({ 
    title: '', code: '', department: 'Computer Science', type: 'undergraduate', duration: '' 
  });
  const [newScholarship, setNewScholarship] = useState<Scholarship>({ 
    title: '', description: '', eligibility: '', amount: '' 
  });
  const [newLeader, setNewLeader] = useState<Leader>({ 
    name: '', position: '', bio: '' 
  });
  const [newArticle, setNewArticle] = useState<NewsArticle>({ 
    title: '', content: '', featured: false 
  });
  
  // Loading states
  const [loading, setLoading] = useState({
    faculty: false,
    courses: false,
    scholarships: false,
    leadership: false,
    news: false
  });

  // Check if admin is logged in from localStorage on component mount
  useEffect(() => {
    const adminAuth = localStorage.getItem("adminAuth");
    if (adminAuth === "true") {
      setIsAuthenticated(true);
      
      // Load initial data based on the active tab
      if (activeTab === "faculty") {
        fetchFacultyData();
      }
    }
  }, []);

  // Fetch data when active tab changes
  useEffect(() => {
    if (isAuthenticated) {
      switch (activeTab) {
        case "faculty":
          fetchFacultyData();
          break;
        case "courses":
          fetchCourseData();
          break;
        case "scholarships":
          // We'll use static data for scholarships since it's not in the database yet
          loadStaticScholarshipData();
          break;
        case "leadership":
          // We'll use static data for leadership since it's not in the database yet
          loadStaticLeadershipData();
          break;
        case "news":
          fetchNewsData();
          break;
        default:
          break;
      }
    }
  }, [activeTab, isAuthenticated]);

  // Static data for sections that don't have a database table yet
  const loadStaticScholarshipData = () => {
    setScholarshipList([
      {
        id: 1,
        title: "Merit Scholarship",
        description: "Scholarship for students with excellent academic records",
        eligibility: "Students with 90% or above in previous exams",
        amount: "₹50,000",
        deadline: "2025-06-30"
      },
      {
        id: 2,
        title: "Sports Excellence Scholarship",
        description: "For students with outstanding achievements in sports",
        eligibility: "National or state level sports certificates",
        amount: "₹30,000"
      }
    ]);
    setLoading(prev => ({ ...prev, scholarships: false }));
  };

  const loadStaticLeadershipData = () => {
    const leaders = [
      {
        id: 1,
        name: "Dr. Rajesh Kumar",
        position: "Principal",
        bio: "Dr. Kumar has over 25 years of academic experience and has been leading DAV College since 2015.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
      },
      {
        id: 2,
        name: "Dr. Priya Sharma",
        position: "Vice Principal",
        bio: "Dr. Sharma oversees academic affairs and has implemented several innovative teaching methodologies.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
      }
    ];
    setLeadershipList(leaders);
    setLoading(prev => ({ ...prev, leadership: false }));
  };

  // Data fetching functions
  const fetchFacultyData = async () => {
    if (loading.faculty) return;
    
    setLoading(prev => ({ ...prev, faculty: true }));
    try {
      const { data, error } = await supabase
        .from('faculty')
        .select('*');
      
      if (error) throw error;
      
      const facultyWithName = data?.map(faculty => ({
        ...faculty,
        name: `Faculty ${faculty.id}` // Placeholder name since it's not in the database
      })) || [];
      
      setFacultyList(facultyWithName);
    } catch (error) {
      console.error('Error fetching faculty data:', error);
      toast({
        title: "Error",
        description: "Failed to load faculty data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, faculty: false }));
    }
  };

  const fetchCourseData = async () => {
    if (loading.courses) return;
    
    setLoading(prev => ({ ...prev, courses: true }));
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*');
      
      if (error) throw error;
      
      setCourseList(data || []);
    } catch (error) {
      console.error('Error fetching course data:', error);
      toast({
        title: "Error",
        description: "Failed to load course data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, courses: false }));
    }
  };

  const fetchNewsData = async () => {
    if (loading.news) return;
    
    setLoading(prev => ({ ...prev, news: true }));
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*');
      
      if (error) throw error;
      
      setNewsList(data || []);
    } catch (error) {
      console.error('Error fetching news data:', error);
      toast({
        title: "Error",
        description: "Failed to load news data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(prev => ({ ...prev, news: false }));
    }
  };

  // Handle admin login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const adminUser = ADMIN_USERS.find(
      admin => admin.email === email && admin.password === password
    );
    
    if (adminUser) {
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel.",
      });
      setIsAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    }
  };

  // Handle admin logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("adminAuth");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  // Handle faculty operations
  const handleAddFaculty = async () => {
    try {
      const facultyData = {
        department: newFaculty.department,
        designation: newFaculty.designation,
        qualification: newFaculty.qualification,
        experience: newFaculty.experience,
        specialization: newFaculty.specialization,
        phone: newFaculty.phone,
        bio: newFaculty.bio
      };

      const { data, error } = await supabase
        .from('faculty')
        .insert([facultyData])
        .select();

      if (error) throw error;

      const addedFaculty = {
        ...data![0],
        name: newFaculty.name
      };

      setFacultyList(prev => [...prev, addedFaculty]);
      setNewFaculty({ 
        name: '', department: 'Computer Science', designation: '', qualification: '', experience: '' 
      });
      toast({
        title: "Success",
        description: "Faculty member added successfully.",
      });
    } catch (error) {
      console.error('Error adding faculty:', error);
      toast({
        title: "Error",
        description: "Failed to add faculty member. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteFaculty = async (id: number) => {
    try {
      const { error } = await supabase
        .from('faculty')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setFacultyList(prev => prev.filter(faculty => faculty.id !== id));
      toast({
        title: "Success",
        description: "Faculty member deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting faculty:', error);
      toast({
        title: "Error",
        description: "Failed to delete faculty member. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle course operations
  const handleAddCourse = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert([{
          title: newCourse.title,
          code: newCourse.code,
          department: newCourse.department,
          type: newCourse.type,
          duration: newCourse.duration,
          description: newCourse.description,
          eligibility: newCourse.eligibility
        }])
        .select();

      if (error) throw error;

      setCourseList(prev => [...prev, data![0]]);
      setNewCourse({ 
        title: '', code: '', department: 'Computer Science', type: 'undergraduate', duration: '' 
      });
      toast({
        title: "Success",
        description: "Course added successfully.",
      });
    } catch (error) {
      console.error('Error adding course:', error);
      toast({
        title: "Error",
        description: "Failed to add course. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCourse = async (id: number) => {
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCourseList(prev => prev.filter(course => course.id !== id));
      toast({
        title: "Success",
        description: "Course deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting course:', error);
      toast({
        title: "Error",
        description: "Failed to delete course. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle scholarship operations (Since there's no scholarships table, we'll just simulate it)
  const handleAddScholarship = async () => {
    try {
      const newId = scholarshipList.length > 0 
        ? Math.max(...scholarshipList.map(s => s.id || 0)) + 1 
        : 1;
      
      const newScholarshipWithId = {
        ...newScholarship,
        id: newId
      };

      setScholarshipList(prev => [...prev, newScholarshipWithId]);
      setNewScholarship({ 
        title: '', description: '', eligibility: '', amount: '' 
      });
      toast({
        title: "Success",
        description: "Scholarship added successfully.",
      });
    } catch (error) {
      console.error('Error adding scholarship:', error);
      toast({
        title: "Error",
        description: "Failed to add scholarship. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteScholarship = async (id: number) => {
    try {
      setScholarshipList(prev => prev.filter(scholarship => scholarship.id !== id));
      toast({
        title: "Success",
        description: "Scholarship deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting scholarship:', error);
      toast({
        title: "Error",
        description: "Failed to delete scholarship. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle leadership operations (Since there's no leadership table, we'll just simulate it)
  const handleAddLeader = async () => {
    try {
      const newId = leadershipList.length > 0 
        ? Math.max(...leadershipList.map(l => l.id || 0)) + 1 
        : 1;
      
      const newLeaderWithId = {
        ...newLeader,
        id: newId
      };

      setLeadershipList(prev => [...prev, newLeaderWithId]);
      setNewLeader({ 
        name: '', position: '', bio: '' 
      });
      toast({
        title: "Success",
        description: "Leader added successfully.",
      });
    } catch (error) {
      console.error('Error adding leader:', error);
      toast({
        title: "Error",
        description: "Failed to add leader. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteLeader = async (id: number) => {
    try {
      setLeadershipList(prev => prev.filter(leader => leader.id !== id));
      toast({
        title: "Success",
        description: "Leader deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting leader:', error);
      toast({
        title: "Error",
        description: "Failed to delete leader. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle news operations
  const handleAddNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .insert([{
          title: newArticle.title,
          content: newArticle.content,
          featured: newArticle.featured,
          publish_date: new Date().toISOString(),
          image: newArticle.image
        }])
        .select();

      if (error) throw error;

      setNewsList(prev => [...prev, data![0]]);
      setNewArticle({ 
        title: '', content: '', featured: false 
      });
      toast({
        title: "Success",
        description: "News article added successfully.",
      });
    } catch (error) {
      console.error('Error adding news:', error);
      toast({
        title: "Error",
        description: "Failed to add news article. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteNews = async (id: number) => {
    try {
      const { error } = await supabase
        .from('news')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setNewsList(prev => prev.filter(article => article.id !== id));
      toast({
        title: "Success",
        description: "News article deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting news:', error);
      toast({
        title: "Error",
        description: "Failed to delete news article. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle admin operations
  const handleAddAdmin = () => {
    toast({
      title: "Not Implemented",
      description: "Adding new admin users requires backend implementation.",
      variant: "destructive",
    });
  };

  // Type-safe handler for department selection
  const handleDepartmentChange = (value: Department) => {
    setNewFaculty(prev => ({ ...prev, department: value }));
  };

  // Type-safe handler for course department selection
  const handleCourseDepartmentChange = (value: Department) => {
    setNewCourse(prev => ({ ...prev, department: value }));
  };

  // Type-safe handler for course type selection
  const handleCourseTypeChange = (value: CourseType) => {
    setNewCourse(prev => ({ ...prev, type: value }));
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen py-12 bg-gray-50 flex items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>Please log in to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Admin panel components for each tab
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Panel</h1>
          <p className="text-gray-600">Manage college data and settings</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-8 mb-8">
          <TabsTrigger value="faculty" className="flex items-center gap-2">
            <BadgeDollarSign className="h-4 w-4" />
            <span>Faculty</span>
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Courses</span>
          </TabsTrigger>
          <TabsTrigger value="scholarships" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span>Scholarships</span>
          </TabsTrigger>
          <TabsTrigger value="leadership" className="flex items-center gap-2">
            <BadgeDollarSign className="h-4 w-4" />
            <span>Leadership</span>
          </TabsTrigger>
          <TabsTrigger value="news" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>News</span>
          </TabsTrigger>
          <TabsTrigger value="studentDesk" className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            <span>Student Desk</span>
          </TabsTrigger>
          <TabsTrigger value="admins" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span>Admins</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faculty">
          <Card>
            <CardHeader>
              <CardTitle>Manage Faculty</CardTitle>
              <CardDescription>Add, edit or delete faculty members</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mb-6">
                    <UserPlus className="mr-2 h-4 w-4" /> Add New Faculty
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Faculty Member</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add a new faculty member.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="faculty-name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="faculty-name"
                        className="col-span-3"
                        value={newFaculty.name}
                        onChange={(e) => setNewFaculty(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="faculty-department" className="text-right">
                        Department
                      </Label>
                      <Select
                        value={newFaculty.department}
                        onValueChange={handleDepartmentChange}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="Arts & Humanities">Arts & Humanities</SelectItem>
                          <SelectItem value="Commerce">Commerce</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="faculty-designation" className="text-right">
                        Designation
                      </Label>
                      <Input
                        id="faculty-designation"
                        className="col-span-3"
                        value={newFaculty.designation}
                        onChange={(e) => setNewFaculty(prev => ({ ...prev, designation: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="faculty-qualification" className="text-right">
                        Qualification
                      </Label>
                      <Input
                        id="faculty-qualification"
                        className="col-span-3"
                        value={newFaculty.qualification}
                        onChange={(e) => setNewFaculty(prev => ({ ...prev, qualification: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="faculty-experience" className="text-right">
                        Experience
                      </Label>
                      <Input
                        id="faculty-experience"
                        className="col-span-3"
                        value={newFaculty.experience}
                        onChange={(e) => setNewFaculty(prev => ({ ...prev, experience: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="faculty-phone" className="text-right">
                        Phone
                      </Label>
                      <Input
                        id="faculty-phone"
                        className="col-span-3"
                        value={newFaculty.phone || ""}
                        onChange={(e) => setNewFaculty(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="faculty-specialization" className="text-right">
                        Specialization
                      </Label>
                      <Input
                        id="faculty-specialization"
                        className="col-span-3"
                        value={newFaculty.specialization || ""}
                        onChange={(e) => setNewFaculty(prev => ({ ...prev, specialization: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="faculty-bio" className="text-right">
                        Bio
                      </Label>
                      <Textarea
                        id="faculty-bio"
                        className="col-span-3"
                        value={newFaculty.bio || ""}
                        onChange={(e) => setNewFaculty(prev => ({ ...prev, bio: e.target.value }))}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddFaculty}>Add Faculty</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              {loading.faculty ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : facultyList.length === 0 ? (
                <div className="text-center p-8 text-gray-500">
                  No faculty members found.
                </div>
              ) : (
                <div className="space-y-4">
                  {facultyList.map((faculty) => (
                    <div key={faculty.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
                      <div>
                        <h3 className="font-medium">{faculty.name}</h3>
                        <p className="text-sm text-gray-500">{faculty.department} - {faculty.designation}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => faculty.id && handleDeleteFaculty(faculty.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Manage Courses</CardTitle>
              <CardDescription>Add, edit or delete courses</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mb-6">
                    <BookOpen className="mr-2 h-4 w-4" /> Add New Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Course</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add a new course.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="course-title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="course-title"
                        className="col-span-3"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="course-code" className="text-right">
                        Code
                      </Label>
                      <Input
                        id="course-code"
                        className="col-span-3"
                        value={newCourse.code}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, code: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="course-department" className="text-right">
                        Department
                      </Label>
                      <Select
                        value={newCourse.department}
                        onValueChange={handleCourseDepartmentChange}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="Arts & Humanities">Arts & Humanities</SelectItem>
                          <SelectItem value="Commerce">Commerce</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="course-type" className="text-right">
                        Type
                      </Label>
                      <Select
                        value={newCourse.type}
                        onValueChange={handleCourseTypeChange}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="undergraduate">Undergraduate</SelectItem>
                          <SelectItem value="postgraduate">Postgraduate</SelectItem>
                          <SelectItem value="diploma">Diploma</SelectItem>
                          <SelectItem value="certificate">Certificate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="course-duration" className="text-right">
                        Duration
                      </Label>
                      <Input
                        id="course-duration"
                        className="col-span-3"
                        value={newCourse.duration}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, duration: e.target.value }))}
                        placeholder="e.g. 3 years"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="course-description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="course-description"
                        className="col-span-3"
                        value={newCourse.description || ""}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="course-eligibility" className="text-right">
                        Eligibility
                      </Label>
                      <Textarea
                        id="course-eligibility"
                        className="col-span-3"
                        value={newCourse.eligibility || ""}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, eligibility: e.target.value }))}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddCourse}>Add Course</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              {loading.courses ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : courseList.length === 0 ? (
                <div className="text-center p-8 text-gray-500">
                  No courses found.
                </div>
              ) : (
                <div className="space-y-4">
                  {courseList.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
                      <div>
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-gray-500">{course.department} - {course.code}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => course.id && handleDeleteCourse(course.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scholarships">
          <Card>
            <CardHeader>
              <CardTitle>Manage Scholarships</CardTitle>
              <CardDescription>Add, edit or delete scholarship opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="mb-4">
                <Award className="mr-2 h-4 w-4" /> Add New Scholarship
              </Button>
              <p className="text-gray-500">Scholarship listing and management functionality will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leadership">
          <Card>
            <CardHeader>
              <CardTitle>Manage Leadership</CardTitle>
              <CardDescription>Add, edit or delete leadership positions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="mb-4">
                <UserPlus className="mr-2 h-4 w-4" /> Add New Leader
              </Button>
              <p className="text-gray-500">Leadership team listing and management functionality will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news">
          <Card>
            <CardHeader>
              <CardTitle>Manage News</CardTitle>
              <CardDescription>Add, edit or delete news articles</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mb-6">
                    <Edit className="mr-2 h-4 w-4" /> Add New Article
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New News Article</DialogTitle>
                    <DialogDescription>
                      Fill in the details to add a new news article.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="article-title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="article-title"
                        className="col-span-3"
                        value={newArticle.title}
                        onChange={(e) => setNewArticle(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="article-content" className="text-right">
                        Content
                      </Label>
                      <Textarea
                        id="article-content"
                        className="col-span-3"
                        value={newArticle.content}
                        onChange={(e) => setNewArticle(prev => ({ ...prev, content: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="article-image" className="text-right">
                        Image URL
                      </Label>
                      <Input
                        id="article-image"
                        className="col-span-3"
                        value={newArticle.image || ""}
                        onChange={(e) => setNewArticle(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="article-featured" className="text-right">
                        Featured
                      </Label>
                      <div className="col-span-3 flex items-center">
                        <input
                          id="article-featured"
                          type="checkbox"
                          checked={newArticle.featured}
                          onChange={(e) => setNewArticle(prev => ({ ...prev, featured: e.target.checked }))}
                          className="mr-2"
                        />
                        <span className="text-sm">Mark as featured</span>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddNews}>Add Article</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              {loading.news ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : newsList.length === 0 ? (
                <div className="text-center p-8 text-gray-500">
                  No news articles found.
                </div>
              ) : (
                <div className="space-y-4">
                  {newsList.map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
                      <div>
                        <h3 className="font-medium">{article.title}</h3>
                        <p className="text-sm text-gray-500">
                          {article.publish_date && new Date(article.publish_date).toLocaleDateString()}
                          {article.featured && ' • Featured'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => article.id && handleDeleteNews(article.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="studentDesk">
          <Tabs defaultValue="tours" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="tours" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Educational Tours</span>
              </TabsTrigger>
              <TabsTrigger value="toppers" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>Academic Toppers</span>
              </TabsTrigger>
              <TabsTrigger value="achievers" className="flex items-center gap-2">
                <Medal className="h-4 w-4" />
                <span>Tournament Achievers</span>
              </TabsTrigger>
              <TabsTrigger value="internships" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span>Internships</span>
              </TabsTrigger>
              <TabsTrigger value="placements" className="flex items-center gap-2">
                <UsersRound className="h-4 w-4" />
                <span>Placements</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tours">
              <EducationalToursTab />
            </TabsContent>

            <TabsContent value="toppers">
              <AcademicToppersTab />
            </TabsContent>

            <TabsContent value="achievers">
              <TournamentAchieversTab />
            </TabsContent>

            <TabsContent value="internships">
              <InternshipsTab />
            </TabsContent>

            <TabsContent value="placements">
              <PlacementStatsTab />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="admins">
          {/* Admin management functionality will be displayed here. */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
