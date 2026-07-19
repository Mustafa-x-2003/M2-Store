import { React } from "react";
import { updateQuantity, deleteitem, removeCoupon } from "../../services/cartApi";
import CartItem from "./CartItem";
import toast from "react-hot-toast";

const CartItems = ({ cart, getCartItems }) => {
  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      await updateQuantity(productId, quantity);

      await getCartItems();

      window.dispatchEvent(
        new Event("navbar-counts-update")
      );
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update quantity");
    }
  };

  const deleteproduct = async (productId) => {
    try {
      const response = await deleteitem(productId);

      if (response.data.itemCount === 0) {
        await removeCoupon();
      }

      // await getCartItems();

      window.dispatchEvent(
        new Event("navbar-counts-update")
      );

      toast.success("Removed from cart");
      await getCartItems();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="border-1 border-[var(--border)] p-4 w-full h-fit bg-[var(--card)] rounded-2xl">
      {cart.items.map((item) => (
        <CartItem
          key={item._id}
          name={item.name}
          price={item.price}
          image={item.image}
          quantity={item.quantity}
          productId={item.product}
          handleUpdateQuantity={handleUpdateQuantity}
          deleteproduct={deleteproduct}
        />
      ))}
    </div>
  );
};

export default CartItems;