// src/pages/ProductDetailPage.jsx
import { NavBar } from "../components/NavbarComponent";
import { FooterSection } from "../components/FooterSection";
import { ProductDetailComponent } from "../components/ProductDetailComponent";

export const ProductDetailPage = () => {
  return (
    <div className="bg-background text-foreground">
      <NavBar />
      <main>
        <ProductDetailComponent />
      </main>
      <FooterSection />
    </div>
  );
};

export default ProductDetailPage;
