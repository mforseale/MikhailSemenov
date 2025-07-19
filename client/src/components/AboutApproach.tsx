import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Users, Handshake } from "lucide-react";

const approaches = [
  {
    icon: Code,
    title: "Развитие ИТ",
    description: "Развитие ИТ — мой приоритет. Автоматизация и инфраструктура — всё это должно стать частью бизнес-процессов компании.",
    gradient: "from-blue-400 to-purple-500",
  },
  {
    icon: Users,
    title: "Командная работа",
    description: "Считаю, что эффективная команда — это половина успеха любого проекта.",
    gradient: "from-green-400 to-blue-500",
  },
  {
    icon: Handshake,
    title: "Партнёрские отношения",
    description: "Важно выстраивать взаимовыгодные отношения с партнёрами. Ценю надёжность, ответственность и готовность к долгосрочному сотрудничеству.",
    gradient: "from-purple-400 to-pink-500",
  },
];

export default function AboutApproach() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-neutral-700 mb-4">О моем подходе к работе</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-tek-blue to-tek-blue-dark mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {approaches.map((approach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="gradient-card card-hover h-full">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${approach.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                    <approach.icon className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{approach.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {approach.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
