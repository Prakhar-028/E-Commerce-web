const express = require('express');
const path = require('path');
const db = require('./database');

// ==========================================
// 1. CUSTOMER STOREFRONT SERVER (Port 3000)
// ==========================================
const customerApp = express();
customerApp.use(express.json());
customerApp.use(express.static(__dirname));

// Storefront API: Get products (with filters & search)
customerApp.get('/api/products', (req, res) => {
  try {
    let products = db.getProducts();
    const { search, category, minPrice, maxPrice, sort } = req.query;

    if (search) {
      const term = search.toLowerCase().trim();
      products = products.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }

    if (category) {
      const categories = category.split(',').map(c => c.toLowerCase().trim());
      if (categories.length > 0 && !categories.includes('all products')) {
        products = products.filter(p => categories.includes(p.category.toLowerCase().trim()));
      }
    }

    if (minPrice) {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) products = products.filter(p => p.price >= min);
    }
    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) products = products.filter(p => p.price <= max);
    }

    if (sort) {
      const sortVal = sort.toLowerCase();
      if (sortVal === 'price_asc') {
        products.sort((a, b) => a.price - b.price);
      } else if (sortVal === 'price_desc') {
        products.sort((a, b) => b.price - a.price);
      } else if (sortVal === 'newest') {
        products.reverse();
      }
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// Storefront API: Get individual product details
customerApp.get('/api/products/:id', (req, res) => {
  try {
    const products = db.getProducts();
    const product = products.find(p => p.id === req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve product details' });
  }
});

// Storefront API: Get reviews for a product
customerApp.get('/api/reviews/:productId', (req, res) => {
  try {
    const reviews = db.getReviews();
    const productReviews = reviews.filter(r => r.productId === req.params.productId);
    res.json(productReviews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
});

// Storefront API: Post a review
customerApp.post('/api/reviews', (req, res) => {
  try {
    const { productId, reviewerName, rating, title, comment } = req.body;
    if (!productId || !reviewerName || !rating || !title || !comment) {
      return res.status(400).json({ error: 'Missing review fields.' });
    }

    const ratingVal = parseInt(rating);
    if (isNaN(ratingVal) || ratingVal < 1 || ratingVal > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    const reviews = db.getReviews();
    const newReview = {
      id: 'rev-' + (reviews.length + 1) + '-' + Math.floor(Math.random() * 1000),
      productId,
      reviewerName,
      rating: ratingVal,
      title,
      comment,
      date: new Date().toISOString(),
      verifiedBuyer: true
    };

    reviews.push(newReview);
    db.saveReviews(reviews);

    // Recalculate average rating & reviews count
    const products = db.getProducts();
    const product = products.find(p => p.id === productId);
    if (product) {
      const productReviews = reviews.filter(r => r.productId === productId);
      const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0);
      product.reviewsCount = productReviews.length;
      product.rating = parseFloat((totalRating / productReviews.length).toFixed(1));
      db.saveProducts(products);
    }

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Fallback to customer index.html (SPA structure)
customerApp.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, 'index.html'));
});


// ==========================================
// 2. ADMIN PORTAL SERVER (Port 3001)
// ==========================================
const adminApp = express();
adminApp.use(express.json());
adminApp.use(express.static(path.join(__dirname, 'admin')));

// Admin API: List all products in inventory
adminApp.get('/api/products', (req, res) => {
  try {
    res.json(db.getProducts());
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve inventory' });
  }
});

// Admin API: Add new product
adminApp.post('/api/products', (req, res) => {
  try {
    const { name, category, description, price, originalPrice, image, fsaHsaEligible, clinicallyValidated, specifications } = req.body;
    if (!name || !category || !price) {
      return res.status(400).json({ error: 'Name, Category, and Price are required.' });
    }

    const products = db.getProducts();
    const newProduct = {
      id: 'prod-' + (products.length + 1) + '-' + Math.floor(Math.random() * 1000),
      name: String(name),
      category: String(category),
      description: String(description || ''),
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : null,
      image: String(image || 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop'),
      rating: 5.0,
      reviewsCount: 0,
      fsaHsaEligible: Boolean(fsaHsaEligible),
      clinicallyValidated: Boolean(clinicallyValidated),
      specifications: Array.isArray(specifications) ? specifications : specifications ? [specifications] : [],
      badge: originalPrice && parseFloat(originalPrice) > parseFloat(price) 
        ? `Sale -${Math.round((1 - price/originalPrice) * 100)}%` 
        : ''
    };

    products.push(newProduct);
    db.saveProducts(products);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product to inventory' });
  }
});

// Admin API: Delete product
adminApp.delete('/api/products/:id', (req, res) => {
  try {
    let products = db.getProducts();
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found in inventory' });
    }

    const deletedProduct = products.splice(index, 1)[0];
    db.saveProducts(products);

    // Remove associated reviews
    let reviews = db.getReviews();
    reviews = reviews.filter(r => r.productId !== req.params.id);
    db.saveReviews(reviews);

    res.json({ message: 'Product deleted from inventory', deletedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Fallback to admin panel homepage
adminApp.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, 'admin', 'index.html'));
});


// ==========================================
// 3. LISTEN ON BOTH PORTS
// ==========================================
customerApp.listen(3000, () => {
  console.log(`MEDICARE Storefront Server running at http://localhost:3000`);
});

adminApp.listen(3001, () => {
  console.log(`MEDICARE Admin Dashboard running at http://localhost:3001`);
});
