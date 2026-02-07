import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import Zoom from "react-medium-image-zoom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "react-medium-image-zoom/dist/styles.css";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios"; // ✅ Added Axios for backend requests

// Import local product images
import missha1 from "../assets/images/products/missha-sunscreen-1.jpg";
import missha2 from "../assets/images/products/missha-sunscreen-2.jpg";
import jumiso1 from "../assets/images/products/jumiso-serum-1.jpg";
import jumiso2 from "../assets/images/products/jumiso-serum-2.jpg";
import palmers1 from "../assets/images/products/palmers-oil-1.jpg";
import palmers2 from "../assets/images/products/palmers-oil-2.jpg";
import nivea1 from "../assets/images/products/nivea-cream-1.jpg";
import nivea2 from "../assets/images/products/nivea-cream-2.jpg";

const productImages = {
  1: [missha1, missha2],
  2: [jumiso1, jumiso2],
  3: [palmers1, palmers2],
  4: [nivea1, nivea2],
};

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // ✅ Updated useEffect to fetch product directly from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct({ ...res.data, images: productImages[res.data.id] || [] });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <MainLayout title="Loading...">
        <p className="text-center py-5">Loading product...</p>
      </MainLayout>
    );

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <MainLayout title={`${product.name} | HOT-COSMETICS`}>
      <div className="container py-5 product-detail">
        <div className="row g-5 align-items-start">
          {/* Images */}
          <div className="col-lg-6">
            <div className="product-images">
              <Zoom zoomMargin={40}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="main-image zoom-trigger"
                  onClick={() => setModalOpen(true)}
                />
              </Zoom>

              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
                direction={window.innerWidth >= 992 ? "vertical" : "horizontal"}
                slidesPerView={4}
                spaceBetween={12}
                watchSlidesProgress
                className="thumb-swiper mt-3"
              >
                {product.images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={`${product.name} thumb ${idx + 1}`}
                      className="thumbnail"
                      onClick={() => {
                        const mainImg = document.querySelector(".zoom-trigger");
                        if (mainImg) mainImg.src = img;
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Info */}
          <div className="col-lg-6">
            <h2 className="lux-title">{product.name}</h2>
            <p className="text-muted">{product.brand}</p>
            <h4 className="lux-price">₦{product.price.toLocaleString()}</h4>

            {product.skinTypes?.length > 0 && (
              <div className="mb-3">
                <span className="fw-semibold">Skin Type:</span>
                <div className="d-flex gap-2 mt-2 flex-wrap">
                  {product.skinTypes.map((type) => (
                    <span key={type} className="badge lux-badge">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="lux-description">{product.description}</p>
            <button
              className="btn btn-dark btn-lg mt-3"
              onClick={() => addToCart(product)}
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-5">
            <h4 className="mb-4">You may also like</h4>
            <div className="row g-4">
              {relatedProducts.map((p) => (
                <div key={p.id} className="col-md-6 col-lg-3">
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="card product-card h-100"
                  >
                    <img
                      src={productImages[p.id][0]}
                      alt={p.name}
                      className="card-img-top"
                    />
                    <div className="card-body">
                      <h6>{p.name}</h6>
                      <p className="lux-price-sm">
                        ₦{p.price.toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Fullscreen Modal */}
        {modalOpen && (
          <div className="modal-overlay">
            <AiOutlineClose
              className="modal-close"
              size={30}
              onClick={() => setModalOpen(false)}
            />
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="modal-swiper"
            >
              {product.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="modal-image"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
