import Link from "next/link";
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="mx-8 my-4 mt-40 h-52 rounded-xl">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">DoughSplit</h2>
            <p className="text-gray-600">
              Split expenses with friends, the easy way.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <FaGithub size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                <FaDiscord size={24} />
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-800"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-800">
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-800"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 pt-8 text-xs text-center text-gray-600">
          <p>© {new Date().getFullYear()} DoughSplit. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
