import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import mikhailPhoto from "@assets/image_1752901611663.png";

export default function Hero() {
  const scrollToContacts = () => {
    const element = document.getElementById("contacts");
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="home" className="pt-20 gradient-bg">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl lg:text-6xl font-bold text-neutral-700 leading-tight"
              >
                Михаил <span className="text-tek-blue">Семёнов</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 font-medium"
              >
                Заместитель генерального директора по информационным технологиям НПП ТЭК
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="gradient-primary rounded-2xl p-6 border-l-4 border-tek-blue text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
              <blockquote className="text-lg italic relative z-10">
                "Продуктивная работа - это искусство превращать идеи в результаты"
              </blockquote>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                onClick={scrollToContacts}
                className="bg-tek-blue text-white px-6 py-3 rounded-xl font-medium hover:bg-tek-blue-dark transition-colors"
              >
                Связаться со мной
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-tek-blue text-tek-blue px-6 py-3 rounded-xl font-medium hover:bg-tek-blue/10 hover:border-tek-blue-dark transition-colors"
              >
                <a href="https://npptec.ru/" target="_blank" rel="noopener noreferrer">
                  Посетить сайт компании
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 gradient-primary rounded-3xl blur-3xl opacity-30 scale-110 animate-pulse-glow"></div>
              <div className="relative gradient-primary p-2 rounded-3xl shadow-2xl">
                <motion.img
                  src={mikhailPhoto}
                  alt="Михаил Семёнов"
                  className="w-full h-auto max-w-md lg:max-w-full object-contain rounded-2xl animate-float"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
