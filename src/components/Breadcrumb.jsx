import React from 'react';

export default function Breadcrumb({ items, navigateTo }) {
    // items: [{ label: 'Página', page: 'home' }, { label: 'Subpágina' }]
    return (
        <div className="bg-theme-surface border-b border-theme pt-28 md:pt-32 pb-3.5 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center gap-2 flex-wrap">
                <button
                    onClick={() => navigateTo('home')}
                    className="text-[11px] font-semibold text-theme-muted hover:text-brand-main transition-colors duration-200 uppercase tracking-widest"
                >
                    Vesper
                </button>
                {items.map((item, i) => (
                    <React.Fragment key={i}>
                        {/* Separador dourado */}
                        <span className="text-brand-main/60 text-sm font-light select-none">›</span>
                        {item.page ? (
                            <button
                                onClick={() => navigateTo(item.page)}
                                className="text-[11px] font-semibold text-theme-muted hover:text-brand-main transition-colors duration-200 uppercase tracking-widest hover:underline underline-offset-2"
                            >
                                {item.label}
                            </button>
                        ) : (
                            <span className="text-[11px] font-bold text-brand-sub uppercase tracking-widest">
                                {item.label}
                            </span>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
