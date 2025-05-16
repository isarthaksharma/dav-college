
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MenuIcon, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile, useMediaQuery } from "@/hooks/use-mobile";
import SearchBar from "./SearchBar";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          
          <Link to="https://pbs.twimg.com/profile_images/1151148480833785856/AUVmt05__200x200.jpg"
           className="font-bold text-xl text-primary">
            DAV College
          </Link>

          {/* Desktop Navigation */}
          <nav className={cn("hidden lg:flex items-center gap-1")}>
            {/* Main Nav Items */}
            <NavItem to="/" label="Home" />
            <NavDropdown
              label="About"
              items={[
                { to: "/about", label: "About Us" },
                { to: "/leadership", label: "Leadership" },
                { to: "/campus", label: "Campus" },
                { to: "/achievements", label: "Achievements" },
              ]}
            />
            <NavDropdown
              label="Academics"
              items={[
                { to: "/programs", label: "Programs" },
                { to: "/faculties", label: "Faculties" },
                { to: "/research", label: "Research" },
                { to: "/calendar", label: "Calendar" },
                { to: "/results", label: "Results" },
              ]}
            />
            <NavDropdown
              label="Admissions"
              items={[
                { to: "/application-process", label: "Process" },
                { to: "/scholarships", label: "Scholarships" },
                { to: "/requirements", label: "Requirements" },
                { to: "/admissions-faq", label: "FAQs" },
              ]}
            />
            <NavItem to="/news" label="News & Events" />
            <NavItem to="/contact" label="Contact" />
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:block w-56">
              <SearchBar />
            </div>

            <div className="flex items-center gap-2">
              <Link to="/admin">
                <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
                  <User size={16} />
                  <span>Admin</span>
                </Button>
              </Link>
              <Link to="/application">
                <Button size="sm" className="hidden sm:inline-flex">
                  Apply Now
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleMobileMenu}
            >
              <MenuIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-6 pb-2 border-b">
            <Link
              to="/"
              className="font-bold text-xl text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              DAV College
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="mb-4">
            <SearchBar />
          </div>

          <nav className="space-y-6">
            <div className="space-y-2">
              <MobileNavItem to="/" label="Home" onClick={toggleMobileMenu} />
            </div>

            <MobileNavGroup
              title="About"
              items={[
                { to: "/about", label: "About Us" },
                { to: "/leadership", label: "Leadership" },
                { to: "/campus", label: "Campus" },
                { to: "/achievements", label: "Achievements" },
              ]}
              onClick={toggleMobileMenu}
            />

            <MobileNavGroup
              title="Academics"
              items={[
                { to: "/programs", label: "Programs" },
                { to: "/faculties", label: "Faculties" },
                { to: "/research", label: "Research" },
                { to: "/calendar", label: "Calendar" },
                { to: "/results", label: "Results" },
              ]}
              onClick={toggleMobileMenu}
            />

            <MobileNavGroup
              title="Admissions"
              items={[
                { to: "/application-process", label: "Process" },
                { to: "/scholarships", label: "Scholarships" },
                { to: "/requirements", label: "Requirements" },
                { to: "/admissions-faq", label: "FAQs" },
              ]}
              onClick={toggleMobileMenu}
            />

            <div className="space-y-2">
              <MobileNavItem
                to="/news"
                label="News & Events"
                onClick={toggleMobileMenu}
              />
              <MobileNavItem
                to="/contact"
                label="Contact"
                onClick={toggleMobileMenu}
              />
            </div>
          </nav>

          <div className="mt-6 pt-4 border-t flex flex-col gap-2">
            <Link to="/admin" onClick={toggleMobileMenu}>
              <Button variant="outline" className="w-full flex items-center gap-2 justify-center">
                <User size={16} />
                <span>Admin Panel</span>
              </Button>
            </Link>
            <Link to="/application" onClick={toggleMobileMenu}>
              <Button className="w-full">Apply Now</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

interface NavItemProps {
  to: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
    >
      {label}
    </Link>
  );
};

interface DropdownItem {
  to: string;
  label: string;
}

interface NavDropdownProps {
  label: string;
  items: DropdownItem[];
}

const NavDropdown: React.FC<NavDropdownProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors flex items-center">
        {label}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ml-1 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-md overflow-hidden border border-gray-200 z-20">
          <div className="py-1">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface MobileNavItemProps {
  to: string;
  label: string;
  onClick: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ to, label, onClick }) => {
  return (
    <Link
      to={to}
      className="block py-2.5 text-base font-medium text-gray-800 hover:text-primary transition-colors"
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

interface MobileNavGroupProps {
  title: string;
  items: DropdownItem[];
  onClick: () => void;
}

const MobileNavGroup: React.FC<MobileNavGroupProps> = ({ title, items, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t pt-2">
      <button
        className="flex items-center justify-between w-full py-2.5 text-base font-medium text-gray-800 hover:text-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="pl-4 space-y-1 pt-1 pb-2">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block py-2 text-base text-gray-600 hover:text-primary transition-colors"
              onClick={onClick}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
