import { motion } from "framer-motion";
import tekLogo from "@assets/image_1752901844317.png";

const sections = [
  { href: "#home", label: "Главная" },
  { href: "/articles", label: "Статьи" },
  { href: "/projects", label: "Проекты" },
  { href: "#company", label: "Компания" },
  { href: "#contacts", label: "Контакты" },
];

const contacts = [
  "semyonovmn@gmail.com",
  "+7(3822) 999-784",
  "@SemyonovMN",
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1));
      element?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="gradient-primary text-white py-12"
    >
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center overflow-hidden">
                <img src={tekLogo} alt="ТЭК" className="w-6 h-6 object-contain" />
              </div>
              <h3 className="text-xl font-bold">Михаил Семёнов</h3>
            </div>
            <p className="text-white/80">
              Заместитель генерального директора по информационным технологиям НПП ТЭК
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Разделы</h4>
            <ul className="space-y-2 text-white/80">
              {sections.map(({ href, label }) => (
                <li key={label}>
                  {href.startsWith("#") ? (
                    <button
                      onClick={() => handleNavClick(href)}
                      className="hover:text-white transition-colors text-left"
                    >
                      {label}
                    </button>
                  ) : (
                    <a href={href} className="hover:text-white transition-colors">
                      {label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Контакты</h4>
            <ul className="space-y-2 text-white/80">
              {contacts.map((contact, index) => (
                <li key={index}>{contact}</li>
              ))}
              <li>
                <a
                  href="https://npptec.ru/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  npptec.ru
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8 mt-8 text-center text-white/60">
          <p>© 2024 Михаил Семёнов. Все права защищены.</p>
        </div>
      </div>
    </motion.footer>
  );
}
