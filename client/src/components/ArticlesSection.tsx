import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Calendar, Clock } from "lucide-react";
import ArticleModal from "./ArticleModal";
import type { Article } from "@shared/schema";

const categories = ["all", "Цифровизация", "Автоматизация", "IT-управление", "ERP-системы"];

export default function ArticlesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const { data: articles = [], isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });
  console.log(articles);
  const filteredArticles = articles.filter(article => {
    const matchesSearch = !searchQuery || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }).slice(0, 4); // Show only first 4 articles

  const featuredArticle = filteredArticles.find(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <section id="articles" className="py-20 gradient-bg">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-neutral-700 mb-4">Статьи и публикации</h2>
          <p className="text-lg text-gray-600 mb-6">
            Делюсь опытом в области IT-управления, цифровизации бизнеса и внедрения современных технологий
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-tek-blue to-tek-blue-dark mx-auto"></div>
        </motion.div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Поиск по статьям..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3 rounded-xl border-gray-200 focus:border-primary"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-tek-blue hover:bg-tek-blue-dark" : ""}
                >
                  {category === "all" ? "Все статьи" : category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="text-center">Загрузка статей...</div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Featured Article */}
              {featuredArticle && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="md:col-span-2"
                >
                  <Card className="gradient-primary text-white relative overflow-hidden card-hover cursor-pointer"
                        onClick={() => setSelectedArticle(featuredArticle)}>
                    <CardContent className="p-8">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-4">
                          <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                            Рекомендуемое
                          </Badge>
                          <Badge variant="secondary" className="bg-tek-red/80 text-white border-tek-red/80">
                            {featuredArticle.category}
                          </Badge>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-4">{featuredArticle.title}</h3>
                        <p className="text-white/90 mb-6 leading-relaxed">
                          {featuredArticle.excerpt}
                        </p>
                        
                        <div className="flex items-center text-white/80 text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          {featuredArticle.publishedAt}
                          <span className="mx-2">•</span>
                          <Clock className="w-4 h-4 mr-2" />
                          {featuredArticle.readTime}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Regular Articles */}
              {regularArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white border border-gray-100 card-hover cursor-pointer h-full"
                        onClick={() => setSelectedArticle(article)}>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <Badge variant="secondary" className="tech-tag">
                          {article.category}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          {article.publishedAt}
                          <span className="mx-2">•</span>
                          <Clock className="w-4 h-4 mr-1" />
                          {article.readTime}
                        </div>
                        
                        <Button variant="ghost" size="sm" className="text-tek-blue hover:text-tek-blue-dark">
                          Читать полностью
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8 text-gray-500">
              Показано: {filteredArticles.length} из {articles.length} статей
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Link href="/articles">
                <Button className="bg-tek-blue text-white hover:bg-tek-blue-dark transition-colors">
                  Посмотреть все статьи
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </div>

      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </section>
  );
}
