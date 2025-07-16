import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export const FooterSection = () => {
  return (
    <footer className="bg-pink-50/60 dark:bg-background text-foreground border-t border-pink-200 mt-10">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <Link
            to="/"
            className="text-3xl font-extrabold bg-gradient-to-r from-pink-400 to-pink-600 bg-clip-text text-transparent tracking-tight"
          >
            Kpop Merch SHOP
          </Link>
          <p className="mt-3 text-sm text-gray-600 dark:text-muted-foreground leading-relaxed">
            Your go-to shop for official LE SSERAFIM albums and merch. Fast shipping & top-tier service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold text-pink-600 mb-3 uppercase tracking-wide">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-muted-foreground">
            <li><Link to="/" className="hover:text-pink-500 transition">Shop</Link></li>
            <li><Link to="/collections" className="hover:text-pink-500 transition">Collections</Link></li>
            <li><Link to="/new" className="hover:text-pink-500 transition">New Arrivals</Link></li>
            <li><Link to="/sale" className="hover:text-pink-500 transition">Sale</Link></li>
            <li><Link to="/contact" className="hover:text-pink-500 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Socials */}
        <div className="text-center">
          <h4 className="text-lg font-bold text-pink-600 mb-3 uppercase tracking-wide">Follow Us</h4>
          <div className="flex justify-center md:justify-center gap-6 text-pink-500 text-xl">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-700 transition">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-700 transition">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-700 transition">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 dark:text-muted-foreground py-4 border-t border-pink-100">
        &copy; {new Date().getFullYear()} LE SSERAFIM Shop. All rights reserved.
      </div>
    </footer>
  );
};
export default FooterSection