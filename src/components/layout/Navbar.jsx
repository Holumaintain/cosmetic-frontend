// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showCart, setShowCart] = useState(false);

  const { cart, total, count } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // ================= SCROLL EFFECT =================
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ================= AUTO-CLOSE MINI CART ON ROUTE CHANGE =================
  useEffect(() => {
    setShowCart(false);
    setIsOpen(false);
  }, [location.pathname]);

  // ================= SEARCH HANDLER =================
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    setSearchTerm("");
    setIsOpen(false);
  };

  // ==================== Mega Menu ====================
  const megaMenu = [
    {
      title: "Brands",
      items: [
        "Jumiso","Palmers","Bio Oil","Medix","Ambi","COSRX","Simple",
        "MISSHA","Cerave","TIAM","Dr Teals","AXIS-Y","ZAPZT","Cantu","ORS",
        "Mielle","Revox","VIEW ALL BRANDS"
      ],
    },
    {
      title: "Face",
      items: [
        "Chemical Exfoliator, Peels and Scrubs","Cleansers/Washes","Double Cleansing",
        "Eye Care","Facial and Sheet Masks","Facial wipes","Korean Beauty","Lip Care",
        "Makeup Removers","Moisturizers and Emulsion","Oils, Serums and Ampoules",
        "Spot Treatments","Sun Screen","Toners, Mists and Essences",
        "Acne, Pimples and Blackheads","Anti-Aging","Dark Spots and hyperpigmentation",
        "Dry Skin / Hydration","Eczema/ Fungal","Normal and Combination skin",
        "Oily Skin","Pores/Oil control","Sensitive Skin","Skin Brightening",
        "Teen care","Ingredients","AHA/BHA","Benzoyl Peroxide","Collagen",
        "Glycolic Acid","Hyaluronic Acid","Lactic Acid","Niacinamide","Retinol",
        "Salicylic Acid","Vitamin C","Sun Protection","Spray","Sunscreen","SunStick",
        "Eye Care","Serums and creams","Lip Care","Masks and Balms"
      ],
    },
    {
      title: "Bath & Body",
      items: [
        "Acne treatment","Bath Soaks and Bubble bath","Beauty Supplements","Body oils",
        "Body wash","Deodorants and Sprays","Essentials Oils","Feet care",
        "Hair Removal","Hand care","Moisturizers and lotion","Oral care",
        "Scrubs and Exfoliatants","Tools & Accessories","Acne, Pimples and Blackheads",
        "Sensitive Skin","Anti-Aging","Normal and Combination skin",
        "Dark Spots & hyperpigmentation","Dry Skin / Hydration","Dull skin",
        "Oily Skin","Hand Care","Hand cream and masks","Feet Care",
        "Foot cream and exfoliatants","Oral Care","Tooth brushes and toothpastes"
      ],
    },
    {
      title: "Hair",
      items: [
        "Baby's Hair","Conditioners","Edge Control, Gels and Glues","Hair Cream",
        "Hair Dyes and Colours","Hair Mousse and sprays","Hair Oils","Hair treatment",
        "Masks","Shampoo","Wig Care","Damaged hair","Dandruff/Fungal","Dryness",
        "Hair Growth","Scalp care","Wig Care","Hair Serums","Sprays",
        "Ingredients: Argan, Biotin, Castor Oil, Coconut Oil, Salicylic Acid, Sheabutter, Tea Tree"
      ],
    },
    {
      title: "Makeup",
      items: [
        "Foundation","Concealers","Primers","Powder","Setting spray","Blush and Highlighter",
        "Lips","Lip Balm","Lip Gloss","Lip Pencil","Lip Stick","Eyes","Eye Shadow"
      ],
    },
    {
      title: "For Him",
      items: [
        "After Shaves","Beard Oils, Conditioners and Balms","Body and Face Wash",
        "Hair and Beard Dyes","Moisturizers and creams","Shaving Gels"
      ],
    },
    {
      title: "For Baby",
      items: [
        "Lotion and Creams","Baby Wash and Bubble Bath","Cotton Pads and Buds","Hair Care"
      ],
    },
    {
      title: "Deals",
      items: ["Under 5k","Best Sellers","On Sale","Back In Stock","Gift Cards"],
    },
  ];

  const splitIntoColumns = (items, numCols = 3) => {
    const cols = Array.from({ length: numCols }, () => []);
    items.forEach((item, i) => cols[i % numCols].push(item));
    return cols;
  };

  return (
    <>
      <div className="announcement-bar">
        Hello Lagos. Enjoy Free shipping on orders over N50,000 (*excluding Zone 4 to 6)
      </div>

      <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <Link to="/" className="logo">🧴 HOT COSMETICS</Link>

          <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <div className={`nav-links ${isOpen ? "open" : ""}`}>
            <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>Home</Link>
            <Link to="/products" className={`nav-link ${location.pathname.startsWith("/products") ? "active" : ""}`}>Products</Link>
            <Link to="/categories" className={`nav-link ${location.pathname === "/categories" ? "active" : ""}`}>Categories</Link>
            <Link to="/offers" className={`nav-link ${location.pathname === "/offers" ? "active" : ""}`}>Offers</Link>
            <Link to="/cartpage" className={`nav-link ${location.pathname === "/cartpage" ? "active" : ""}`}>Cart</Link>
            <Link to="/contact" className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}>Contact</Link>
            <Link to="/checkout" className={`nav-link ${location.pathname === "/checkout" ? "active" : ""}`}>Checkout</Link>
            <Link to="/signin" className={`nav-link ${location.pathname === "/signin" ? "active" : ""}`}>Sign In</Link>
            <Link to="/signup" className={`nav-link ${location.pathname === "/signup" ? "active" : ""}`}>Sign Up</Link>

            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">🔍</button>
            </form>

            {/* ================= Mini Cart ================= */}
            <div className="cart-container">
              <button className="btn btn-cart" onClick={() => setShowCart(!showCart)}>
                🛒 {count > 0 && <span className="cart-count">{count}</span>}
              </button>

              {showCart && (
                <div className="mini-cart">
                  {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                  ) : (
                    <>
                      {cart.map(item => (
                        <div
                          key={item._id || item.name}
                          className="mini-cart-item"
                        >
                          <img src={item.cartImage} alt={item.name} width="40" />
                          <div>
                            <p>{item.name}</p>
                            <small>Qty: {item.qty}</small>
                          </div>
                        </div>
                      ))}
                      <p className="mini-total">
                        Total: ₦{total.toLocaleString()}
                      </p>
                      <Link to="/cartpage" onClick={() => setShowCart(false)}>
                        View Cart
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================= Mega Menu ================= */}
        <div className="mega-menu-container">
          {megaMenu.map(menu => (
            <div
              key={menu.title}
              className="mega-dropdown"
              onMouseEnter={() => setActiveDropdown(menu.title)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <span className="mega-title">{menu.title}</span>
              <div className={`mega-columns ${activeDropdown === menu.title ? "open" : ""}`}>
                {splitIntoColumns(menu.items).map((col, idx) => (
                  <div className="mega-column" key={idx}>
                    {col.map((item, i) => (
                      <Link
                        key={i}
                        to={`/products?category=${encodeURIComponent(item)}`}
                        className="dropdown-item"
                        onClick={() => setIsOpen(false)}
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </header>
    </>
  );
}
