import ProductClient from "./ProductClient";
import RandomCollection from "../../../components/RandomCollection";
import { notFound } from "next/navigation";

// Dynamic SEO metadata based on product
export async function generateMetadata({ params }) {
  const { productId } = await params;
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/list`);
    const data = await res.json();
    if (data.success) {
      const product = data.products.find(p => p._id === productId);
      if (product) {
        return {
          title: `${product.name} | GlamSide`,
          description: product.description || `Buy ${product.name} at GlamSide.`,
        };
      }
    }
  } catch (error) {
    console.error("Failed to fetch product for metadata:", error);
  }
  
  return {
    title: "Product | GlamSide",
  };
}

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/list`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    if (data.success) {
      return data.products;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function ProductPage({ params }) {
  const { productId } = await params;
  const products = await getProducts();
  
  const productData = products.find((p) => p._id === productId);

  if (!productData) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <ProductClient productData={productData} />
      {/* ---------- Display Related Products ---------- */}
      <RandomCollection products={products} />
    </div>
  );
}
