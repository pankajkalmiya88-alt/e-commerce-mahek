"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { EmptyCart } from "@/components/empty-states/EmptyCart";
import { isAuthenticated } from "@/lib/auth-utils";
import { cartService } from "@/features/cart/services/cart.service";
import { CartItem } from "@/features/cart/components/CartItem";
import { useCartWishlist } from "@/contexts/CartWishlistContext";
import type { UICartItem } from "@/features/cart/adapters/cart.adapter";
import { enrichCartItemsWithImages } from "@/features/cart/adapters/cart.adapter";
import { ROUTES } from "@/constants/routes";
import { toast } from "@/lib/toast";

export default function CartPage() {
  const router = useRouter();
  const { refreshCounts } = useCartWishlist();
  const [isAuth, setIsAuth] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [cartItems, setCartItems] = useState<UICartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsAuth(authenticated);
      setIsChecking(false);
      
      if (authenticated) {
        fetchCartItems();
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await cartService.getCartList();
      const enrichedItems = await enrichCartItemsWithImages(response.items || []);
      setCartItems(enrichedItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
      toast.error("Failed to load cart items");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (variantId: string, size: string, quantity: number) => {
    try {
      const item = cartItems.find(i => i.variantId === variantId && i.size === size);
      if (!item) return;

      await cartService.updateCart({
        productId: item.product._id,
        variantId,
        size,
        quantity,
      });
      
      toast.success("Cart updated successfully");
      await fetchCartItems();
      await refreshCounts();
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart");
    }
  };

  const handleRemoveItem = async (variantId: string, size: string) => {
    try {
      const item = cartItems.find(i => i.variantId === variantId && i.size === size);
      if (!item) return;

      await cartService.removeFromCart({
        productId: item.product._id,
        variantId,
        size,
      });
      
      toast.success("Item removed from cart");
      await fetchCartItems();
      await refreshCounts();
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    }
  };

  const handleClearCart = async () => {
    if (!confirm("Are you sure you want to clear your cart?")) return;
    
    try {
      await cartService.clearCart();
      toast.success("Cart cleared successfully");
      await fetchCartItems();
      await refreshCounts();
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = calculateTotal();

  if (isChecking || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (!isAuth) {
    return <EmptyCart isAuthenticated={false} />;
  }

  if (cartItems.length === 0) {
    return <EmptyCart isAuthenticated={true} />;
  }

  return (
    <div className="min-h-screen bg-background-light py-8">
      <div className="container-fluid max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-playfair font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 font-poppins mt-2">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={`${item.variantId}-${item.size}`}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))}

            {/* Clear Cart Button */}
            <button
              onClick={handleClearCart}
              className="text-sm text-red-600 hover:text-red-700 font-poppins font-medium"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-playfair font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-poppins">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                  <span className="font-semibold">₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-poppins">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between font-poppins">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold text-primary">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push(ROUTES.CHECKOUT)}
                className="w-full bg-primary text-white py-3 rounded-md font-poppins font-semibold hover:bg-primary/90 transition-colors"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => router.push(ROUTES.HOME)}
                className="w-full mt-3 border border-gray-300 text-gray-700 py-3 rounded-md font-poppins font-semibold hover:bg-gray-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
