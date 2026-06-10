const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const REVIEWS_FILE = path.join(DATA_DIR, 'reviews.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Seed Products
const seedProducts = [
  {
    id: "prod-1",
    name: "Daily Vitamin C Complex",
    category: "Supplements",
    description: "Formulated with wild rose hips and bioflavonoids for maximum absorption and immune system support.",
    price: 18.50,
    originalPrice: 24.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0re-iOS9fLaYr1J9UHYehRVW7pKb98hp0xMc_QRCNOlzW4SoDx8v9sHEbEc-BwEHp23HO5YAbxVwF1w_wFweYu61_ykdDQk43VvUHHc8DoL2akcv7L9DVjpOa7LplbCM80ItsfbeLhoX8yoeCbRS6gxL5YgVackEO3p0N4Ta5jXgSv4qL9XvNeVG_EYRwLVcnu4FsB2mYiTUE7AVH4a-zfeHsH3m0eufwjqGn-rXnpoRzWCarlLvwhNo34zOwyq2tWRuTG8pwzXg",
    rating: 4.6,
    reviewsCount: 124,
    fsaHsaEligible: true,
    clinicallyValidated: true,
    specifications: [
      "Serving Size: 1 Capsule",
      "Capsules per Bottle: 60",
      "Vitamin C (as Ascorbic Acid): 1000mg",
      "Gluten-Free, Vegan, Non-GMO"
    ],
    badge: "Sale -20%"
  },
  {
    id: "prod-2",
    name: "Comprehensive First Aid Kit",
    category: "First Aid",
    description: "Fully stocked first aid kit with 150 essential clinical-grade items for emergency preparedness.",
    price: 35.00,
    originalPrice: null,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGzmdDvxvqyIBtgQ9otUOOeLUMt0MYEa02ns5_5-vit3R1Ldg0CNoMXnZdzmnjlVVG_cdpZW405ieWmulJyKDampFrJapKah_rSfvNO-ZfQvkhtWK7ovFRvLTvUfaLh_tgMbPrJl7iEAxzAlQyRt1h5r-FWXKrisb37tHvcVIZ-6dG4S9nGFJK91rh1W3XO0gmJNprKc5mtNTFnBm_mOMQgok0KCauz1cwlXOE1rhi91I7vDlqni_H4C1tZJZLZLav0noFJvWY3Lw",
    rating: 4.9,
    reviewsCount: 88,
    fsaHsaEligible: true,
    clinicallyValidated: false,
    specifications: [
      "Total Pieces: 150 items",
      "Case: Durable, water-resistant EVA shell",
      "Includes: Bandages, antiseptic wipes, burn gel, CPR mask, emergency blanket"
    ],
    badge: "Essential"
  },
  {
    id: "prod-3",
    name: "Medical Grade Hand Sanitizer",
    category: "Wellness",
    description: "Antiseptic gel with 75% isopropyl alcohol, vitamin E, and aloe to sanitize hands without drying the skin.",
    price: 12.00,
    originalPrice: null,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSNfaM1FheU1XlK8xiv8jiLAubdTKsLwkcD81PgxE_MiDGCQoKLzhBDajM8KAa0KfDXpftSuxPLg9WA9X2uV4rIVjHymnHQQksNe4BPZzIgofIvqYcJkHmzfzHcptynjjWpXdI5McCQJ2Sg9wSTPJBW6-sEOurVQBDIbfrS-_H5rU0uNxXY53ZsiLbLvNROJt0fiQDfGRNNYWN3PY1caecOqLzqm4VIFxuEAY8YU5iHRqlo3mJMnypVq9kPkOkOiODf73BcWuyWB0",
    rating: 4.5,
    reviewsCount: 54,
    fsaHsaEligible: false,
    clinicallyValidated: true,
    specifications: [
      "Active Ingredient: Isopropyl Alcohol 75% v/v",
      "Volume: 500ml pump bottle",
      "Kills 99.99% of common germs"
    ],
    badge: ""
  },
  {
    id: "prod-4",
    name: "Precision Digital Thermometer",
    category: "Medical Devices",
    description: "Highly accurate digital thermometer offering oral, rectal, or underarm temperature readings in 10 seconds.",
    price: 24.50,
    originalPrice: 29.00,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3l8pkejbLrs57LNWVKQZAqv1reNwxkApUvmEtlL3th-NW8Z2NJUOINPRYdAllOKaHd6evY6FebpxgWZDOoA05e1fm7eS4vzxVNmpGVw9zZMcXTMUA9Ec104z3QVh0rZockPGqskSX3GA5E1NL1b1p42gbTTVqkwMP7cEDqLnYcdJfG76it19qiYzRl0AD3rNEVWeF0mz-OZkNuPKdJ0zWvVLm313XmylvWQrrzo8ceAD39umRqtrEyWwWRY5bVF4bKfvgz4IFeJ0",
    rating: 4.7,
    reviewsCount: 110,
    fsaHsaEligible: true,
    clinicallyValidated: true,
    specifications: [
      "Measurement Time: 10 seconds",
      "Memory: Recalls last reading",
      "Battery: CR2032 button cell (included)",
      "FDA Cleared"
    ],
    badge: "Sale -15%"
  },
  {
    id: "prod-5",
    name: "Daily Multivitamin Complex",
    category: "Supplements",
    description: "A comprehensive blend of 23 essential vitamins and minerals tailored for optimal daily cellular nutrition.",
    price: 24.99,
    originalPrice: null,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxp_Ij4symQXjFfqGvnvGu1yu4Pl6sPXFgrBOn-kuAGAYcjwyR4kuCO-8_y01keYYLNOJ0LpBEd689NStTwiZr1vYznIFXuE0zDBeD9fNx_C3n-XYI0eYvvFGld029Fjt2L28mI0xdCXXwOrwcURq0j08zqSS3L25nWALquZnE3kBscHSg5982OyxEg-c88CsWn5FMhnIuW06oykmNkEHFQka1QkvOJbqBbzLDVrhdw0eup0R38MiKqeTHhRdARhq6vnzSXyVLJlk",
    rating: 4.8,
    reviewsCount: 204,
    fsaHsaEligible: false,
    clinicallyValidated: true,
    specifications: [
      "Serving Size: 2 Tablets daily",
      "Count: 90 Tablets per bottle",
      "Includes: Vitamins A, C, D, E, K, B-Complex, Zinc, Magnesium"
    ],
    badge: "Best Seller"
  },
  {
    id: "prod-6",
    name: "Precision Pro Blood Pressure Monitor",
    category: "Medical Devices",
    description: "Clinically validated blood pressure monitor featuring irregular heartbeat detection, multi-user storage, and comfortable arm cuff.",
    price: 79.99,
    originalPrice: null,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFQqoeGWydVHqJQ08TFi6KpbxoUm1MO54S0IpkbJRrJ2-r7LGMpqAlSI9hOIFx-UKmmnwxpBNCWUhpdL04RQpSDytBOIp2RarsdOLcpaepcHBNR_9wxHqLAxVFUEX5QKn44wewbuq891Rxz-As-hjoXs-Vjpdq4TLOauTeci__AmSolVQI1Cb4NCJoyE4o4nVlmQMFY_9o-T3k4UOxteW0TQD0Ut1sYrRIJ-qxYwn-NvvDnKRkB2K_aB9mqv0gDMOQebCrMW-nyQg",
    rating: 4.8,
    reviewsCount: 342,
    fsaHsaEligible: true,
    clinicallyValidated: true,
    specifications: [
      "Accuracy: Clinically validated (AAMI standard)",
      "Irregular Heartbeat (Arrhythmia) Detection",
      "Memory: 120 readings for 2 users",
      "Display: 4.5\" Backlit LCD",
      "Power: 4 AA batteries (included)"
    ],
    badge: "Clinically Validated"
  },
  {
    id: "prod-7",
    name: "Advanced Joint Relief Gel",
    category: "Wellness",
    description: "Provides rapid cooling and warming relief for minor muscle aches, joint pains, and simple backaches.",
    price: 18.00,
    originalPrice: 21.18,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBb-rIkaKt6uGuxZaXFz1cmuNeqRzBsOHTPxMkfbVAtY2Zis-TeAFPTNOys_YPJMKr2JYxi866i_JiWShfiIg4HMbWpSKpPJHU4JQofcf2nQQ63vRkJB4yQVI43IkUEm_3VtE-QLmRLGWMK52kJrnfcWvZEtte8otNb8yEzQC1EnMr6VFLKzdRl0fYZYDa-D7Wu9G3LxDuArGeCTWXGHn0X8N5kOrty47owC5bbxOS89L0Ur7ASf9YuCzM4xPmBEmpaLBUzPormNCk",
    rating: 4.4,
    reviewsCount: 45,
    fsaHsaEligible: true,
    clinicallyValidated: false,
    specifications: [
      "Active Ingredient: Menthol 4% w/w",
      "Volume: 100g tube",
      "Non-greasy, fast-absorbing formula"
    ],
    badge: "15% OFF"
  },
  {
    id: "prod-8",
    name: "Omega-3 Fish Oil 1000mg",
    category: "Supplements",
    description: "Premium purified fish oil softgels containing 300mg active EPA and DHA to support healthy heart, brain, and joint function.",
    price: 22.50,
    originalPrice: null,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFHVrTwhGjE_1jLlvCEmDGWAVxBQagwSBrVgD7fjNFitZIytKEPFiASfcuJA2a-2DSuYEz35flZG4Jg0PvZ0Y5tSikdUVKMR1OSiTLfKJXhp2Ov4P8QZDKIV_s_cwqdhWc0rF6DzTVVHbBVFoqKUsRaJxcM1fRb1hfjWd9DrzbSQNOzByU7I-gb17Hh-Fm-p2jzGev7v1qvfYbQNC8Fc_9sxmbWKL8sjfI36k2vNagYcL7WMVDQfeyc4oQRPTxqV7_7CAIeULKx2s",
    rating: 4.7,
    reviewsCount: 92,
    fsaHsaEligible: false,
    clinicallyValidated: true,
    specifications: [
      "Serving Size: 1 Softgel daily",
      "Count: 120 Softgels per bottle",
      "Active EPA/DHA: 300mg",
      "Molecularly distilled to remove mercury"
    ],
    badge: ""
  },
  {
    id: "prod-9",
    name: "Allergy Relief Tablets (30ct)",
    category: "Prescriptions",
    description: "24-hour prescription-strength relief from indoor and outdoor allergy symptoms, including sneezing, runny nose, and itchy eyes.",
    price: 14.99,
    originalPrice: null,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCgag_2Q6dwBfAm2KuZtqgCga1DLul5IpxKeWCZDV9tww0fOrH3q9_hkpjmVYVk7qX-DJCz2H-VcRaVxjPzyikm6WFwKIPl21bt5U7e6cmvhfSghoA4Z33yyOCQekKCcIs6o1_tnMFVmC6d_xamM7pUJwwgJUlEnUP9cSr3Dyz6M2DrKme2nClOEUmx0SEkGAASKJvmwny_JcSq7HpwQG0a6HQqx1iCidLrD0iWBcIrHMFLTzHgw8pWBjLVy3sijdYC6hTeOqoLW9o",
    rating: 4.6,
    reviewsCount: 167,
    fsaHsaEligible: true,
    clinicallyValidated: true,
    specifications: [
      "Active Ingredient: Cetirizine HCl 10mg",
      "Count: 30 Tablets",
      "Relief Type: 24-hour non-drowsy"
    ],
    badge: "Best Seller"
  },
  {
    id: "prod-10",
    name: "Melatonin Sleep Support",
    category: "Wellness",
    description: "Naturally drug-free strawberry-flavored sleep support gummies containing 5mg Melatonin to help you fall asleep faster.",
    price: 18.00,
    originalPrice: null,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGGyA0OKGYDJw4Yn2lvrF-kqlYGmRFj_RYNWSI91XweyorB78HE9UduCEU0ThWDcnY7HSYYZOjbG0Hp62ismD7ybOCPpoRVAWr1XOdPRLFqi9noE8pAMfEu95fYm5CliTNr01tQOOTJmLtb43HqQZT2MFdy7iLI4Cmcx-cZw29REaz8V1Ad3FKO5z2YE43o6rBylGRZU0E1lqDmLr96FawfYmnOTkV8lHeTjZE9H178QtV73JD1nyO802alU0WPBYhHX8oulAuy3w",
    rating: 4.5,
    reviewsCount: 79,
    fsaHsaEligible: false,
    clinicallyValidated: false,
    specifications: [
      "Active Ingredient: Melatonin 5mg",
      "Count: 30 Gummies",
      "Flavor: Natural Strawberry",
      "100% Drug-Free"
    ],
    badge: ""
  }
];

// Seed Reviews (primarily for product prod-6)
const seedReviews = [
  {
    id: "rev-1",
    productId: "prod-6",
    reviewerName: "Sarah Jenkins",
    rating: 5,
    title: "Very accurate and easy to use",
    comment: "My doctor recommended I start monitoring my blood pressure at home. This unit is very similar to what they use in the clinic. The cuff is easy to put on by myself, and the large numbers are great since I don't always have my reading glasses handy. Readings have been very consistent.",
    date: "2026-04-12T10:00:00.000Z",
    verifiedBuyer: true
  },
  {
    id: "rev-2",
    productId: "prod-6",
    reviewerName: "Robert T.",
    rating: 4,
    title: "Good quality, helpful memory feature",
    comment: "Solid build quality and feels like a professional medical device. The 2-user memory function is perfect for my wife and me to both track our stats without getting them mixed up. Deducted one star because the storage case it comes with is a bit flimsy, but the machine itself is excellent.",
    date: "2026-03-28T14:30:00.000Z",
    verifiedBuyer: true
  },
  {
    id: "rev-3",
    productId: "prod-1",
    reviewerName: "David K.",
    rating: 5,
    title: "Great value for 1000mg",
    comment: "Tastes fine, easy to swallow, and has buffered properties so it doesn't upset my stomach. Def recommend.",
    date: "2026-05-15T09:12:00.000Z",
    verifiedBuyer: true
  }
];

// Initialize database file functions
function loadData(filePath, seedData) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(seedData, null, 2), 'utf8');
    return seedData;
  }
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading database file: ${filePath}. Resetting to seed data.`, err);
    fs.writeFileSync(filePath, JSON.stringify(seedData, null, 2), 'utf8');
    return seedData;
  }
}

function saveData(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

module.exports = {
  getProducts: () => loadData(PRODUCTS_FILE, seedProducts),
  saveProducts: (products) => saveData(PRODUCTS_FILE, products),
  getReviews: () => loadData(REVIEWS_FILE, seedReviews),
  saveReviews: (reviews) => saveData(REVIEWS_FILE, reviews)
};
