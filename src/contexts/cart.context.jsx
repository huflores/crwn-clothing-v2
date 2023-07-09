import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, productToAdd) => {

    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
            { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, productToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
}

const increaseProductQuantity = (cartItems, productToIncrease) => {
    return cartItems.map((cartItem) => cartItem.id === productToIncrease.id ?
        { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
}

const decreaseProductQuantity = (cartItems, productToDecrease) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToDecrease.id);

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== existingCartItem.id);
    }

    return cartItems.map((cartItem) => cartItem.id === productToDecrease.id ?
        { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const increaseItemQuantity = (productToIncrease) => {
        setCartItems(increaseProductQuantity(cartItems, productToIncrease));
    }

    const decreaseItemQuantity = (productToDecrease) => {
        setCartItems(decreaseProductQuantity(cartItems, productToDecrease));
    }

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, increaseItemQuantity, decreaseItemQuantity, cartItems, cartCount, cartTotal }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};