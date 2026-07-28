import React, { useEffect, useMemo, useState } from 'react';
import { QuoteContext } from './quote.js';

const STORAGE_KEY = 'vesper-quote-items';

function itemMatches(item, id, intent = '') {
    return item.id === id && (item.intent || '') === (intent || '');
}

function readItems() {
    if (typeof window === 'undefined') return [];
    try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

export function QuoteProvider({ children }) {
    const [items, setItems] = useState(readItems);

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const value = useMemo(() => ({
        items,
        addItem(product, meta = {}) {
            setItems((current) => {
                const intent = meta.intent || '';
                const existing = current.find((item) => itemMatches(item, product.id, intent));
                if (existing) {
                    return current.map((item) => (
                        item === existing
                            ? { ...item, quantity: Math.min((item.quantity || 1) + 1, 99), notes: meta.notes || item.notes }
                            : item
                    ));
                }

                return [
                    ...current,
                    {
                        id: product.id,
                        name: product.name,
                        subtitle: product.subtitle,
                        category: product.category,
                        image: product.image,
                        ex: Boolean(product.ex),
                        quantity: meta.quantity || 1,
                        intent,
                        notes: meta.notes || '',
                    },
                ];
            });
        },
        updateItem(id, patch, intent = '') {
            setItems((current) => current.map((item) => (
                itemMatches(item, id, intent) ? { ...item, ...patch } : item
            )));
        },
        removeItem(id, intent = '') {
            setItems((current) => current.filter((item) => !itemMatches(item, id, intent)));
        },
        clearItems() {
            setItems([]);
        },
    }), [items]);

    return (
        <QuoteContext.Provider value={value}>
            {children}
        </QuoteContext.Provider>
    );
}
