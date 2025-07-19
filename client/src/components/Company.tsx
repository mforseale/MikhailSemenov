import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Globe } from "lucide-react";
import companyImage1 from "@assets/image_1752905450607.png";
import companyImage2 from "@assets/image_1752905455120.png";
import companyImage3 from "@assets/image_1752905460870.png";
import companyImage4 from "@assets/image_1752905464093.png";
import tekLogo from "@assets/a78fed02-64f2-468b-9d91-58a20b8897b4_1752901753167.png";

const companyImages = [
  companyImage1,
  companyImage2,
  companyImage3,
  companyImage4,
];

export default function Company() {
  return (
    <section id="company" className="py-16 gradient-bg">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={tekLogo} 
                  alt="НПП ТЭК Логотип" 
                  className="w-16 h-12 object-contain"
                />
                <h2 className="text-4xl font-bold text-neutral-700">О месте работы</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                НПП «Томская электронная компания» — современное инжиниринговое и производственное предприятие, 
                предлагающее решения, продукцию и разработку программного обеспечения.
              </p>
              <div className="space-y-3">
                <p className="flex items-center text-gray-600">
                  <MapPin className="text-tek-blue mr-3 w-5 h-5" />
                  634040, Россия, г. Томск, ул. Высоцкого, д. 33
                </p>
                <p className="flex items-center text-gray-600">
                  <Globe className="text-tek-blue mr-3 w-5 h-5" />
                  <a 
                    href="https://npptec.ru/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-tek-blue hover:underline"
                  >
                    https://npptec.ru
                  </a>
                </p>
              </div>
            </div>

            <Button
              asChild
              className="bg-tek-blue text-white px-8 py-3 rounded-xl font-medium hover:bg-tek-blue-dark transition-colors"
            >
              <a href="https://npptec.ru/" target="_blank" rel="noopener noreferrer">
                Посетить сайт компании
              </a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {companyImages.map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt={`Компания изображение ${index + 1}`}
                className={`rounded-2xl shadow-lg object-cover ${
                  index % 2 === 1 ? "mt-8" : ""
                } ${index < 2 ? "h-48" : "h-40"}`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
