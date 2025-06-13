import React, { createContext, useReducer } from 'react';

export const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':
            return state.some(item => item.id === action.payload.id)
                ? state
                : [...state, action.payload];
        case 'REMOVE_FROM_WISHLIST':
            return state.filter(item => item.id !== action.payload.id);
        case 'CLEAR_WISHLIST':
            return [];
        default:
            return state;
    }
};

export const WishlistProvider = ({ children }) => {
    const [wishlist, dispatch] = useReducer(wishlistReducer, []); // Initial state is an empty array

    return (
        <WishlistContext.Provider value={{ wishlist, dispatch }}>
            {children}
        </WishlistContext.Provider>
    );
};