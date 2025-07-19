import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@shared/schema";

const categoryColors: Record<string, string> = {
  "Автоматизация": "bg-green-100 text-green-700 border-green-200",
  "Управление": "bg-purple-100 text-purple-700 border-purple-200",
  "Документооборот": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "ИИ": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Веб-разработка": "bg-orange-100 text-orange-700 border-orange-200",
  "CRM": "bg-blue-100 text-blue-700 border-blue-200",
};

const techColors = [
  "bg-yellow-100 text-yellow-700 border-yellow-200",
  "bg-blue-100 text-blue-700 border-blue-200",
  "bg-purple-100 text-purple-700 border-purple-200",
  "bg-red-100 text-red-700 border-red-200",
  "bg-green-100 text-green-700 border-green-200",
  "bg-cyan-100 text-cyan-700 border-cyan-200",
  "bg-orange-100 text-orange-700 border-orange-200",
];

export default function Projects() {
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const getTechColor = (index: number) => {
    return techColors[index % techColors.length];
  };

  const getIconGradient = (category: string) => {
    const gradients = {
      "Автоматизация": "from-green-400 to-blue-500",
      "Управление": "from-purple-400 to-pink-500",
      "Документооборот": "from-indigo-400 to-purple-500",
      "ИИ": "from-emerald-400 to-teal-500",
      "Веб-разработка": "from-orange-400 to-red-500",
      "CRM": "from-blue-400 to-indigo-500",
    };
    return gradients[category as keyof typeof gradients] || "from-gray-400 to-gray-500";
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <section className="pt-20 py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-neutral-700 mb-4">Проекты нашей компании</h1>
            <p className="text-lg text-gray-600 mb-6">
              Инновационные решения в области информационных технологий, автоматизации бизнес-процессов и цифровой трансформации
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-tek-blue to-tek-blue-dark mx-auto"></div>
          </motion.div>

          {isLoading ? (
            <div className="text-center">Загрузка проектов...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="gradient-card border border-gray-100 card-hover h-full group">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${getIconGradient(project.category)} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <i className={`${project.icon} text-white text-xl`}></i>
                        </div>
                        <Badge className={categoryColors[project.category] || "bg-gray-100 text-gray-700 border-gray-200"}>
                          {project.category}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className={`text-xs font-medium ${getTechColor(techIndex)}`}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
