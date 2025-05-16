
import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';

type Message = {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi there! 👋 I\'m the college assistant. How can I help you today?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Generate a session ID if one doesn't exist
    const storedSessionId = localStorage.getItem('chatSessionId');
    if (storedSessionId) {
      setSessionId(storedSessionId);
      // Fetch previous messages for this session
      fetchPreviousMessages(storedSessionId);
    } else {
      const newSessionId = uuidv4();
      localStorage.setItem('chatSessionId', newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchPreviousMessages = async (sessionId: string) => {
    try {
      const { data, error } = await supabase
        .from('chatbot_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }

      if (data && data.length > 0) {
        const formattedMessages = data.map(msg => ({
          id: msg.id,
          content: msg.message,
          isBot: msg.is_bot,
          timestamp: new Date(msg.created_at),
        }));
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error('Error fetching previous messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to the UI
    const userMessage: Message = {
      id: uuidv4(),
      content: input,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Save user message to Supabase
    try {
      await supabase.from('chatbot_messages').insert({
        session_id: sessionId,
        message: input,
        is_bot: false,
      });
    } catch (error) {
      console.error('Error saving user message:', error);
    }

    // Enhanced bot logic with navigation capabilities
    setTimeout(async () => {
      let botResponse = '';
      let shouldNavigate = false;
      let navigateTo = '';
      
      const userInput = input.toLowerCase();
      
      // Application/Admission related queries
      if (userInput.includes('admission') || userInput.includes('apply') || userInput.includes('application') || 
          userInput.includes('enroll') || userInput.includes('register') || userInput.includes('join')) {
        botResponse = 'You can apply for admission through our online application form. I can take you to our Application page.';
        shouldNavigate = true;
        navigateTo = '/application';
      } 
      // Program/Course related queries
      else if (userInput.includes('course') || userInput.includes('program') || userInput.includes('degree') || 
               userInput.includes('bca') || userInput.includes('bcom') || userInput.includes('bba') ||
               userInput.includes('bsc') || userInput.includes('msc') || userInput.includes('ma') ||
               userInput.includes('bachelor') || userInput.includes('master')) {
        botResponse = 'We offer various undergraduate and postgraduate programs including BCA, BBA, BCOM, BSc IT, BSc CS, BSc Physics, BA in multiple subjects, and Masters programs. Let me take you to our Programs page where you can explore all available courses.';
        shouldNavigate = true;
        navigateTo = '/programs';
      }
      // Contact related queries
      else if (userInput.includes('contact') || userInput.includes('reach') || userInput.includes('talk to') ||
               userInput.includes('phone') || userInput.includes('email') || userInput.includes('address')) {
        botResponse = 'You can contact us via our dedicated Contact page. Let me take you there.';
        shouldNavigate = true;
        navigateTo = '/contact';
      }
      // Scholarship related queries
      else if (userInput.includes('scholarship') || userInput.includes('financial aid') || userInput.includes('fee concession') ||
               userInput.includes('discount') || userInput.includes('waiver') || userInput.includes('financial support')) {
        botResponse = 'We offer merit-based and need-based scholarships for various courses. Let me direct you to our Scholarships page.';
        shouldNavigate = true;
        navigateTo = '/scholarships';
      }
      // Campus related queries
      else if (userInput.includes('campus') || userInput.includes('facility') || userInput.includes('infrastructure') ||
               userInput.includes('hostel') || userInput.includes('library') || userInput.includes('lab')) {
        botResponse = 'Our campus offers state-of-the-art facilities for students including modern classrooms, labs, library, and sports facilities. Let me show you our Campus page.';
        shouldNavigate = true;
        navigateTo = '/campus';
      }
      // News related queries
      else if (userInput.includes('news') || userInput.includes('event') || userInput.includes('happening') ||
               userInput.includes('update') || userInput.includes('recent') || userInput.includes('announcement')) {
        botResponse = 'You can check out all our latest news and events on our News page. I can take you there.';
        shouldNavigate = true;
        navigateTo = '/news';
      }
      // Faculty related queries
      else if (userInput.includes('faculty') || userInput.includes('professor') || userInput.includes('teacher') ||
               userInput.includes('staff') || userInput.includes('lecturer')) {
        botResponse = 'We have excellent faculty members across all departments. Let me show you our Faculties page where you can learn about our professors and teaching staff.';
        shouldNavigate = true;
        navigateTo = '/faculties';
      }
      // Leadership related queries
      else if (userInput.includes('principal') || userInput.includes('director') || userInput.includes('dean') || 
                userInput.includes('leadership') || userInput.includes('management') || userInput.includes('head')) {
        botResponse = 'You can learn about our college leadership including the Principal, Directors, and Deans on the Leadership page. I can take you there.';
        shouldNavigate = true;
        navigateTo = '/leadership';
      }
      // Login related queries
      else if (userInput.includes('login') || userInput.includes('sign in') || userInput.includes('account') ||
               userInput.includes('portal') || userInput.includes('student login')) {
        botResponse = 'You can access your student account through our login page. Let me take you there.';
        shouldNavigate = true;
        navigateTo = '/login';
      }
      // About related queries
      else if (userInput.includes('about') || userInput.includes('history') || userInput.includes('college info') ||
               userInput.includes('background') || userInput.includes('establishment')) {
        botResponse = 'You can learn more about our institution, its history, vision, and mission on our About page. Let me take you there.';
        shouldNavigate = true;
        navigateTo = '/about';
      }
      // Results related queries
      else if (userInput.includes('result') || userInput.includes('grade') || userInput.includes('mark') ||
               userInput.includes('score') || userInput.includes('exam') || userInput.includes('performance')) {
        botResponse = 'You can check your examination results on our Results page. Let me direct you there.';
        shouldNavigate = true;
        navigateTo = '/results';
      }
      // Research related queries
      else if (userInput.includes('research') || userInput.includes('project') || userInput.includes('publication') ||
               userInput.includes('paper') || userInput.includes('journal') || userInput.includes('innovation')) {
        botResponse = 'You can explore our research activities, ongoing projects, and publications on our Research page. Let me take you there.';
        shouldNavigate = true;
        navigateTo = '/research';
      }
      // Achievements related queries
      else if (userInput.includes('achievement') || userInput.includes('award') || userInput.includes('recognition') ||
               userInput.includes('honor') || userInput.includes('accomplishment')) {
        botResponse = 'You can see our college achievements, awards, and recognitions on the Achievements page. Let me show you.';
        shouldNavigate = true;
        navigateTo = '/achievements';
      }
      // Calendar related queries
      else if (userInput.includes('calendar') || userInput.includes('schedule') || userInput.includes('timetable') ||
               userInput.includes('date') || userInput.includes('academic calendar')) {
        botResponse = 'You can view our academic calendar with important dates, events, and holidays on our Calendar page. Let me take you there.';
        shouldNavigate = true;
        navigateTo = '/calendar';
      }
      // Admission requirements queries
      else if (userInput.includes('requirement') || userInput.includes('eligibility') || userInput.includes('criteria') ||
               userInput.includes('qualification') || userInput.includes('document')) {
        botResponse = 'You can find detailed information about admission requirements and eligibility criteria on our Requirements page. Let me direct you there.';
        shouldNavigate = true;
        navigateTo = '/requirements';
      }
      // Admission process queries
      else if (userInput.includes('process') || userInput.includes('procedure') || userInput.includes('step') ||
               userInput.includes('how to apply') || userInput.includes('admission guide')) {
        botResponse = 'You can learn about our admission process and application steps on our Admission Process page. Let me take you there.';
        shouldNavigate = true;
        navigateTo = '/admission-process';
      }
      // General greeting
      else if (userInput.includes('hello') || userInput.includes('hi') || userInput.includes('hey') ||
               userInput.includes('greetings') || userInput.includes('good morning') || userInput.includes('good afternoon') ||
               userInput.includes('good evening')) {
        botResponse = 'Hello! How can I assist you today? You can ask me about admissions, programs, scholarships, campus facilities, or any other information about our college.';
      }
      // Fee related
      else if (userInput.includes('fee') || userInput.includes('tuition') || userInput.includes('cost') ||
               userInput.includes('price') || userInput.includes('payment') || userInput.includes('expense')) {
        botResponse = 'Our fee structure varies by course. Please visit the Admissions page for specific details about fees for different programs. Would you like me to take you there?';
        shouldNavigate = true;
        navigateTo = '/application-process';
      }
      // FAQ related
      else if (userInput.includes('faq') || userInput.includes('frequently asked') || userInput.includes('common question')) {
        botResponse = 'You can find answers to frequently asked questions on our Admissions FAQ page. Let me take you there.';
        shouldNavigate = true;
        navigateTo = '/admissions-faq';
      }
      // Thank you responses
      else if (userInput.includes('thank') || userInput.includes('thanks') || userInput.includes('appreciate')) {
        botResponse = "You're welcome! I'm glad I could help. Is there anything else you would like to know about our college?";
      }
      // Help responses
      else if (userInput.includes('help') || userInput.includes('assist') || userInput.includes('guide')) {
        botResponse = "I'd be happy to help! You can ask me about programs, admission process, scholarships, campus facilities, faculty, or any other aspect of our college. What information are you looking for today?";
      }
      // Default response
      else {
        botResponse = "I'm not sure I understand your query. Could you please rephrase your question? You can ask about admissions, courses, scholarships, campus facilities, contact information, and more.";
      }

      // Add bot message to the UI
      const botMessage: Message = {
        id: uuidv4(),
        content: botResponse,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);

      // Save bot message to Supabase
      try {
        await supabase.from('chatbot_messages').insert({
          session_id: sessionId,
          message: botResponse,
          is_bot: true,
        });
      } catch (error) {
        console.error('Error saving bot message:', error);
      }

      // Navigate if needed
      if (shouldNavigate) {
        setTimeout(() => {
          setIsOpen(false);
          navigate(navigateTo);
        }, 1500);
      }
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating chat button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button size="lg" className="rounded-full h-16 w-16 shadow-lg">
              <MessageSquare className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-[400px] p-0 flex flex-col h-full">
            <SheetHeader className="p-4 border-b">
              <SheetTitle>College Assistant</SheetTitle>
              <SheetDescription>
                Ask me anything about admissions, courses, or campus life.
              </SheetDescription>
            </SheetHeader>
            
            <div className="flex-1 overflow-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800">
                    <div className="flex space-x-2">
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t mt-auto">
              <div className="flex space-x-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message here..."
                  className="resize-none"
                  rows={2}
                />
                <Button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Chatbot;
