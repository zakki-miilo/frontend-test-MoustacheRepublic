import { useState } from "react";

// Define the structure for a cart item
type CartProp = {
  item: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
};

export default function Navbar({ cart }: { cart: CartProp[] }) {
  // State to manage the dropdown's open/closed state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    // Bootstrap navbar
    <nav className="navbar mb-3 mt-3" style={{ backgroundColor: "#F6F6F7" }}>
      <div className="container d-flex justify-content-end">
        <div className="dropdown position-relative">
          {/* Button to toggle the dropdown */}
          <button
            className="btn btn-secondary dropdown-toggle mb-2 text-dark-emphasis"
            type="button"
            id="dropdownMenuButton"
            aria-expanded={isDropdownOpen}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            My Cart ({cart.length})
          </button>

          {/* Dropdown menu */}
          <ul
            className={`dropdown-menu dropdown-menu-end${
              isDropdownOpen ? " show" : ""
            }`}
            aria-labelledby="dropdownMenuButton"
            style={{ right: "10px", width: "300px" }}
          >
            {/* Check if the cart is empty */}
            {cart.length === 0 ? (
              <li className="dropdown-item">No items in your cart</li>
            ) : (
              // Map through cart items and display each item
              cart.map((item, index) => (
                <li
                  key={index}
                  className="dropdown-item d-flex align-items-center"
                >
                  {/* Display item image */}
                  <img
                    src={item.image}
                    alt={item.item}
                    width={80}
                    height={100}
                    className="me-2"
                  />
                  {/* Display item details */}
                  {item.quantity}x {item.item} <br />$
                  {item.price * item.quantity} <br />
                  Size: {item.size}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
