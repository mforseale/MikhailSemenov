import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer"; // если есть
import Contacts from "@/components/Contacts";

export default function ContactsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
