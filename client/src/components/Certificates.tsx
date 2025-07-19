import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar } from "lucide-react";
import solidworksCert from "@assets/image_1752905492150.png";
import englishCert from "@assets/image_1752905498961.png";
import onecCert from "@assets/image_1752905501892.png";

const certificates = [
  {
    title: "SolidWorks",
    issuer: "Внедрение современного ПО от SolidWorks",
    year: "2018",
    category: "CAD/CAM",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    image: solidworksCert,
    featured: true,
  },
  {
    title: "General English B1",
    issuer: "Общий английский язык В1",
    year: "2018",
    category: "Языки",
    color: "bg-green-100 text-green-700 border-green-200",
    image: englishCert,
    featured: true,
  },
  {
    title: "1С:Концепция и Торговый функционал",
    issuer: "1С-Образование",
    year: "2011",
    category: "ERP",
    color: "bg-orange-100 text-orange-700 border-orange-200",
    image: onecCert,
    featured: true,
  },
  {
    title: "1С:Планирование и Бюджетирование",
    issuer: "1С-Образование",
    year: "2011",
    category: "ERP",
    color: "bg-orange-100 text-orange-700 border-orange-200",
  },
  {
    title: "Пользователь справочной системы \"Техэксперт\"",
    issuer: "Региональный центр нормативно-технической документации",
    year: "2011",
    category: "Документооборот",
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
  },
  {
    title: "Основы ITIL v3 2011",
    issuer: "Softline",
    year: "2016",
    category: "IT Service",
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
  },
  {
    title: "Управление проектами компании",
    issuer: "Softline",
    year: "2012",
    category: "Управление",
    color: "bg-red-100 text-red-700 border-red-200",
  },
  {
    title: "Создание запросов на языке Transact-SQL",
    issuer: "Softline",
    year: "2012",
    category: "Database",
    color: "bg-cyan-100 text-cyan-700 border-cyan-200",
  },
];

export default function Certificates() {
  const featuredCertificates = certificates.filter(cert => cert.featured);
  const regularCertificates = certificates.filter(cert => !cert.featured);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-neutral-700 mb-4">Сертификаты и достижения</h2>
          <p className="text-lg text-gray-600 mb-6">
            Профессиональные сертификаты и квалификации в области информационных технологий
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-tek-blue to-tek-blue-dark mx-auto"></div>
        </motion.div>

        {/* Featured Certificates with Images */}
        {featuredCertificates.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredCertificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="gradient-card border border-gray-100 card-hover h-full group cursor-pointer">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={cert.image} 
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-tek-blue to-tek-blue-dark rounded-xl flex items-center justify-center">
                        <Award className="text-white w-6 h-6" />
                      </div>
                      <Badge variant="outline" className={cert.color}>
                        {cert.category}
                      </Badge>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2 leading-tight">{cert.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{cert.issuer}</p>
                    
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      {cert.year}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Regular Certificates */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularCertificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="gradient-card border border-gray-100 card-hover h-full">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-tek-blue to-tek-blue-dark rounded-xl flex items-center justify-center">
                      <Award className="text-white w-6 h-6" />
                    </div>
                    <Badge variant="outline" className={cert.color}>
                      {cert.category}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 leading-tight">{cert.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{cert.issuer}</p>
                  
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {cert.year}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
