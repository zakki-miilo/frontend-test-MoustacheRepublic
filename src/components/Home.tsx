import { useState, useEffect } from "react";

// Define the structure for a cart item
type CartProp = {
  item: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
};

// Define the structure for a T-shirt item from the API
type Tprop = {
  id: number;
  title: string;
  description: string;
  price: number;
  imageURL: string;
  sizeOptions: { id: number; label: string }[];
};

export default function Home({
  addToCart,
}: {
  addToCart: (item: CartProp) => void;
}) {
  const [product, setProduct] = useState<Tprop | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the product information from the API
  useEffect(() => {
    fetch(
      "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching product: {error}</div>;
  }

  if (!product) {
    return <div>No product data available</div>;
  }

  return (
    <div className="row container">
      <div className="col-md-6 d-flex align-items-center justify-content-center mt-3">
        <img src={product.imageURL} alt={product.title} width={400} />
      </div>
      <div className="col-md-6 container mt-3">
        <h3>{product.title}</h3>
        <hr />
        <b>${product.price}</b>
        <hr />
        <p>{product.description}</p>
        <b className="text-secondary">
          Sizes <span className="text-danger">*</span>
        </b>
        <div className="d-flex gap-2 mt-2 mb-4">
          {product.sizeOptions.map((option) => (
            <button
              key={option.id}
              className={`border border-1 border-tertiary p-0.5 text-center ${
                selectedSize === option.label ? "btn-primary" : ""
              }`}
              style={{
                backgroundColor:
                  selectedSize === option.label ? "#0d6efd" : "transparent",
                color: selectedSize === option.label ? "white" : "black",
                width: "40px",
                height: "40px",
                border: "1px solid #CCCCCC",
              }}
              onClick={() => setSelectedSize(option.label)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="btn btn-outline-dark p-2"
          onClick={() =>
            selectedSize &&
            addToCart({
              item: product.title,
              image: product.imageURL,
              price: product.price,
              size: selectedSize,
              quantity: 1,
            })
          }
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
