import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import { useNews } from '../../context/NewsContext';
import { useLanguage } from '../../context/LanguageContext';
export function AnnouncementBanner() {
  const { announcement } = useNews();
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(true);
  if (!announcement || !isVisible) return null;
  return (
    <div className="bg-primary text-primary-foreground px-4 py-2 relative">
      <div className="container mx-auto flex items-center justify-between">
        <p className="text-sm font-medium text-center w-full">
          <span className="font-bold mr-2 uppercase">
            {t.admin.announcement}:
          </span>
          {announcement}
        </p>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-primary-foreground/10 rounded-full transition-colors"
          aria-label="Dismiss announcement">

          <XIcon className="h-4 w-4" />
        </button>
      </div>
    </div>);

}