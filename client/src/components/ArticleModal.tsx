import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Calendar, Clock } from "lucide-react";
import type { Article } from "@shared/schema";

interface ArticleModalProps {
  article: Article;
  isOpen: boolean;
  onClose: () => void;
}

export default function ArticleModal({ article, isOpen, onClose }: ArticleModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 modal-backdrop z-50"
            onClick={onClose}
          />
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="tech-tag">
                    {article.category}
                  </Badge>
                  {article.featured && (
                    <Badge variant="secondary" className="bg-tek-red/10 text-tek-red border-tek-red/20">
                      Рекомендуемое
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
                <div className="p-6">
                  <h1 className="text-3xl font-bold text-neutral-700 mb-4">
                    {article.title}
                  </h1>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-6">
                    <Calendar className="w-4 h-4 mr-2" />
                    {article.publishedAt}
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4 mr-2" />
                    {article.readTime}
                  </div>
                  
                  <div className="prose max-w-none">
                    <div className="text-lg text-gray-600 mb-6 p-4 bg-gray-50 rounded-xl">
                      {article.excerpt}
                    </div>
                    
                    <div className="space-y-4">
                      {article.content.split('\n\n').map((paragraph, index) => {
                        if (paragraph.startsWith('## ')) {
                          return (
                            <h2 key={index} className="text-2xl font-bold text-neutral-700 mt-8 mb-4">
                              {paragraph.replace('## ', '')}
                            </h2>
                          );
                        }
                        
                        if (paragraph.startsWith('- ')) {
                          const items = paragraph.split('\n').filter(item => item.startsWith('- '));
                          return (
                            <ul key={index} className="list-disc list-inside space-y-2 ml-4">
                              {items.map((item, itemIndex) => (
                                <li key={itemIndex} className="text-gray-700">
                                  {item.replace('- ', '')}
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        
                        return (
                          <p key={index} className="text-gray-700 leading-relaxed">
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>
                    
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl mt-8 border-l-4 border-tek-blue">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Опубликовано:</strong> {article.publishedAt}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Время чтения:</strong> {article.readTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
