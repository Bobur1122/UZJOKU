import React from 'react';
import { Category, CATEGORIES } from '../../data/newsData';
import { useLanguage } from '../../context/LanguageContext';
interface CategoryFilterProps {
  selectedCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
}
export function CategoryFilter({
  selectedCategory,
  onSelectCategory
}: CategoryFilterProps) {
  const { t, getCategoryName } = useLanguage();
  return (
    <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-hide">
      <button
        onClick={() => onSelectCategory('All')}
        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === 'All' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>

        {t.categories.all}
      </button>
      {CATEGORIES.map((category) =>
      <button
        key={category}
        onClick={() => onSelectCategory(category)}
        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category ? 'bg-primary text-primary-foreground shadow-md' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>

          {getCategoryName(category)}
        </button>
      )}
    </div>);

}