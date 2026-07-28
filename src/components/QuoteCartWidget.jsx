import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardList, Mail, Minus, Plus, Trash2, X } from 'lucide-react';
import { useQuote } from '../contexts/quote.js';
import { trackEvent } from '../utils/analyticsEvents.js';

export default function QuoteCartWidget() {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const { items, updateItem, removeItem, clearItems } = useQuote();
    const count = items.reduce((total, item) => total + (item.quantity || 1), 0);

    const openFinalDataStep = () => {
        const hasRental = items.some((item) => item.intent === 'locacao');
        const hasEx = items.some((item) => item.ex);
        const hasNormal = items.some((item) => item.ex === false);

        setOpen(false);
        window.dispatchEvent(new CustomEvent('vesper:open-prechat', {
            detail: {
                source: 'quote_cart',
                step: 4,
                answers: {
                    procurement: hasRental ? 'locacao' : 'compra',
                    area: hasEx ? 'ex' : hasNormal ? 'normal' : '',
                },
            },
        }));
    };

    useEffect(() => {
        if (!open) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [open]);

    if (!open) {
        return (
            <button
                onClick={() => {
                    setOpen(true);
                    trackEvent('quote_cart_open', { item_count: items.length });
                }}
                className="fixed bottom-20 right-4 2xl:right-auto 2xl:left-4 z-40 bg-theme-surface-elevated border border-theme hover:border-brand-main shadow-2xl p-3 2xl:p-4 flex items-center gap-3 group transition-all"
                aria-label={t('quoteCart.openAria')}
            >
                <div className="relative bg-brand-main/10 p-2 text-brand-main group-hover:bg-brand-main group-hover:text-brand-main-contrast transition-colors">
                    <ClipboardList size={20} />
                    {count > 0 && (
                        <span className="absolute -top-2 -right-2 bg-brand-sub text-white text-[10px] font-black rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                            {count}
                        </span>
                    )}
                </div>
                <div className="text-left hidden 2xl:block">
                    <p className="text-theme-primary text-[11px] font-black uppercase tracking-widest leading-none mb-1">
                        {t('quoteCart.title')}
                    </p>
                    <p className="text-theme-muted text-[10px]">
                        {count ? t('quoteCart.count', { count }) : t('quoteCart.emptyHintShort')}
                    </p>
                </div>
            </button>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-theme-surface border border-theme w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
                <div className="p-5 border-b border-theme bg-theme-body flex items-center justify-between">
                    <div>
                        <p className="text-[10px] text-brand-main font-black uppercase tracking-widest mb-1">{t('quoteCart.eyebrow')}</p>
                        <h3 className="text-theme-primary font-black text-lg tracking-tight">{t('quoteCart.selectedTitle')}</h3>
                    </div>
                    <button onClick={() => setOpen(false)} className="text-theme-muted hover:text-theme-primary transition-colors" aria-label={t('quoteCart.closeAria')}>
                        <X size={20} />
                    </button>
                </div>

                <div className="p-5 md:p-6 overflow-y-auto flex-1">
                    {!items.length ? (
                        <div className="border border-dashed border-theme p-8 text-center">
                            <ClipboardList size={28} className="text-brand-main mx-auto mb-4" />
                            <p className="text-theme-primary font-bold text-sm mb-2">{t('quoteCart.emptyTitle')}</p>
                            <p className="text-theme-muted text-xs leading-relaxed mb-5">
                                {t('quoteCart.emptyDescription')}
                            </p>
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    window.dispatchEvent(new CustomEvent('vesper:open-prechat'));
                                }}
                                className="bg-brand-main hover:bg-white text-brand-main-contrast hover:text-black font-black py-3 px-6 text-[10px] uppercase tracking-widest transition-all"
                            >
                                {t('assistant.buttonText')}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {items.map((item) => (
                                <div key={`${item.id}-${item.intent}`} className="border border-theme bg-theme-card p-4 flex gap-4">
                                    <div className="w-16 h-16 bg-white shrink-0 flex items-center justify-center p-2">
                                        <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-theme-primary font-black text-sm leading-tight">{item.name}</p>
                                        {item.subtitle && <p className="text-theme-muted text-[11px] mt-1">{item.subtitle}</p>}
                                        <div className="mt-3 flex items-center gap-2">
                                            <button
                                                onClick={() => updateItem(item.id, { quantity: Math.max((item.quantity || 1) - 1, 1) }, item.intent)}
                                                className="w-7 h-7 border border-theme text-theme-muted hover:text-theme-primary flex items-center justify-center"
                                                aria-label={t('quoteCart.decreaseAria')}
                                            >
                                                <Minus size={12} />
                                            </button>
                                            <span className="text-theme-primary text-xs font-bold w-6 text-center">{item.quantity || 1}</span>
                                            <button
                                                onClick={() => updateItem(item.id, { quantity: Math.min((item.quantity || 1) + 1, 99) }, item.intent)}
                                                className="w-7 h-7 border border-theme text-theme-muted hover:text-theme-primary flex items-center justify-center"
                                                aria-label={t('quoteCart.increaseAria')}
                                            >
                                                <Plus size={12} />
                                            </button>
                                            <button
                                                onClick={() => removeItem(item.id, item.intent)}
                                                className="ml-auto text-theme-muted hover:text-brand-sub transition-colors"
                                                aria-label={t('quoteCart.removeAria')}
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-5 border-t border-theme bg-theme-body flex flex-col sm:flex-row gap-3">
                    <a
                        href="#"
                        onClick={(event) => {
                            event.preventDefault();
                            if (!items.length) {
                                return;
                            }
                            trackEvent('quote_cart_finalize', {
                                source: 'quote_cart',
                                item_count: items.length,
                            });
                            openFinalDataStep();
                        }}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-black uppercase tracking-widest transition-all ${
                            items.length
                                ? 'bg-brand-main hover:bg-white text-brand-main-contrast hover:text-black'
                                : 'bg-theme-surface-elevated text-theme-muted cursor-not-allowed'
                        }`}
                    >
                        <Mail size={15} /> {t('quoteCart.sendData')}
                    </a>
                    <button
                        onClick={clearItems}
                        disabled={!items.length}
                        className="border border-theme hover:border-brand-sub disabled:opacity-40 disabled:hover:border-theme text-theme-muted hover:text-theme-primary py-3 px-4 text-xs font-bold uppercase tracking-widest transition-all"
                    >
                        {t('quoteCart.clear')}
                    </button>
                </div>
            </div>
        </div>
    );
}
