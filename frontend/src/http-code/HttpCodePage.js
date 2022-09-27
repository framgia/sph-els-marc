import HttpCode from "../components/elements/HttpCode";
import NavBarDashboard from "../components/elements/NavBarDashboard";
import NavBarSideDashboard from "../components/elements/NavBarSideDashboard";
import Footer from "../components/Footer";

export default function HttpCodePage() {
  return (
    <>
      <NavBarDashboard />
      <NavBarSideDashboard />
      <HttpCode />
      <Footer />
    </>
  );
}
