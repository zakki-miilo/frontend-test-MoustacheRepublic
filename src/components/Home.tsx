import { useState } from "react";

// Define the structure for a cart item
type CartProp = {
  item: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
};

// Define the structure for a T-shirt item
type Tprop = {
  shirt: string;
  image: string;
  price: number;
  sizes: string[];
};

// Home component that displays T-shirts and adds items to the cart
export default function Home({
  addToCart,
}: {
  addToCart: (item: CartProp) => void;
}) {
  // Sample data for T-shirts
  const tshirtPrices: Tprop[] = [
    {
      shirt: "Classic Tee",
      image: "whiteshirt.png",
      price: 75,
      sizes: ["L", "M", "S"],
    },
  ];

  // State to track the selected size
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <>
      {tshirtPrices.map((tshirt, index) => (
        <div key={index} className="row container">
          {/*Main image for page */}
          <div className="col-md-7 d-flex align-items-center justify-content-center mt-3">
            <img src={tshirt.image} alt={tshirt.shirt} width={400} />
          </div>
          {/*Details and Add to Cart*/}
          <div className="col-md-5 container mt-3">
            <h3>{tshirt.shirt}</h3>
            <hr />
            <b>{tshirt.price}</b>
            <hr />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              ipsam quod optio voluptates nemo nisi doloribus explicabo,
              distinctio recusandae, error in dicta alias dolorem consectetur
              expedita quibusdam, doloremque asperiores animi!
            </p>
            <b className="text-secondary">
              Sizes <span style={{ color: "#C90000" }}>*</span>
            </b>
            {/* Sizes selection */}
            <div className="d-flex gap-2 mt-2 mb-4">
              {tshirt.sizes.map((size, idx) => (
                <button
                  key={idx}
                  className={`p-0.5 text-center ${
                    selectedSize === size ? "btn-primary" : ""
                  }`}
                  style={{
                    backgroundColor:
                      selectedSize === size ? "#0d6efd" : "transparent",
                    color: selectedSize === size ? "white" : "black",
                    width: "40px",
                    height: "40px",
                    border: "1px solid #CCCCCC",
                  }}
                  // Select the size when button is clicked
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {/* Add to Cart button */}
            <button
              className="border border-3 border-black p-2"
              style={{ backgroundColor: "transparent" }}
              onClick={() =>
                selectedSize &&
                addToCart({
                  item: tshirt.shirt,
                  image: tshirt.image,
                  price: tshirt.price,
                  size: selectedSize,
                  quantity: 1,
                })
              }
            >
              ADD TO CART
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
