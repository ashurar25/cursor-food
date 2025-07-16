import { FoodItem } from "@shared/schema";
import { useCart } from "@/lib/cart-context";

interface FoodCardProps {
  item: FoodItem;
}

export default function FoodCard({ item }: FoodCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price),
      image: item.image,
      quantity: 1
    });
  };

  return (
    <div className="food-card">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-32 object-cover"
        />
        <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-xs font-medium flex items-center shadow-sm">
          <svg className="w-3 h-3 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          {item.rating}
        </div>
        <button className="absolute top-2 right-2 w-8 h-8 bg-thai-accent rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
          </svg>
        </button>
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 w-8 h-8 bg-thai-primary rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform active:scale-95"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
          </svg>
        </button>
      </div>
      <div className="p-3">
        <p className="text-xs text-gray-500 mb-1 capitalize">{item.category}</p>
        <h4 className="font-medium text-gray-800 mb-1">{item.name}</h4>
        <p className="text-lg font-bold text-gray-900">${item.price}</p>
      </div>
    </div>
  );
}
