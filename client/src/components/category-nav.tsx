interface CategoryNavProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryNav({ activeCategory, onCategoryChange }: CategoryNavProps) {
  const categories = [
    { id: "food", label: "Food", icon: "fas fa-utensils" },
    { id: "beverage", label: "Beverage", icon: "fas fa-coffee" },
    { id: "offers", label: "Offers", icon: "fas fa-percent" },
    { id: "others", label: "Others", icon: "fas fa-th-large" }
  ];

  return (
    <section className="px-4 mb-6">
      <div className="grid grid-cols-4 gap-4">
        {categories.map(category => (
          <button 
            key={category.id}
            className={`category-btn ${activeCategory === category.id ? 'active' : ''} text-center`}
            onClick={() => onCategoryChange(category.id)}
          >
            <div className="category-icon w-16 h-16 rounded-2xl bg-gradient-to-br from-thai-secondary to-blue-400 flex items-center justify-center mx-auto mb-2 shadow-lg transition-transform hover:scale-105 cursor-pointer">
              {category.id === 'food' && (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              )}
              {category.id === 'beverage' && (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 6a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm4.707 2.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L8 9.586 6.707 8.293z" clipRule="evenodd"/>
                </svg>
              )}
              {category.id === 'offers' && (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              )}
              {category.id === 'others' && (
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
              )}
            </div>
            <span className="category-text text-sm font-medium text-gray-700">{category.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
