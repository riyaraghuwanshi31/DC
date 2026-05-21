const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const slugify = require("slugify");

dotenv.config({ path: path.join(__dirname, '../.env') });

const Product = require('../models/Product');

// const sampleProducts = [
//   // TVs
//   {
//     name: 'DubeyVision 55" 4K Smart TV',
//     description: 'Experience stunning 4K Ultra HD visuals with Dolby Vision HDR. Smart TV features include built-in streaming apps, voice control, and seamless connectivity.',
//     price: 35999,
//     originalPrice: 45999,
//     category: 'TVs',
//     brand: 'Dubey Creations',
//     image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=600',
//     images: [
//       'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=600',
//       'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600',
//     ],
//     specs: [
//       { key: 'Screen Size', value: '55 inches' },
//       { key: 'Resolution', value: '4K Ultra HD (3840x2160)' },
//       { key: 'Refresh Rate', value: '60Hz' },
//       { key: 'HDR', value: 'Dolby Vision, HDR10+' },
//       { key: 'OS', value: 'Android TV 11' },
//       { key: 'Connectivity', value: 'WiFi 5, Bluetooth 5.0, 3x HDMI, 2x USB' },
//     ],
//     stock: 15,
//     isFeatured: true,
//     isNew: false,
//     ratings: 4.5,
//     numReviews: 120,
//   },
//   {
//     name: 'DubeyVision 43" Full HD LED TV',
//     description: 'Crisp Full HD display with true-to-life colors. Perfect for medium-sized rooms with its ultra-slim bezel design and energy-efficient LED backlighting.',
//     price: 18999,
//     originalPrice: 23999,
//     category: 'TVs',
//     brand: 'Dubey Creations',
//     image: 'https://images.unsplash.com/photo-1571415060716-baff5f717c37?w=600',
//     specs: [
//       { key: 'Screen Size', value: '43 inches' },
//       { key: 'Resolution', value: 'Full HD (1920x1080)' },
//       { key: 'Refresh Rate', value: '60Hz' },
//       { key: 'OS', value: 'Android TV 10' },
//       { key: 'Connectivity', value: 'WiFi, Bluetooth 4.2, 2x HDMI, 1x USB' },
//     ],
//     stock: 22,
//     isFeatured: false,
//     isNew: true,
//     ratings: 4.2,
//     numReviews: 85,
//   },

//   // Earbuds
//   {
//     name: 'DubeyBuds Pro Elite ANC',
//     description: 'Premium wireless earbuds with Active Noise Cancellation, Hi-Res Audio, and 30-hour total battery life. IPX5 water resistant for workouts.',
//     price: 3499,
//     originalPrice: 4999,
//     category: 'Earbuds',
//     brand: 'Dubey Creations',
//     image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600',
//     images: [
//       'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600',
//       'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600',
//     ],
//     specs: [
//       { key: 'Driver Size', value: '10mm Dynamic' },
//       { key: 'ANC', value: 'Yes, -35dB' },
//       { key: 'Battery', value: '7hrs + 23hrs (case)' },
//       { key: 'Charging', value: 'USB-C + Wireless' },
//       { key: 'Connectivity', value: 'Bluetooth 5.3' },
//       { key: 'Water Resistance', value: 'IPX5' },
//     ],
//     stock: 50,
//     isFeatured: true,
//     isNew: true,
//     ratings: 4.7,
//     numReviews: 340,
//   },
//   {
//     name: 'DubeyBuds Air Lite',
//     description: 'Ultra-lightweight open-ear design for all-day comfort. Perfect for calls and music with crystal clear microphones and 20-hour battery.',
//     price: 1299,
//     originalPrice: 1799,
//     category: 'Earbuds',
//     brand: 'Dubey Creations',
//     image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=600',
//     specs: [
//       { key: 'Driver Size', value: '8mm' },
//       { key: 'Battery', value: '5hrs + 15hrs (case)' },
//       { key: 'Connectivity', value: 'Bluetooth 5.0' },
//       { key: 'Charging', value: 'USB-C' },
//     ],
//     stock: 75,
//     isFeatured: false,
//     isNew: false,
//     ratings: 4.1,
//     numReviews: 210,
//   },

//   // Batteries
//   {
//     name: 'DubeyPower 20000mAh Pro Bank',
//     description: 'High-capacity power bank with 65W PD fast charging. Charge your laptop, phone, and tablet simultaneously with three output ports.',
//     price: 2499,
//     originalPrice: 3299,
//     category: 'Batteries',
//     brand: 'Dubey Creations',
//     image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600',
//     specs: [
//       { key: 'Capacity', value: '20000mAh / 74Wh' },
//       { key: 'Input', value: 'USB-C 65W PD' },
//       { key: 'Output', value: 'USB-C 65W + 2x USB-A 18W' },
//       { key: 'Compatibility', value: 'Laptops, phones, tablets' },
//       { key: 'Safety', value: 'Short circuit, overcharge, overtemp' },
//     ],
//     stock: 40,
//     isFeatured: true,
//     isNew: false,
//     ratings: 4.6,
//     numReviews: 195,
//   },
//   {
//     name: 'DubeyCell Li-Ion 18650 Pack (4-cell)',
//     description: 'Premium Li-Ion 18650 rechargeable battery pack. Ideal for DIY projects, flashlights, vaping devices, and power tools.',
//     price: 899,
//     originalPrice: 1199,
//     category: 'Batteries',
//     brand: 'Dubey Creations',
//     image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600',
//     specs: [
//       { key: 'Cell Type', value: 'Li-Ion 18650' },
//       { key: 'Capacity', value: '3200mAh per cell' },
//       { key: 'Voltage', value: '3.7V nominal' },
//       { key: 'Cycle Life', value: '500+ charge cycles' },
//       { key: 'Pack Quantity', value: '4 cells' },
//     ],
//     stock: 100,
//     isFeatured: false,
//     isNew: false,
//     ratings: 4.3,
//     numReviews: 88,
//   },

//   // Laptops
//   {
//     name: 'DubeyBook Pro 15 (2024)',
//     description: 'Powerful productivity laptop with Intel Core i7, 16GB RAM, and 512GB NVMe SSD. Stunning 15.6" IPS display with 144Hz refresh for smooth visuals.',
//     price: 65999,
//     originalPrice: 79999,
//     category: 'Laptops',
//     brand: 'Dubey Creations',
//     image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600',
//     images: [
//       'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600',
//       'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600',
//     ],
//     specs: [
//       { key: 'Processor', value: 'Intel Core i7-13700H' },
//       { key: 'RAM', value: '16GB DDR5' },
//       { key: 'Storage', value: '512GB NVMe SSD' },
//       { key: 'Display', value: '15.6" IPS, 144Hz, FHD' },
//       { key: 'GPU', value: 'NVIDIA RTX 3050 4GB' },
//       { key: 'Battery', value: '72Wh, up to 10hrs' },
//       { key: 'OS', value: 'Windows 11 Home' },
//     ],
//     stock: 10,
//     isFeatured: true,
//     isNew: true,
//     ratings: 4.8,
//     numReviews: 62,
//   },
//   {
//     name: 'DubeyBook Slim 14',
//     description: 'Ultra-thin and light laptop for everyday use. Powered by AMD Ryzen 5 with long battery life. Perfect for students and professionals on the go.',
//     price: 42999,
//     originalPrice: 52999,
//     category: 'Laptops',
//     brand: 'Dubey Creations',
//     image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600',
//     specs: [
//       { key: 'Processor', value: 'AMD Ryzen 5 7530U' },
//       { key: 'RAM', value: '8GB DDR4' },
//       { key: 'Storage', value: '256GB SSD' },
//       { key: 'Display', value: '14" IPS, FHD, Anti-glare' },
//       { key: 'Battery', value: '50Wh, up to 12hrs' },
//       { key: 'Weight', value: '1.4kg' },
//     ],
//     stock: 18,
//     isFeatured: false,
//     isNew: false,
//     ratings: 4.4,
//     numReviews: 47,
//   },

//   // Smartwatches
//   {
//     name: 'DubeyWatch Ultra X',
//     description: 'Premium smartwatch with AMOLED display, GPS, heart rate monitor, SpO2, and 14-day battery life. 100+ sport modes and IP68 waterproof.',
//     price: 7499,
//     originalPrice: 9999,
//     category: 'Smartwatches',
//     brand: 'Dubey Creations',
//     image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
//     specs: [
//       { key: 'Display', value: '1.43" AMOLED, 466x466' },
//       { key: 'Battery', value: '14 days normal, 5 days heavy' },
//       { key: 'GPS', value: 'GPS + GLONASS' },
//       { key: 'Health', value: 'Heart Rate, SpO2, Stress, Sleep' },
//       { key: 'Water Resistance', value: 'IP68, 5ATM' },
//       { key: 'Sports Modes', value: '100+' },
//       { key: 'Connectivity', value: 'Bluetooth 5.2' },
//     ],
//     stock: 35,
//     isFeatured: true,
//     isNew: true,
//     ratings: 4.6,
//     numReviews: 280,
//   },
//   {
//     name: 'DubeyWatch Fit 2 Pro',
//     description: 'Slim fitness band with a large display. Track your steps, calories, sleep, and 50+ workout modes. Perfect starter smartwatch.',
//     price: 2499,
//     originalPrice: 3499,
//     category: 'Smartwatches',
//     brand: 'Dubey Creations',
//     image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=600',
//     specs: [
//       { key: 'Display', value: '1.57" TFT LCD' },
//       { key: 'Battery', value: '7 days' },
//       { key: 'Health', value: 'Heart Rate, SpO2, Sleep' },
//       { key: 'Water Resistance', value: 'IP67' },
//       { key: 'Sports Modes', value: '50+' },
//     ],
//     stock: 60,
//     isFeatured: false,
//     isNew: false,
//     ratings: 4.0,
//     numReviews: 156,
//   },

//   // Accessories
//   {
//     name: 'DubeyCharge 65W GaN Charger',
//     description: 'Compact GaN USB-C charger with 65W output. Charge your laptop, phone, or tablet at maximum speed. Folds flat for portability.',
//     price: 1499,
//     originalPrice: 1999,
//     category: 'Accessories',
//     brand: 'Dubey Creations',
//     image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600',
//     specs: [
//       { key: 'Power', value: '65W USB-C PD' },
//       { key: 'Technology', value: 'GaN III' },
//       { key: 'Input', value: '100-240V universal' },
//       { key: 'Size', value: '45 x 45 x 28mm' },
//     ],
//     stock: 80,
//     isFeatured: false,
//     isNew: true,
//     ratings: 4.5,
//     numReviews: 92,
//   },
//   {
//     name: 'DubeyCable Braided USB-C 3-Pack',
//     description: 'Military-grade braided USB-C cables supporting 100W fast charging and USB 3.2 data transfer. Available in 1m, 1.5m, and 2m lengths.',
//     price: 599,
//     originalPrice: 899,
//     category: 'Accessories',
//     brand: 'Dubey Creations',
//     image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
//     specs: [
//       { key: 'Charging', value: 'Up to 100W PD' },
//       { key: 'Data Transfer', value: 'USB 3.2 Gen1, 5Gbps' },
//       { key: 'Material', value: 'Nylon braided' },
//       { key: 'Lengths', value: '1m, 1.5m, 2m (3-pack)' },
//     ],
//     stock: 120,
//     isFeatured: false,
//     isNew: false,
//     ratings: 4.3,
//     numReviews: 174,
//   },
// ];

async function createAdmin() {
  try {
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
    // const existingAdmin = await User.findOne({ email: "Dubeycreations02@gmail.com" });

    if (existingAdmin) {
      console.log('⚠️ Admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    // const hashedPassword = await bcrypt.hash("MacDC702", 10);

    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });
    // await User.create({
    //   name: "Admin",
    //   email: "Dubeycreations02@gmail.com",
    //   password: hashedPassword,
    //   role: "admin",
    // });

    console.log('✅ Admin created');
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  }
}

async function seedDatabase() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dubey-creation';
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    const inserted = await Product.insertMany(
      sampleProducts.map((p) => ({
        ...p,
        slug: slugify(p.name, { lower: true })
      }))
    );
    console.log(`✅ Inserted ${inserted.length} products`);
    await createAdmin();

    console.log('\n📦 Sample Products:');
    inserted.forEach((p) => console.log(`  - [${p.category}] ${p.name} — ₹${p.price}`));

    await mongoose.disconnect();
    console.log('\n✅ Database seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();
