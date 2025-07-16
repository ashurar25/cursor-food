interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function SearchBar({ searchTerm, onSearchChange }: SearchBarProps) {
  return (
    <section className="px-4 mb-6">
      <div className="relative">
        <input 
          type="text" 
          placeholder="ค้นหาอาหารที่ลูกค้าต้องการได้เลยคร๊าบบบ..." 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 pr-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-thai-primary focus:border-transparent"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-500 hover:text-pink-600 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
