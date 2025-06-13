import React, { createContext, useReducer } from 'react';

export const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const { id, size } = action.payload;
            const existingItem = state.find(item =>
                item.id === id && item.size === size
            );
            if (existingItem) {
                return state.map(item =>
                    item.id === id && item.size === size
                        ? { ...item, quantity: item.quantity + action.payload.quantityToAdd }
                        : item
                );
            }
            return [...state, { ...action.payload, quantity: action.payload.quantityToAdd }];
        case 'REMOVE_FROM_CART':
            return state.filter(item =>
                !(item.id === action.payload.id && item.size === action.payload.size)
            );
        case 'UPDATE_QUANTITY':
            return state.map(item =>
                item.id === action.payload.id && item.size === action.payload.size
                    ? { ...item, quantity: Math.max(1, action.payload.quantity) } // Ensure quantity is at least 1
                    : item
            );
        case 'CLEAR_CART':
            return [];
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []); // Initial state is an empty array

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};