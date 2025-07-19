import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AboutApproach from "@/components/AboutApproach";
import Company from "@/components/Company";
import ProjectsSection from "@/components/ProjectsSection";
import ArticlesSection from "@/components/ArticlesSection";
import Certificates from "@/components/Certificates";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <AboutApproach />
        <Company />
        <ProjectsSection />
        <ArticlesSection />
        <Certificates />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}
