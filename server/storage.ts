import { users, foodItems, orders, type User, type InsertUser, type FoodItem, type InsertFoodItem, type Order, type InsertOrder } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllFoodItems(): Promise<FoodItem[]>;
  getFoodItemsByCategory(category: string): Promise<FoodItem[]>;
  createFoodItem(item: InsertFoodItem): Promise<FoodItem>;
  createOrder(order: InsertOrder): Promise<Order>;
  getOrders(): Promise<Order[]>;
  getOrdersByDate(date: string): Promise<Order[]>;
  getOrdersPaginated(page: number, limit: number, date?: string): Promise<{orders: Order[], total: number}>;
  getDailyOrderNumber(date: string): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private foodItems: Map<number, FoodItem>;
  private orders: Map<number, Order>;
  private currentUserId: number;
  private currentFoodItemId: number;
  private currentOrderId: number;
  private dailyOrderCounts: Map<string, number>;

  constructor() {
    this.users = new Map();
    this.foodItems = new Map();
    this.orders = new Map();
    this.dailyOrderCounts = new Map();
    this.currentUserId = 1;
    this.currentFoodItemId = 1;
    this.currentOrderId = 1;
    
    // Initialize with sample food items
    this.initializeFoodItems();
  }

  private initializeFoodItems() {
    const sampleItems: Omit<FoodItem, 'id'>[] = [
      {
        name: "Strawberry Bliss Pancakes",
        category: "food",
        price: "2.8",
        rating: "4.0",
        image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        description: "Fluffy pancakes with fresh strawberries and syrup"
      },
      {
        name: "Classic Grilled Ribeye",
        category: "food",
        price: "10.9",
        rating: "4.0",
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        description: "Perfectly grilled ribeye steak with vegetables"
      },
      {
        name: "Garlic Butter Roast Chicken",
        category: "food",
        price: "12.8",
        rating: "4.0",
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        description: "Roasted chicken with garlic butter and herbs"
      },
      {
        name: "Healthy Premium Steak",
        category: "food",
        price: "2.8",
        rating: "4.0",
        image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        description: "Healthy steak salad with mixed greens"
      },
      {
        name: "Thai Green Curry",
        category: "food",
        price: "8.5",
        rating: "4.5",
        image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        description: "Authentic Thai green curry with jasmine rice"
      },
      {
        name: "Traditional Pad Thai",
        category: "food",
        price: "7.5",
        rating: "4.2",
        image: "https://images.unsplash.com/photo-1559314809-0f31657def5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        description: "Classic Pad Thai with shrimp and vegetables"
      },
      {
        name: "Mango Sticky Rice",
        category: "food",
        price: "4.5",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1583096501546-c3b5ddcea6f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        description: "Traditional Thai dessert with fresh mango"
      },
      {
        name: "Thai Iced Tea",
        category: "beverage",
        price: "3.5",
        rating: "4.3",
        image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        description: "Refreshing Thai iced tea with milk"
      },
      {
        name: "Fresh Coconut Water",
        category: "beverage",
        price: "2.5",
        rating: "4.4",
        image: "https://images.unsplash.com/photo-1481671703460-040cb8a2d909?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        description: "Fresh coconut water straight from the coconut"
      },
      {
        name: "Mango Smoothie",
        category: "beverage",
        price: "4.0",
        rating: "4.6",
        image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        description: "Creamy mango smoothie with fresh fruit"
      },
      {
        name: "Thai Coffee",
        category: "beverage",
        price: "3.0",
        rating: "4.1",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        description: "Strong Thai coffee with condensed milk"
      }
    ];

    sampleItems.forEach(item => {
      const id = this.currentFoodItemId++;
      this.foodItems.set(id, { ...item, id });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllFoodItems(): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values());
  }

  async getFoodItemsByCategory(category: string): Promise<FoodItem[]> {
    return Array.from(this.foodItems.values()).filter(
      item => item.category === category
    );
  }

  async createFoodItem(insertItem: InsertFoodItem): Promise<FoodItem> {
    const id = this.currentFoodItemId++;
    const item: FoodItem = { ...insertItem, id };
    this.foodItems.set(id, item);
    return item;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    const dailyOrderNumber = await this.getDailyOrderNumber(today);
    
    const id = this.currentOrderId++;
    const order: Order = { 
      ...insertOrder, 
      id: dailyOrderNumber, // Use daily order number instead of global ID
      status: "pending",
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getDailyOrderNumber(date: string): Promise<number> {
    const currentCount = this.dailyOrderCounts.get(date) || 0;
    const newCount = currentCount + 1;
    this.dailyOrderCounts.set(date, newCount);
    return newCount;
  }

  async getOrdersByDate(date: string): Promise<Order[]> {
    if (!date) return Array.from(this.orders.values());
    
    const targetDate = new Date(date);
    const nextDate = new Date(targetDate);
    nextDate.setDate(nextDate.getDate() + 1);
    
    return Array.from(this.orders.values()).filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= targetDate && orderDate < nextDate;
    });
  }

  async getOrdersPaginated(page: number, limit: number, date?: string): Promise<{orders: Order[], total: number}> {
    let allOrders = date ? await this.getOrdersByDate(date) : Array.from(this.orders.values());
    
    // Sort by creation date, newest first
    allOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const orders = allOrders.slice(startIndex, endIndex);
    
    return {
      orders,
      total: allOrders.length
    };
  }
}

export const storage = new MemStorage();
