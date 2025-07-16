import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import SearchBar from "@/components/search-bar";
import CategoryNav from "@/components/category-nav";
import FoodCard from "@/components/food-card";
import CartModal from "@/components/cart-modal";
import CheckoutModal from "@/components/checkout-modal";
import BottomNav from "@/components/bottom-nav";
import { FoodItem } from "@shared/schema";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("food");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: foodItems = [], isLoading } = useQuery<FoodItem[]>({
    queryKey: ["/api/food-items"],
  });

  const filteredItems = foodItems.filter(item => {
    const matchesCategory = activeCategory === "others" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const premiumItems = filteredItems.filter(item => 
    ["Strawberry Bliss Pancakes", "Classic Grilled Ribeye"].includes(item.name)
  );

  const featuredItems = filteredItems.filter(item => 
    ["Garlic Butter Roast Chicken", "Healthy Premium Steak"].includes(item.name)
  );

  const otherItems = filteredItems.filter(item => 
    !["Strawberry Bliss Pancakes", "Classic Grilled Ribeye", "Garlic Butter Roast Chicken", "Healthy Premium Steak"].includes(item.name)
  );

  const bannerSlides = [
    {
      id: 1,
      title: "10 ไม้ ฟรี 1",
      subtitle: "โปรโมชั่นพิเศษ",
      image: "https://images.unsplash.com/photo-1559847844-5315695dadae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      alt: "Thai food spread with various dishes"
    },
    {
      id: 2,
      title: "ลด 50%",
      subtitle: "เมนูพิเศษวันนี้",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      alt: "Delicious food plate"
    },
    {
      id: 3,
      title: "ฟรีเครื่องดื่ม",
      subtitle: "เมื่อสั่งเมนูเซท",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      alt: "Food with drinks"
    },
    {
      id: 4,
      title: "ส่งฟรี",
      subtitle: "เมื่อสั่ง 500 บาทขึ้นไป",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300",
      alt: "Food delivery"
    }
  ];



  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bannerSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-thai-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-md mx-auto pb-20">
        {/* Promotional Banner Slider */}
        <section className="px-4 py-4">
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <div className="relative h-48">
              {bannerSlides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                    index === currentSlide ? 'translate-x-0' : 
                    index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                  }`}
                >
                  <img 
                    src={slide.image} 
                    alt={slide.alt} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                      <p className="text-xl font-semibold">{slide.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full p-2 transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 rounded-full p-2 transition-all"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {bannerSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        
        <CategoryNav 
          activeCategory={activeCategory} 
          onCategoryChange={setActiveCategory} 
        />

        {/* Premium Food Section */}
        {premiumItems.length > 0 && (
          <section className="px-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Premium Food</h3>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {premiumItems.map(item => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* Featured Section */}
        {featuredItems.length > 0 && (
          <section className="px-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Featured</h3>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {featuredItems.map(item => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {/* Other Items */}
        {otherItems.length > 0 && (
          <section className="px-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              {otherItems.map(item => (
                <FoodCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        )}

        {filteredItems.length === 0 && (
          <div className="px-4 py-12 text-center">
            <p className="text-gray-500">No items found matching your search.</p>
          </div>
        )}
      </main>

      <BottomNav onCartClick={() => setIsCartOpen(true)} />
      
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />
      
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-md mx-auto px-4 text-center">
          <p className="text-sm">Made by <span className="text-blue-400 font-semibold">ashura</span></p>
        </div>
      </footer>
    </div>
  );
}
