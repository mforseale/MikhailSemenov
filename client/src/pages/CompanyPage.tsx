import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer"; // если есть
import Company from "@/components/Company";

export default function CompanyPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        <Company />
      </main>
      <Footer />
    </>
  );
}
