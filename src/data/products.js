// src/data/products.js

const products = [
  // ===== SKINCARE =====
  {
    name: "Vitamin C Serum",
    description: "Brightens and evens skin tone",
    price: 15000,
    image: "/uploads/products/vitc.jpg",
    category: "Skincare",
    brand: "Jumiso",
    countInStock: 20,
    skinTypes: ["Normal", "Dry"],
    isFeatured: true,
    isHotDeal: true,
  },
  {
    name: "Shea Butter Lotion",
    description: "Deep moisturizing body lotion",
    price: 12000,
    image: "/uploads/products/shea.jpg",
    category: "Body",
    brand: "Palmers",
    countInStock: 15,
    skinTypes: ["Dry", "Sensitive"],
    isFeatured: true,
    isHotDeal: true,
  },

  // ===== SUPPLEMENTS =====
  {
    name: "Multivitamins",
    description: "Daily essential vitamins for overall wellness",
    price: 8500,
    image: "/uploads/products/multivitamins.jpg",
    category: "Supplements",
    brand: "HealthPlus",
    countInStock: 30,
    skinTypes: [],
    isFeatured: true,
    isHotDeal: true,
  },
  {
    name: "Probiotics",
    description: "Supports gut health and immunity",
    price: 12000,
    image: "/uploads/products/probiotics.jpg",
    category: "Supplements",
    brand: "WellnessLab",
    countInStock: 25,
    skinTypes: [],
    isFeatured: true,
    isHotDeal: true,
  },
  {
    name: "Herbal / Adaptogen Supplements",
    description: "Stress support and energy balance",
    price: 15000,
    image: "/uploads/products/herbal.jpg",
    category: "Supplements",
    brand: "NatureCare",
    countInStock: 18,
    skinTypes: [],
    isFeatured: true,
    isHotDeal: true,
  },
];

export default products;
