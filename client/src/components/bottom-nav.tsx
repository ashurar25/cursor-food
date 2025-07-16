import { useCart } from "@/lib/cart-context";

interface BottomNavProps {
  onCartClick: () => void;
}

export default function BottomNav({ onCartClick }: BottomNavProps) {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          <button className="flex flex-col items-center py-2 px-3 text-blue-500 hover:text-blue-600 transition-colors">
            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd"/>
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v6h-3a2 2 0 00-2 2v3H6a2 2 0 01-2-2V5zM13 17v-3a2 2 0 012-2h3v3a2 2 0 01-2 2h-3z" clipRule="evenodd"/>
            </svg>
            <span className="text-xs font-medium">Explore</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd"/>
            </svg>
            <span className="text-xs">เมนู</span>
          </button>
          <button 
            onClick={onCartClick}
            className="flex flex-col items-center py-2 px-3 text-gray-400 hover:text-gray-600 transition-colors relative"
          >
            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
            </svg>
            <span className="text-xs">ตระกร้า</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-thai-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
            </svg>
            <span className="text-xs">รายการโปรด</span>
          </button>
          <button className="flex flex-col items-center py-2 px-3 text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-5 h-5 mb-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
            </svg>
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
