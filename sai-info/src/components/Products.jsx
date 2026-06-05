import React, { useEffect, useState } from "react";
import { getApiBase } from "../utils/apiBase";

export default function Products() {
  const [products, setProducts] = useState([]);
  const API_BASE = getApiBase();

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  }, []);

  return (
    <section id="products" className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          Our Products
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {products.map(product => (
            <div
              key={product._id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >

              <img
                src={`${API_BASE}${product.images?.[0]}`}
                alt={product.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-5">

                <h3 className="text-xl font-bold mb-2">
                  {product.name}
                </h3>

                <p className="text-slate-600 mb-4">
                  {product.description}
                </p>

                <div className="mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      product.inStock
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out Of Stock"}
                  </span>
                </div>

                <p className="font-semibold text-lg mb-4">
                  ₹{product.price}
                </p>

                <div className="border-t pt-4 text-sm text-slate-600">
                  For more information contact:
                  <br />
                  <strong>83 10 33 85 44</strong>
                </div>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}