import { contacts, articles, projects, type Contact, type InsertContact, type Article, type InsertArticle, type Project, type InsertProject } from "@shared/schema";

export interface IStorage {
  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
  
  // Articles
  getArticles(): Promise<Article[]>;
  getArticleById(id: number): Promise<Article | undefined>;
  searchArticles(query: string): Promise<Article[]>;
  getArticlesByCategory(category: string): Promise<Article[]>;
  
  // Projects
  getProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
}

export class MemStorage implements IStorage {
  private contacts: Map<number, Contact>;
  private articles: Map<number, Article>;
  private projects: Map<number, Project>;
  private currentContactId: number;
  private currentArticleId: number;
  private currentProjectId: number;

  constructor() {
    this.contacts = new Map();
    this.articles = new Map();
    this.projects = new Map();
    this.currentContactId = 1;
    this.currentArticleId = 1;
    this.currentProjectId = 1;

    // Initialize with sample articles
    this.initializeArticles();
    this.initializeProjects();
  }

  private initializeArticles() {
    const sampleArticles: InsertArticle[] = [
      {
        title: "Томское предприятие в тренде цифровизации",
        content: `2 марта 2022 года Президент РФ подписал Указ № 83, направленный на ускоренное развитие IT-отрасли. НПП «Томская электронная компания» (ТЭК) активно внедряет цифровые технологии.

## Цифровая трансформация

Компания активно внедряет современные IT-решения для оптимизации бизнес-процессов. В рамках цифровизации были внедрены системы электронного документооборота, автоматизированы процессы планирования и контроля производства.

## Результаты внедрения

За период внедрения цифровых технологий компания достигла значительных результатов:
- Повышение эффективности производственных процессов на 25%
- Сокращение времени на подготовку отчетности на 40%
- Улучшение качества принимаемых управленческих решений

## Планы развития

В ближайшие планы компании входит дальнейшее развитие IT-инфраструктуры и внедрение новых цифровых решений для повышения конкурентоспособности на рынке.`,
        excerpt: "2 марта 2022 года Президент РФ подписал Указ № 83, направленный на ускоренное развитие IT-отрасли. НПП «Томская электронная компания» (ТЭК) активно внедряет цифровые технологии.",
        category: "Цифровизация",
        publishedAt: "6 марта 2022",
        readTime: "3 мин чтения",
        featured: true,
      },
      {
        title: "«Томская Электронная Компания» внедрила около тридцати решений в сфере цифровизации бизнеса",
        content: `Специалисты отдела информационно-технического обеспечения предприятия используют около 30 систем электронной отчетности и различных цифровых сервисов.

## Внедренные решения

В числе внедренных решений:
- Системы электронной отчетности
- CRM-системы для управления клиентами
- ERP-системы для планирования ресурсов
- Системы автоматизации производства
- Цифровые сервисы для сотрудников

## Эффективность внедрения

Внедрение цифровых решений позволило значительно повысить эффективность работы всех подразделений компании и улучшить качество обслуживания клиентов.`,
        excerpt: "Специалисты отдела информационно-технического обеспечения предприятия используют около 30 систем электронной отчетности и различных цифровых сервисов.",
        category: "Автоматизация",
        publishedAt: "4 марта 2022",
        readTime: "4 мин чтения",
        featured: false,
      },
      {
        title: "Softline и Microsoft заключили соглашение Enterprise Agreement с ООО НПП ТЭК",
        content: `Softline в Томске заключила с НПП «Томская электронная компания» соглашение Microsoft Enterprise Agreement на поставку программного обеспечения.

## Преимущества соглашения

Соглашение Enterprise Agreement предоставляет компании следующие преимущества:
- Централизованное управление лицензиями
- Льготные условия приобретения ПО
- Техническая поддержка от Microsoft
- Возможность масштабирования IT-инфраструктуры

## Планы использования

В рамках соглашения планируется внедрение современных решений Microsoft для повышения эффективности работы сотрудников и оптимизации бизнес-процессов.`,
        excerpt: "Softline в Томске заключила с НПП «Томская электронная компания» соглашение Microsoft Enterprise Agreement на поставку ПО.",
        category: "IT-управление",
        publishedAt: "30 июля 2012",
        readTime: "6 мин чтения",
        featured: false,
      },
      {
        title: "НПП «Томская электронная компания» и «Утилекс АйТи» подводят итоги первого этапа внедрения ERP-системы",
        content: `НПП «ТЭК» и «Утилекс АйТи» завершили первый этап внедрения Microsoft Dynamics AX.

## Первый этап внедрения

На первом этапе были реализованы следующие модули:
- Управление финансами
- Управление запасами
- Планирование производства
- Управление персоналом

## Результаты первого этапа

Внедрение первого этапа ERP-системы позволило:
- Автоматизировать основные бизнес-процессы
- Повысить прозрачность управления
- Улучшить контроль за финансовыми потоками
- Оптимизировать управление запасами

## Планы второго этапа

На втором этапе планируется внедрение дополнительных модулей для полной автоматизации всех бизнес-процессов компании.`,
        excerpt: "НПП «ТЭК» и «Утилекс АйТи» завершили первый этап внедрения Microsoft Dynamics AX.",
        category: "ERP-системы",
        publishedAt: "27 февраля 2009",
        readTime: "5 мин чтения",
        featured: false,
      },
    ];

    sampleArticles.forEach(article => {
      const id = this.currentArticleId++;
      this.articles.set(id, { ...article, id });
    });
  }

  private initializeProjects() {
    const sampleProjects: InsertProject[] = [
      {
        title: "HR-бот в Telegram",
        description: "Интеллектуальный бот для автоматизации HR-процессов.",
        technologies: ["Python", "Telegram Bot API", "PostgreSQL", "1С"],
        category: "Автоматизация",
        icon: "fas fa-robot",
      },
      {
        title: "Трекер времени \"UseMyTime\"",
        description: "Система учета рабочего времени и управления проектами. Позволяет отслеживать время, затраченное на задачи, генерировать отчеты и анализировать эффективность работы команды.",
        technologies: ["React", "Node.js", "MongoDB", "React Native"],
        category: "Управление",
        icon: "fas fa-clock",
      },
      {
        title: "ИТ-регламенты",
        description: "Комплексная система регламентов и процедур для ИТ-отдела.",
        technologies: ["Confluence", "JIRA", "Git", "ITIL"],
        category: "Документооборот",
        icon: "fas fa-file-alt",
      },
      {
        title: "AI ChatGPT-боты",
        description: "Интеллектуальные чат-боты на базе GPT для автоматизации клиентского сервиса, технической поддержки и внутренних бизнес-процессов компании.",
        technologies: ["OpenAI API", "Python", "FastAPI", "Redis"],
        category: "ИИ",
        icon: "fas fa-brain",
      },
      {
        title: "Сайты компании",
        description: "Разработка и поддержка корпоративных веб-сайтов.",
        technologies: ["WordPress", "PHP", "JavaScript", "MySQL"],
        category: "Веб-разработка",
        icon: "fas fa-globe",
      },
      {
        title: "Битрикс 24",
        description: "Внедрение и настройка Битрикс24.",
        technologies: ["Битрикс24", "REST API", "Webhooks", "1С"],
        category: "CRM",
        icon: "fas fa-cog",
      },
    ];

    sampleProjects.forEach(project => {
      const id = this.currentProjectId++;
      this.projects.set(id, { ...project, id });
    });
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = { 
      ...insertContact, 
      id,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values());
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async searchArticles(query: string): Promise<Article[]> {
    const allArticles = Array.from(this.articles.values());
    const lowercaseQuery = query.toLowerCase();
    
    return allArticles.filter(article => 
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.content.toLowerCase().includes(lowercaseQuery) ||
      article.excerpt.toLowerCase().includes(lowercaseQuery)
    );
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    const allArticles = Array.from(this.articles.values());
    return allArticles.filter(article => article.category === category);
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }
}

export const storage = new MemStorage();
