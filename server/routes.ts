import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertOrderSchema } from "@shared/schema";
import nodemailer from "nodemailer";
import { google } from "googleapis";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all food items
  app.get("/api/food-items", async (req, res) => {
    try {
      const items = await storage.getAllFoodItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch food items" });
    }
  });

  // Get food items by category
  app.get("/api/food-items/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const items = await storage.getFoodItemsByCategory(category);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch food items by category" });
    }
  });

  // Create new order
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);

      // Send email notification
      await sendOrderNotification(order);

      // Log to Google Sheets
      await logOrderToGoogleSheets(order);

      // Log to console for debugging
      console.log('Order created successfully:', {
        id: order.id,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        total: order.total,
        items: JSON.parse(order.items).length + ' items',
        specialInstructions: order.specialInstructions
      });

      res.status(201).json(order);
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(400).json({ error: "Failed to create order" });
    }
  });

  // Get all orders
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { id, password } = req.body;
      
      if (id === "kenginol" && password === "250436") {
        res.json({ success: true, message: "Login successful" });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ error: "Login failed" });
    }
  });

  // Get daily sales summary
  app.get("/api/admin/daily-sales", async (req, res) => {
    try {
      const { date } = req.query;
      const orders = await storage.getOrdersByDate(date as string);
      
      const summary = {
        date: date,
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, order) => sum + parseFloat(order.total), 0),
        orders: orders
      };
      
      res.json(summary);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch daily sales" });
    }
  });

  // Get orders with pagination and date filter
  app.get("/api/admin/orders", async (req, res) => {
    try {
      const { page = 1, limit = 10, date } = req.query;
      const orders = await storage.getOrdersPaginated(
        parseInt(page as string), 
        parseInt(limit as string),
        date as string
      );
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

async function sendOrderNotification(order: any) {
  try {
    console.log('Email notification disabled - no email address in order');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

async function logOrderToGoogleSheets(order: any) {
  try {
    // Simple logging system - save to file temporarily
    const fs = await import('fs');
    const path = await import('path');

    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    const logFile = path.join(logDir, 'orders.txt');

    // Format items for display
    const itemsString = JSON.parse(order.items).map((item: any) => `${item.name} (${item.quantity})`).join(', ');

    const logEntry = `
=== ORDER #${order.id} ===
Date: ${new Date(order.createdAt).toLocaleString('th-TH')}
Customer: ${order.customerName}
Phone: ${order.customerPhone}
Total: $${order.total}
Items: ${itemsString}
Special Instructions: ${order.specialInstructions || 'None'}
Status: ${order.status}
----------------------------------------
`;

    fs.appendFileSync(logFile, logEntry);
    console.log('Order logged to file successfully');

    // Also try Google Sheets if credentials are available
    if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID) {
      await logToGoogleSheets(order);
    }

  } catch (error) {
    console.error('Error logging order:', error);
  }
}

async function logToGoogleSheets(order: any) {
  try {
    // Check if all required environment variables are present
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      console.log('Missing Google Sheets credentials in environment variables. Please set GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID in Secrets.');
      return;
    }

    // Fix private key formatting
    let privateKey = process.env.GOOGLE_PRIVATE_KEY;

    if (privateKey.includes('\\n')) {
      privateKey = privateKey.replace(/\\n/g, '\n');
    }
    privateKey = privateKey.replace(/^"/, '').replace(/"$/, '');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Format items for display
    const itemsString = JSON.parse(order.items).map((item: any) => `${item.name} (${item.quantity})`).join(', ');

    const values = [
      [
        order.id,
        order.customerName,
        order.customerPhone,
        order.total,
        itemsString,
        order.specialInstructions || '',
        new Date(order.createdAt).toLocaleString('th-TH'),
        order.status
      ]
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Orders!A:H',
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    console.log('Order logged to Google Sheets successfully');
  } catch (error) {
    console.error('Error logging to Google Sheets:', error);
    console.log('Order will be saved to local file instead');
  }
}