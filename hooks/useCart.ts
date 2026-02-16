import { useState, useCallback } from 'react';
import { Product, CartItem } from '@/types';

export function useCart() {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = useCallback((product: Product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                return prevCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    }, []);

    const removeFromCart = useCallback((id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }, []);

    const updateQuantity = useCallback((id: string, quantity: number) => {
        setCart((prevCart) => {
            if (quantity <= 0) {
                return prevCart.filter((item) => item.id !== id);
            }
            return prevCart.map((item) =>
                item.id === id ? { ...item, quantity } : item
            );
        });
    }, []);

    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
    };
}
