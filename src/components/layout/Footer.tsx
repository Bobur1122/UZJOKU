import React from 'react';
import { Link } from 'react-router-dom';
import { NewspaperIcon, MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { CATEGORIES } from '../../data/newsData';
export function Footer() {
  const { t, getCategoryName } = useLanguage();
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <NewspaperIcon className="h-6 w-6" />
              <span className="text-xl font-bold">UniNews</span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              {t.footer.desc}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-white transition-colors">
                  {t.nav.news}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {t.footer.categories}
            </h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              {CATEGORIES.slice(0, 4).map((cat) =>
              <li key={cat}>
                  <Link
                  to={`/news?category=${cat}`}
                  className="hover:text-white transition-colors">

                    {getCategoryName(cat)}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t.footer.contactUs}</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-center space-x-2">
                <MapPinIcon className="h-4 w-4" />
                <span>123 University Ave, Campus Center</span>
              </li>
              <li className="flex items-center space-x-2">
                <PhoneIcon className="h-4 w-4" />
                <span>+998 123 45 67</span>
              </li>
              <li className="flex items-center space-x-2">
                <MailIcon className="h-4 w-4" />
                <span>Jaku@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/60">
          <p>
            © {new Date().getFullYear()} UniNews Portal. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>);

}