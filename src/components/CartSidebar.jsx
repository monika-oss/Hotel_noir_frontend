import React, { useState } from 'react';
import { FiX, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import useCartStore from '../store/useCartStore';
import axios from '../api/axios';
import { validateEmail } from '../utils/validators';

const CartSidebar = () => {
  const { cart, isOpen, toggleCart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCartStore();
  const [formData, setFormData] = useState({ customerName: '', email: '', phone: '', tableNumber: '' });
  const [loading, setLoading] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);

  const total = getCartTotal();

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) return toast.error('Invalid email');
    
    setLoading(true);
    try {
      const orderData = {
        ...formData,
        totalAmount: total,
        items: cart.map(i => ({ menuItemId: i._id, title: i.title, price: i.price, quantity: i.quantity }))
      };
      await axios.post('/orders', orderData);
      toast.success('Order placed successfully!');
      clearCart();
      setIsCheckout(false);
      setFormData({ customerName: '', email: '', phone: '', tableNumber: '' });
    } catch (err) {
      toast.error('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/70 z-50 backdrop-blur-sm" 
            onClick={toggleCart}
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-card shadow-2xl z-50 border-l border-border-gold flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-border-gold flex justify-between items-center bg-primary">
              <h2 className="text-2xl font-heading font-bold text-accent-gold flex items-center">
                <FiShoppingBag className="mr-2" /> Your Order
              </h2>
              <button onClick={toggleCart} className="text-text-muted hover:text-white text-2xl transition-colors"><FiX /></button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {cart.length === 0 ? (
                <div className="text-center text-text-muted mt-20">Your order is empty.</div>
              ) : (
                !isCheckout ? (
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {cart.map(item => (
                        <motion.div 
                          key={item._id}
                          layout
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                          className="flex justify-between items-center bg-secondary p-3 rounded border border-border-gold/50"
                        >
                          <div className="flex-1">
                            <h4 className="font-bold text-white text-sm">{item.title}</h4>
                            <p className="text-accent-gold font-bold text-xs">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <div className="flex items-center space-x-3 bg-primary rounded px-2 py-1">
                            <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="text-text-muted hover:text-white"><FiMinus /></button>
                            <span className="text-sm font-bold text-white w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="text-text-muted hover:text-white"><FiPlus /></button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <form id="checkout-form" onSubmit={handleOrder} className="space-y-4">
                    <input required type="text" placeholder="Full Name" className="w-full bg-secondary border border-border-gold rounded p-3 text-white focus:outline-none focus:border-accent-gold" onChange={(e) => setFormData({...formData, customerName: e.target.value})} />
                    <input required type="email" placeholder="Email Address" className="w-full bg-secondary border border-border-gold rounded p-3 text-white focus:outline-none focus:border-accent-gold" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    <input required type="text" placeholder="Phone Number" className="w-full bg-secondary border border-border-gold rounded p-3 text-white focus:outline-none focus:border-accent-gold" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                    <input required type="text" placeholder="Table Number or Address" className="w-full bg-secondary border border-border-gold rounded p-3 text-white focus:outline-none focus:border-accent-gold" onChange={(e) => setFormData({...formData, tableNumber: e.target.value})} />
                  </form>
                )
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-border-gold bg-primary">
                <div className="flex justify-between mb-4 font-bold text-white">
                  <span>Total</span>
                  <span className="text-accent-gold">${(total).toFixed(2)}</span>
                </div>
                {!isCheckout ? (
                  <button onClick={() => setIsCheckout(true)} className="w-full btn-gold py-3 text-center block">Proceed to Checkout</button>
                ) : (
                  <div className="flex space-x-2">
                    <button onClick={() => setIsCheckout(false)} className="w-1/3 btn-outline py-3">Back</button>
                    <button type="submit" form="checkout-form" disabled={loading} className="w-2/3 btn-gold py-3">{loading ? 'Processing...' : 'Place Order'}</button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
