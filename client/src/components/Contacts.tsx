import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, Clock, MessageCircle } from "lucide-react";
import type { InsertContact } from "@shared/schema";

const contactFormSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Введите корректный email"),
  subject: z.string().min(5, "Тема должна содержать минимум 5 символов"),
  message: z.string().min(10, "Сообщение должно содержать минимум 10 символов"),
  privacyAccepted: z.boolean().refine(value => value === true, {
    message: "Необходимо согласие на обработку персональных данных",
  }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "semyonovmn@gmail.com",
    gradient: "from-blue-400 to-purple-500",
  },
  {
    icon: Phone,
    title: "Телефон",
    value: "+7(3822) 999-784",
    gradient: "from-green-400 to-blue-500",
  },
  {
    icon: MessageCircle,
    title: "Telegram",
    value: "@SemyonovMN",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    icon: Clock,
    title: "Часы работы",
    value: "Пн-Пт: 09:00 - 18:00\nСб-Вс: Выходной",
    gradient: "from-orange-400 to-red-500",
  },
];

export default function Contacts() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      privacyAccepted: false,
    },
  });

  const createContactMutation = useMutation({
    mutationFn: (data: InsertContact) => apiRequest("POST", "/api/contacts", data),
    onSuccess: () => {
      toast({
        title: "Сообщение отправлено!",
        description: "Спасибо за ваше сообщение. Я свяжусь с вами в ближайшее время.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка отправки",
        description: "Произошла ошибка при отправке сообщения. Попробуйте еще раз.",
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    const { privacyAccepted, ...contactData } = data;
    createContactMutation.mutate(contactData);
  };

  return (
    <section id="contacts" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-neutral-700 mb-4">Контакты</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-tek-blue to-tek-blue-dark mx-auto"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="gradient-card border border-gray-100 card-hover">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 bg-gradient-to-br ${method.gradient} rounded-xl flex items-center justify-center mb-4`}>
                        <method.icon className="text-white w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{method.title}</h3>
                      <p className="text-gray-600 whitespace-pre-line">
                        {method.value}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="gradient-card border border-gray-100">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Связаться со мной</h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ваше имя</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Введите ваше имя"
                                className="rounded-xl border-gray-200 focus:border-tek-blue"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ваш email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Введите ваш email"
                                className="rounded-xl border-gray-200 focus:border-tek-blue"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Тема сообщения</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Введите тему сообщения"
                              className="rounded-xl border-gray-200 focus:border-tek-blue"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ваше сообщение</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder="Введите ваше сообщение"
                              className="rounded-xl border-gray-200 focus:border-tek-blue resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="privacyAccepted"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm text-gray-600">
                              Я даю согласие на обработку моих персональных данных в соответствии с Политикой конфиденциальности
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button
                      type="submit"
                      disabled={createContactMutation.isPending}
                      className="w-full bg-tek-blue text-white py-3 rounded-xl font-medium hover:bg-tek-blue-dark transition-colors disabled:opacity-50"
                    >
                      {createContactMutation.isPending ? "Отправка..." : "Отправить сообщение"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
