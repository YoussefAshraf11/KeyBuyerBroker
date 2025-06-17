// src/components/Footer.jsx
import { Link } from "react-router-dom";
import FaceBook from "../../assets/Fotter/Facebook_Logo_2023.svg";
import Instagram from "../../assets/Fotter/1384064.svg";
import XIcon from "../../assets/Fotter/x-social-media-black-icon.svg";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12 grid gap-8 md:grid-cols-4">
        {/* Column 1 */}
        <div className="space-y-2">
          <h3 className="font-semibold">© 2025 KeyFinder</h3>
          <p className="text-sm">All Rights Reserved.</p>
          <p className="text-sm">Smart solutions for Real Estate brokerage</p>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/realstate-projects" className="hover:text-accent">
                Projects
              </Link>
            </li>
            <li>
              <Link to="/residences" className="hover:text-accent">
                Developers
              </Link>
            </li>
            <li>
              <Link to="/map" className="hover:text-accent">
                Interactive Map
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="font-semibold mb-4">Get To Know Us</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-accent">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-accent">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4 (Social Icons) */}
        <div className="flex items-start md:items-center gap-6">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img src={Instagram} alt="Instagram" className="h-6 w-6" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <img src={FaceBook} alt="Facebook" className="h-6 w-6" />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
          >
            <img src={XIcon} alt="X" className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
