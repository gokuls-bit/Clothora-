import React, { createContext, useReducer } from 'react';
import { sampleProducts } from '../data/sampleProducts'; // To initialize admin products if needed

export const AdminContext = createContext();

const adminReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            // Assign a new ID for simplicity, typically handled by backend
            const newId = Math.max(0, ...sampleProducts.map(p => p.id), ...state.map(p => p.id)) + 1;
            return [...state, { ...action.payload, id: newId }];
        case 'UPDATE_PRODUCT':
            return state.map(product =>
                product.id === action.payload.id ? action.payload : product
            );
        case 'DELETE_PRODUCT':
            return state.filter(product => product.id !== action.payload.id);
        default:
            return state;
    }
};

export const AdminProvider = ({ children }) => {
    // Start with an empty array or initial dummy products for admin
    const [products, dispatch] = useReducer(adminReducer, []);

    return (
        <AdminContext.Provider value={{ products, dispatch }}>
            {children}
        </AdminContext.Provider>
    );
};