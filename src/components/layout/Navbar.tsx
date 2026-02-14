import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  NewspaperIcon,
  MenuIcon,
  XIcon,
  ShieldCheckIcon,
  GlobeIcon } from
'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, Language } from '../../context/LanguageContext';
import { CATEGORIES } from '../../data/newsData';
export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdmin, logout } = useAuth();
  const { lang, setLang, t, getCategoryName } = useLanguage();
  const location = useLocation();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const isActive = (path: string) => {
    return location.pathname === path ?
    'text-primary font-semibold' :
    'text-muted-foreground hover:text-primary';
  };
  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    // Don't close menu on lang change in mobile to allow user to see the change
  };
  // Calculate position for the sliding pill
  const getPillPosition = () => {
    switch (lang) {
      case 'uz':
        return 'translate-x-0';
      case 'en':
        return 'translate-x-full';
      case 'ru':
        return 'translate-x-[200%]';
      default:
        return 'translate-x-0';
    }
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2"
          onClick={closeMenu}>

          <NewspaperIcon className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight">UniNews</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          {/* Categories as direct links */}
          {CATEGORIES.map((cat) =>
          <Link
            key={cat}
            to={`/news?category=${cat}`}
            className="text-muted-foreground hover:text-primary transition-colors">

              {getCategoryName(cat)}
            </Link>
          )}

          {/* Language Switcher with Sliding Animation */}
          <div className="flex items-center border-l pl-4 ml-2">
            <div className="relative flex bg-muted rounded-full p-1 h-9 w-[108px]">
              {/* Sliding Pill */}
              <div
                className={`absolute top-1 left-1 w-8 h-7 bg-background rounded-full shadow-sm transition-transform duration-300 ease-in-out ${getPillPosition()}`} />


              {/* Language Buttons */}
              <button
                onClick={() => handleLangChange('uz')}
                className={`relative z-10 w-8 h-7 text-xs font-medium transition-colors rounded-full ${lang === 'uz' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>

                UZ
              </button>
              <button
                onClick={() => handleLangChange('en')}
                className={`relative z-10 w-8 h-7 text-xs font-medium transition-colors rounded-full ${lang === 'en' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>

                EN
              </button>
              <button
                onClick={() => handleLangChange('ru')}
                className={`relative z-10 w-8 h-7 text-xs font-medium transition-colors rounded-full ${lang === 'ru' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>

                RU
              </button>
            </div>
          </div>

          {isAdmin &&
          <div className="flex items-center space-x-4 ml-4 border-l pl-4">
              <Link
              to="/admin/dashboard"
              className="text-primary font-semibold flex items-center">

                <ShieldCheckIcon className="h-4 w-4 mr-1" />
                {t.nav.adminDashboard}
              </Link>
              <Button variant="outline" size="sm" onClick={logout}>
                {t.nav.logout}
              </Button>
            </div>
          }
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu">

          {isMenuOpen ?
          <XIcon className="h-6 w-6" /> :

          <MenuIcon className="h-6 w-6" />
          }
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen &&
      <div className="lg:hidden border-t p-4 bg-background absolute w-full shadow-lg animate-accordion-down max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col space-y-4">
            <div className="p-2">
              <p className="font-semibold mb-2 text-muted-foreground">
                {t.nav.categories}
              </p>
              <div className="pl-4 space-y-3 border-l-2">
                {CATEGORIES.map((cat) =>
              <Link
                key={cat}
                to={`/news?category=${cat}`}
                className="block text-sm hover:text-primary font-medium"
                onClick={closeMenu}>

                    {getCategoryName(cat)}
                  </Link>
              )}
              </div>
            </div>

            <Link
            to="/news"
            className={`p-2 rounded-md hover:bg-muted ${isActive('/news')}`}
            onClick={closeMenu}>

              {t.nav.news}
            </Link>

            <div className="flex items-center space-x-2 p-2">
              <span className="text-sm font-medium mr-2">
                <GlobeIcon className="h-4 w-4 inline mr-1" /> Lang:
              </span>
              <div className="relative flex bg-muted rounded-full p-1 h-9 w-[108px]">
                {/* Sliding Pill */}
                <div
                className={`absolute top-1 left-1 w-8 h-7 bg-background rounded-full shadow-sm transition-transform duration-300 ease-in-out ${getPillPosition()}`} />


                {/* Language Buttons */}
                <button
                onClick={() => handleLangChange('uz')}
                className={`relative z-10 w-8 h-7 text-xs font-medium transition-colors rounded-full ${lang === 'uz' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>

                  UZ
                </button>
                <button
                onClick={() => handleLangChange('en')}
                className={`relative z-10 w-8 h-7 text-xs font-medium transition-colors rounded-full ${lang === 'en' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>

                  EN
                </button>
                <button
                onClick={() => handleLangChange('ru')}
                className={`relative z-10 w-8 h-7 text-xs font-medium transition-colors rounded-full ${lang === 'ru' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>

                  RU
                </button>
              </div>
            </div>

            {isAdmin &&
          <>
                <Link
              to="/admin/dashboard"
              className="p-2 rounded-md hover:bg-muted text-primary font-semibold"
              onClick={closeMenu}>

                  {t.nav.adminDashboard}
                </Link>
                <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => {
                logout();
                closeMenu();
              }}>

                  {t.nav.logout}
                </Button>
              </>
          }
          </nav>
        </div>
      }
    </header>);

}