import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "@/hooks/use-toast";
import { CheckCircle, ChevronRight, BadgeDollarSign, Medal, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';

// Form schema
const scholarshipSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  courseId: z.string().optional(),
  currentEducation: z.string().min(2, "Current education must be at least 2 characters"),
  familyIncome: z.string().min(1, "Family income is required"),
  reasonForScholarship: z.string().min(10, "Please provide a detailed reason (min. 10 characters)"),
});

type ScholarshipFormValues = z.infer<typeof scholarshipSchema>;

// Fetch courses
const useCourses = () => {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('id, title, type, department')
        .order('title');
      
      if (error) throw error;
      return data || [];
    },
  });
};

const Scholarships = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data: courses = [] } = useCourses();
  
  const form = useForm<ScholarshipFormValues>({
    resolver: zodResolver(scholarshipSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      courseId: undefined,
      currentEducation: "",
      familyIncome: "",
      reasonForScholarship: "",
    },
  });

  const onSubmit = async (data: ScholarshipFormValues) => {
    try {
      const { error } = await supabase.from('scholarship_applications').insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        course_id: data.courseId ? parseInt(data.courseId) : null,
        current_education: data.currentEducation,
        family_income: data.familyIncome,
        reason_for_scholarship: data.reasonForScholarship,
      });

      if (error) throw error;

      toast({
        title: "Application submitted successfully",
        description: "Your scholarship application has been submitted. We will review it and get back to you.",
      });
      
      setIsDialogOpen(false);
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const meritScholarships = [
    {
      title: "Academic Excellence Scholarship",
      amount: "₹50,000 per annum",
      eligibility: "For students with 90% or above in qualifying examination",
      deadline: "July 31, 2025",
      coverage: "Tuition fee waiver"
    },
    {
      title: "Sports Merit Scholarship",
      amount: "₹40,000 per annum",
      eligibility: "For students with national/state level achievements in sports",
      deadline: "July 31, 2025",
      coverage: "Tuition fee waiver and sports equipment allowance"
    },
    {
      title: "Creative Arts Scholarship",
      amount: "₹35,000 per annum",
      eligibility: "For students with exceptional achievements in music, dance, fine arts, etc.",
      deadline: "July 31, 2025",
      coverage: "Tuition fee waiver and arts materials allowance"
    }
  ];

  const needBasedScholarships = [
    {
      title: "Financial Need Scholarship",
      amount: "Up to ₹30,000 per annum",
      eligibility: "For students from economically weaker sections with family income below ₹3 lakhs per annum",
      deadline: "July 15, 2025",
      coverage: "Partial tuition fee waiver"
    },
    {
      title: "Single Parent Support Scholarship",
      amount: "₹25,000 per annum",
      eligibility: "For students raised by a single parent with financial constraints",
      deadline: "July 15, 2025",
      coverage: "Partial tuition fee waiver"
    }
  ];

  const externalScholarships = [
    {
      title: "National Scholarship Portal Schemes",
      provider: "Government of India",
      amount: "Varies based on scheme",
      eligibility: "Various criteria including merit, category, and income",
      link: "https://scholarships.gov.in"
    },
    {
      title: "State Government Scholarship",
      provider: "State Government",
      amount: "Varies based on scheme",
      eligibility: "Domicile of the state with merit and income criteria",
      link: "#"
    },
    {
      title: "Corporate Scholarships",
      provider: "Various Corporate Houses",
      amount: "Varies based on company",
      eligibility: "Merit with specific criteria set by companies",
      link: "#"
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Scholarships</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          DAV College offers various scholarships to support deserving students in pursuing their academic goals.
          Explore our range of merit-based and need-based scholarships.
        </p>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <BadgeDollarSign className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Merit-Based Scholarships</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {meritScholarships.map((scholarship, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{scholarship.title}</CardTitle>
                  <Badge className="bg-primary">{scholarship.amount}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Eligibility:</p>
                    <p className="text-gray-600">{scholarship.eligibility}</p>
                  </div>
                  <div>
                    <p className="font-medium">Coverage:</p>
                    <p className="text-gray-600">{scholarship.coverage}</p>
                  </div>
                  <div className="flex items-center text-amber-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <p>Deadline: {scholarship.deadline}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setIsDialogOpen(true)}>
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Medal className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Need-Based Scholarships</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {needBasedScholarships.map((scholarship, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{scholarship.title}</CardTitle>
                  <Badge className="bg-secondary">{scholarship.amount}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Eligibility:</p>
                    <p className="text-gray-600">{scholarship.eligibility}</p>
                  </div>
                  <div>
                    <p className="font-medium">Coverage:</p>
                    <p className="text-gray-600">{scholarship.coverage}</p>
                  </div>
                  <div className="flex items-center text-amber-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    <p>Deadline: {scholarship.deadline}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setIsDialogOpen(true)}>
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <BadgeDollarSign className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">External Scholarships</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {externalScholarships.map((scholarship, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{scholarship.title}</CardTitle>
                <CardDescription>Provider: {scholarship.provider}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium">Amount:</p>
                    <p className="text-gray-600">{scholarship.amount}</p>
                  </div>
                  <div>
                    <p className="font-medium">Eligibility:</p>
                    <p className="text-gray-600">{scholarship.eligibility}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <a href={scholarship.link} target="_blank" rel="noreferrer">
                    Visit Website <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">How to Apply for Scholarships</h2>
        <ol className="space-y-4 mb-6">
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Apply for Admission</p>
              <p className="text-gray-600">Complete the admission process and secure your seat at DAV College.</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Submit Scholarship Application</p>
              <p className="text-gray-600">Fill out the scholarship application form available at the admission office or online portal.</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Provide Supporting Documents</p>
              <p className="text-gray-600">Submit all required documents such as income certificates, mark sheets, achievements, etc.</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Scholarship Committee Review</p>
              <p className="text-gray-600">Applications will be reviewed by the scholarship committee based on the defined criteria.</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Award Notification</p>
              <p className="text-gray-600">Selected students will be notified about the scholarship award through email or post.</p>
            </div>
          </li>
        </ol>
        
        <Button onClick={() => setIsDialogOpen(true)}>
          Apply for Scholarships
        </Button>
      </div>
      
      {/* Scholarship Application Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Scholarship Application</DialogTitle>
            <DialogDescription>
              Fill out this form to apply for a scholarship at DAV College.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="johndoe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+91 98765 43210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="courseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Applying For</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={String(course.id)}>
                              {course.title} - {course.type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currentEducation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Education</FormLabel>
                      <FormControl>
                        <Input placeholder="12th Standard/Bachelor's Degree" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="familyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Family Income</FormLabel>
                    <FormControl>
                      <Input placeholder="₹300,000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reasonForScholarship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Why are you applying for this scholarship?</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please explain your reason for applying to this scholarship..."
                        className="min-h-[150px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-4">
                <Button variant="outline" type="button" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Application
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Scholarships;
