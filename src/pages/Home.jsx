import { ThemeToggle } from "../components/ThemeToggle";
import { NavBar } from "../components/NavbarComponent";
import { SlidebarComponent } from "../components/SlidebarComponent";
import { QuarantineSection } from "../components/QuarantineSection";
import { FooterSection } from "../components/FooterSection";
import { CategorySection } from "../components/CategorySection";
import ReviewSection from "../components/ReviewSection";
import ChatPopupComponent from "../components/ChatPopupComponent";

export const Home = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <NavBar />
      <main>
        <SlidebarComponent />
        <ChatPopupComponent />
          <CategorySection
            title="Album"
            categoryId="686c87d435b0be429eb0c040"
          // link="/category/albums"
          />

        <CategorySection
          title="LightStick"
          categoryId="686c87d435b0be429eb0c044"
        // link="/category/lightsticks"
        />
        {/* <ReviewSection /> */}
        <QuarantineSection />
        <FooterSection />
      </main>
    </div>
  );
};
