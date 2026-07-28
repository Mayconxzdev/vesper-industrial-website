import React from 'react';

/**
 * Hero banner reutilizável para páginas internas.
 * Fundo escuro industrial com título, subtítulo, badge e linha dourada.
 */
export default function InnerPageHero({ badge, title, titleHighlight, subtitle, bgImage }) {
    return (
        <section className="relative pt-20 pb-12 md:pb-16 overflow-hidden bg-[#0D0D0D]">
            {/* Padrão de pontos sutil no fundo */}
            <div
                className="absolute inset-0 opacity-[0.14] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #DBA800 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />
            {/* Imagem de fundo opcional com overlay */}
            {bgImage && (
                <div className="absolute inset-0 z-0">
                    <img
                        src={bgImage}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover object-center opacity-10"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/80 to-[#0D0D0D]/50" />
                </div>
            )}
            {/* Linha dourada lateral */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#DBA800]/60 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-6">
                {badge && (
                    <span className="inline-flex items-center gap-2 px-3 py-1 border border-brand-main/30 text-brand-main/70 text-[10px] font-black uppercase tracking-[0.35em] mb-5 bg-brand-main/5">
                        {badge}
                    </span>
                )}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-4">
                    {title}
                    {titleHighlight && (
                        <> <span className="text-brand-main">{titleHighlight}</span></>
                    )}
                </h1>
                {subtitle && (
                    <p className="text-gray-400 text-sm font-normal leading-relaxed max-w-2xl">
                        {subtitle}
                    </p>
                )}
                {/* Linha decorativa dourada */}
                <div className="mt-7 flex items-center gap-3">
                    <div className="h-px w-12 bg-brand-main" />
                    <div className="h-px w-4 bg-brand-main/40" />
                    <div className="h-px w-2 bg-brand-main/20" />
                </div>
            </div>
        </section>
    );
}
