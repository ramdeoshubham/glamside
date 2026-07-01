import CollectionClient from "./CollectionClient";

export const metadata = {
  title: "Collection - GlamSide",
  description: "Browse our entire collection of modern fashion.",
};

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

export default async function CollectionPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen">
      <CollectionClient initialProducts={products} />
    </div>
  );
}
