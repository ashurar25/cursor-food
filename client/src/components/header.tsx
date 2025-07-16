import logoImage from "@assets/HLogo.png";
import { useLocation } from "wouter";

export default function Header() {
  const [, setLocation] = useLocation();
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  });

  return (
    <header className="bg-orange-200 shadow-sm sticky top-0 z-100">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">{timeString}</div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-0 border-pink-border
          ">
                <img 
                  src={logoImage} 
                  alt="โลโก้ร้านซ้อมคอ" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              
              
            </div>
            <div className="text-xl font-bold text-orange-500">ซ้อมคอเมนู</div>
          </div>
          <button
            onClick={() => setLocation("/admin/login")}
            className="text-xs text-gray-500 hover:text-thai-primary transition-colors"
          >
            Admin
          </button>
          <div className="flex items-center space-x-1 text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-4 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-4 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-4 h-1 bg-gray-400 rounded-full"></div>
            </div>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 112 0 1 1 0 01-2 0z" clipRule="evenodd"/>
            </svg>
            <div className="w-6 h-3 border border-gray-400 rounded-sm">
              <div className="w-4 h-full bg-gray-400 rounded-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
