import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Calendar } from "lucide-react";

const certificates = [
  {
    title: "SolidWorks Professional",
    issuer: "Dassault Systèmes",
    year: "2023",
    category: "CAD/CAM",
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    title: "English B1 Level",
    issuer: "Cambridge Assessment",
    year: "2022",
    category: "Языки",
    color: "bg-green-100 text-green-700 border-green-200",
  },
  {
    title: "1С: Профессиональная разработка",
    issuer: "1С-Битрикс",
    year: "2023",
    category: "ERP",
    color: "bg-orange-100 text-orange-700 border-orange-200",
  },
  {
    title: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    year: "2023",
    category: "Cloud",
    color: "bg-purple-100 text-purple-700 border-purple-200",
  },
  {
    title: "Project Management Professional",
    issuer: "PMI",
    year: "2022",
    category: "Управление",
    color: "bg-red-100 text-red-700 border-red-200",
  },
  {
    title: "ITIL Foundation",
    issuer: "AXELOS",
    year: "2022",
    category: "IT Service",
    color: "bg-indigo-100 text-indigo-700 border-indigo-200",
  },
  {
    title: "PostgreSQL Administration",
    issuer: "PostgreSQL Global Development Group",
    year: "2023",
    category: "Database",
    color: "bg-cyan-100 text-cyan-700 border-cyan-200",
  },
  {
    title: "Python for Data Science",
    issuer: "Python Institute",
    year: "2023",
    category: "Programming",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  {
    title: "Cisco Networking Essentials",
    issuer: "Cisco",
    year: "2022",
    category: "Networking",
    color: "bg-pink-100 text-pink-700 border-pink-200",
  },
];

export default function Certificates() {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
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
