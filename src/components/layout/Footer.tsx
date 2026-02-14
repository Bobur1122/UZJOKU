import React from 'react';
import { Link } from 'react-router-dom';
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CATEGORIES } from '../../data/newsData';
export function Footer() {
  const { t, getCategoryName } = useLanguage();
  return (
    <footer className="mt-auto bg-primary text-primary-foreground">
      <div className="container px-4 py-8 md:py-12 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Site logo"
                className="h-14 md:h-20 object-contain max-w-full drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]" />
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-primary-foreground/80">
              {t.footer.desc}
            </p>
          </div>

          {/* Quick Links */}
          <div className="hidden sm:block">
            <h3 className="mb-3 md:mb-4 text-base md:text-lg font-semibold">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-primary-foreground/80">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/news" className="transition-colors hover:text-white">
                  {t.nav.news}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="hidden sm:block">
            <h3 className="mb-3 md:mb-4 text-base md:text-lg font-semibold">
              {t.footer.categories}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-primary-foreground/80">
              {CATEGORIES.slice(0, 4).map((cat) =>
              <li key={cat}>
                  <Link
                  to={`/news?category=${cat}`}
                  className="transition-colors hover:text-white">

                    {getCategoryName(cat)}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 md:mb-4 text-base md:text-lg font-semibold">
              {t.footer.contactUs}
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-primary-foreground/80">
              <li className="flex items-center space-x-2">
                <MapPinIcon className="w-4 h-4" />
                <span>123 University Ave, Campus Center</span>
              </li>
              <li className="flex items-center space-x-2">
                <PhoneIcon className="w-4 h-4" />
                <span>+998 123 45 67</span>
              </li>
              <li className="flex items-center space-x-2">
                <MailIcon className="w-4 h-4" />
                <span>Jaku@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 md:pt-8 mt-8 md:mt-12 text-xs sm:text-sm text-center border-t border-primary-foreground/20 text-primary-foreground/60">
          <p>
            © {new Date().getFullYear()} UniNews Portal. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>);

}
