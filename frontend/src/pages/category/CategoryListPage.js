import Footer from "../../components/Footer";
import NavBarLanding from "../../components/elements/NavBarLanding";
import CategoryList from "../../components/elements/CategoryList";
import CategorySection from "../../components/elements/CategorySection";

export default function CategoryListPage() {
  return (
    <div>
      <NavBarLanding />
      <CategorySection />
      <CategoryList />
      <Footer />
    </div>
  );
}
