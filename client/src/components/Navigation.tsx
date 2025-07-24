import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import tekLogo from "@assets/image_1752901844317.png";
const navItems = [
  { href: "/", label: "Главная", id: "home" },
  { href: "/articles", label: "Статьи", id: "articles" },
  { href: "/projects", label: "Проекты", id: "projects" },
  { href: "/company", label: "Компания", id: "company" },
  { href: "/contacts", label: "Контакты", id: "contacts" },
];

export default function Navigation() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
          current = section.getAttribute('id') || '';
        }
      });

      setActiveSection(current);
    };

    if (location === "/") {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Call once to set initial state
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location]);

  const handleNavClick = (href: string, id: string) => {
    if (href.startsWith("#")) {
      if (location === "/") {
        // Scroll to section on same page
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // Navigate to home page with hash
        window.location.href = "/" + href;
      }
    }
    setIsMenuOpen(false);
  };

  const isActive = (href: string, id: string) => {
    if (href === "/") {
      return location === "/" && (activeSection === "home" || activeSection === "");
    }
    if (href.startsWith("#")) {
      return location === "/" && activeSection === id;
    }
    return location === href;
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 w-full glass z-50 border-b border-gray-100"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="w-12 h-12 bg-gradient-to-br from-tek-blue to-tek-blue-dark rounded-xl flex items-center justify-center overflow-hidden">
                <img src={tekLogo} alt="ТЭК" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-neutral-700">Михаил Семёнов</h1>
                <p className="text-sm text-gray-500">IT Director</p>
              </div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ href, label, id }) => (
              <Link key={id} href={href}>
                <button
                  className={`nav-link transition-all duration-200 ${
                    isActive(href, id)
                      ? "nav-active font-medium"
                      : "text-gray-600 hover:text-tek-blue"
                  }`}
                  onClick={() => handleNavClick(href, id)}
                >
                  {label}
                </button>
              </Link>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pt-4 border-t border-gray-200"
          >
            {navItems.map(({ href, label, id }) => (
              <Link key={id} href={href}>
                <button
                  className={`block w-full text-left py-2 px-2 rounded-lg transition-colors ${
                    isActive(href, id)
                      ? "text-tek-blue font-medium bg-blue-50"
                      : "text-gray-600 hover:text-tek-blue hover:bg-gray-50"
                  }`}
                  onClick={() => handleNavClick(href, id)}
                >
                  {label}
                </button>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
