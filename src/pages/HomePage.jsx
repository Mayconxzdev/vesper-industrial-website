import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ShieldCheck, Zap, Award, Truck, ChevronDown, Droplets, Anchor, HardHat, Settings, CheckCircle2, Phone } from 'lucide-react';
import { PRODUCTS, RENTAL_PRODUCTS } from '../data/products.js';
import { COMPANY } from '../data/company.js';
import { localizeProducts } from '../i18n/localizedData.js';

const HERO_PRODUCTS = PRODUCTS.filter((p) =>
    ['ventiladores-ex', 'exaustores-ex', 'exaustores-navais', 'insuflador-axial-skid'].includes(p.id)
);

function categoryToPage(category) {
    if (category === 'ventiladores') return 'ventiladores';
    if (category === 'exaustores' || category === 'insufladores') return 'exaustores';
    return 'produtos';
}

const getDifferentials = (t) => [
    {
        icon: <ShieldCheck size={22} />,
        title: t('home.differentials.exTitle'),
        desc: t('home.differentials.exDesc'),
    },
    {
        icon: <Zap size={22} />,
        title: t('home.differentials.experienceTitle'),
        desc: t('home.differentials.experienceDesc'),
    },
    {
        icon: <Award size={22} />,
        title: t('home.differentials.traditionTitle'),
        desc: t('home.differentials.traditionDesc'),
    },
    {
        icon: <Truck size={22} />,
        title: t('home.differentials.rentalTitle'),
        desc: t('home.differentials.rentalDesc'),
    },
];

function useCountUp(target, duration = 1800, enabled = false) {
    const [count, setCount] = useState(target);

    useEffect(() => {
        if (!enabled) return;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.max(1, Math.floor(start)));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration, enabled]);

    return count;
}

function AnimatedStat({ value, label, suffix = '' }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const num = parseInt(value) || 0;
    const count = useCountUp(num, 1800, visible);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className="text-center p-6 bg-black/60 backdrop-blur-md border border-white/10 rounded-sm">
            <p className="text-4xl md:text-5xl font-black text-brand-main leading-none mb-2 drop-shadow-md">
                {count}{suffix}
            </p>
            <p className="text-white text-xs font-bold uppercase tracking-widest">{label}</p>
        </div>
    );
}

function ImgSkeleton({ src, alt, className, ...props }) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    return (
        <div className="relative w-full h-full">
            {!loaded && !error && (
                <div className="absolute inset-0 bg-theme-surface-elevated animate-pulse rounded-sm" />
            )}
            <img
                src={src}
                alt={alt}
                className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                onLoad={() => setLoaded(true)}
                onError={() => { setError(true); setLoaded(true); }}
                {...props}
            />
        </div>
    );
}

function ProductCard({ product, onDetails, t }) {
    return (
        <div
            className="group flex flex-col bg-theme-card border border-theme hover:border-brand-main/30 transition-all duration-500 cursor-pointer hover:shadow-lg hover:shadow-black/20 hover:-translate-y-0.5"
            onClick={() => onDetails(product)}
        >
            <div className="h-52 overflow-hidden relative bg-white flex items-center justify-center p-6">
                <ImgSkeleton
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                {product.ex && (
                    <div className="absolute top-3 right-3">
                        <img src="/assets/img/ex_mini_icone.png" alt="EX Certificado" className="w-7 h-7 opacity-80" loading="lazy" />
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col flex-1 border-t border-theme">
                <p className="text-[11px] font-black text-brand-sub uppercase tracking-widest mb-2">
                    {product.category}
                </p>
                <h3 className="text-sm font-black text-theme-primary tracking-tight mb-1 leading-snug">
                    {product.name}
                </h3>
                {product.subtitle && (
                    <p className="text-xs text-theme-muted font-medium mb-4 leading-relaxed">
                        {product.subtitle}
                    </p>
                )}
                <span className="text-brand-main text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 mt-auto group-hover:gap-3 transition-all">
                    {t('common.specifications')} <ArrowRight size={12} />
                </span>
            </div>
        </div>
    );
}

export default function HomePage({ navigateTo }) {
    const { t, i18n } = useTranslation();
    const differentials = getDifferentials(t);
    const statsRef = useRef(null);
    const localizedHeroProducts = localizeProducts(HERO_PRODUCTS, i18n.language);
    const localizedRentalProducts = localizeProducts(RENTAL_PRODUCTS, i18n.language);

    const solutionIcons = [
        { icon: <Droplets size={28} />, page: 'exaustores' },
        { icon: <Anchor size={28} />, page: 'exaustores' },
        { icon: <HardHat size={28} />, page: 'exaustores' },
        { icon: <Settings size={28} />, page: 'produtos' },
    ];
    const solutions = t('home.solutions.items', { returnObjects: true }).map((item, index) => ({
        ...item,
        ...solutionIcons[index],
    }));

    const steps = t('home.process.steps', { returnObjects: true }).map((item, index) => ({
        num: String(index + 1).padStart(2, '0'),
        ...item,
    }));

    return (
        <div>
            {/* --- HERO -------------------------------------------- */}
            <section className="relative min-h-[92vh] flex items-center pt-24 overflow-hidden bg-theme-body">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-body)] via-[var(--bg-body)]/95 to-[var(--bg-body)]/10 z-10" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-body)] to-transparent z-10" />
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        poster="/assets/img/hero-poster.jpg"
                        className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
                        aria-hidden="true"
                    >
                        <source src="/Hero.mp4" type="video/mp4" />
                    </video>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 w-full">
                    <div className="max-w-2xl">
                        <span className="inline-flex items-center gap-2 px-3 py-1 border border-brand-main/30 text-brand-main/80 text-[10px] font-black uppercase tracking-[0.4em] mb-8 bg-brand-main/5">
                            {t('home.hero.certifications')}
                        </span>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-theme-primary tracking-tighter leading-[0.9] mb-6 md:mb-8">
                            {t('home.hero.title1')}
                            {' '}<span className="text-brand-main">{t('home.hero.title2')}</span>
                            <br />
                            {t('home.hero.title3')}
                            {' '}<span className="text-brand-sub">{t('home.hero.title4')}</span>
                        </h1>

                        <p className="text-theme-secondary text-sm sm:text-base md:text-lg font-normal leading-relaxed mb-2 max-w-lg">
                            {t('home.hero.subtitle')}
                        </p>
                        <p className="text-theme-muted text-sm mb-8 md:mb-10">
                            {t('home.hero.location')} — {COMPANY.phonesDisplay}
                        </p>

                        <div className="flex flex-wrap gap-3">
                            <button
                                onClick={() => navigateTo('produtos')}
                            className="btn-primary py-3.5 px-7 text-sm flex items-center gap-2"
                            >
                                {t('home.hero.ctaProducts')} <ArrowRight size={16} />
                            </button>
                            <button
                                onClick={() => navigateTo('locacao')}
                            className="btn-secondary py-3.5 px-7 text-sm"
                            >
                                {t('home.hero.ctaRental')}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce-slow flex flex-col items-center gap-2 opacity-60">
                    <span className="text-[9px] uppercase tracking-widest text-theme-muted">{t('home.scroll')}</span>
                    <ChevronDown size={20} className="text-brand-main" />
                </div>
            </section>

            {/* --- DIFERENCIAIS (faixa fina) --------------------- */}
            <section className="border-y border-theme bg-theme-surface py-8 md:py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {differentials.map((d, i) => (
                        <div
                            key={i}
                            className="group flex gap-3 md:gap-4 items-start p-3 rounded-sm hover:bg-theme-surface-elevated transition-all duration-300 cursor-default"
                        >
                            <div className="text-brand-main shrink-0 opacity-70 mt-0.5 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                                {d.icon}
                            </div>
                            <div>
                                <p className="text-theme-primary font-bold text-xs mb-1 leading-snug group-hover:text-brand-main transition-colors duration-300">{d.title}</p>
                                <p className="text-theme-muted text-xs leading-relaxed">{d.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- SOLUÇÕES POR APLICAÇÃO (NOVO) ------------------ */}
            <section className="py-20 md:py-24 bg-theme-body border-b border-theme industrial-texture">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <p className="text-[11px] text-brand-main font-black uppercase tracking-widest mb-3">
                            {t('home.solutions.eyebrow')}
                        </p>
                        <h2 className="text-3xl md:text-4xl font-black text-theme-primary tracking-tighter mb-4">
                            {t('home.solutions.title')} <span className="text-brand-main">{t('home.solutions.titleHighlight')}</span>
                        </h2>
                        <p className="text-theme-muted text-sm leading-relaxed">
                            {t('home.solutions.description')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {solutions.map((sol, idx) => (
                            <button
                                key={idx}
                                onClick={() => navigateTo(sol.page)}
                                className="theme-panel p-8 group transition-all duration-500 hover:-translate-y-1 hover:shadow-lg text-left hover:border-brand-main/40"
                            >
                                <div className="text-brand-sub mb-6 group-hover:scale-110 transition-transform duration-500 origin-left">
                                    {sol.icon}
                                </div>
                                <h3 className="text-theme-primary font-bold text-base mb-3 leading-tight">{sol.title}</h3>
                                <p className="text-theme-muted text-[13px] leading-relaxed mb-6">{sol.desc}</p>
                                <div className="mt-auto flex items-center gap-2 text-[10px] text-theme-muted group-hover:text-brand-main font-bold uppercase tracking-widest transition-colors">
                                    <span className="w-6 h-[1px] bg-theme-muted group-hover:bg-brand-main transition-colors" />
                                    {t('home.solutions.seeMore')}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- PRODUTOS DESTAQUE ------------------------------ */}
            <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12 gap-4">
                    <div>
                        <p className="text-[11px] text-brand-sub font-black uppercase tracking-widest mb-3">
                            {t('home.products.subtitle')}
                        </p>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-theme-primary tracking-tighter leading-none">
                            {t('home.products.titlePrefix')}{' '}
                            <span className="text-brand-main">{t('home.products.titleHighlight')}</span>
                        </h2>
                    </div>
                    <button
                        onClick={() => navigateTo('produtos')}
                        className="hidden sm:flex items-center gap-2 text-[11px] text-theme-muted hover:text-brand-main font-bold uppercase tracking-widest transition-colors"
                    >
                        {t('common.seeAll')} <ArrowRight size={12} />
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {localizedHeroProducts.map((p) => (
                        <ProductCard
                            key={p.id}
                            product={p}
                            onDetails={(product) => navigateTo(categoryToPage(product.category), product.id)}
                            t={t}
                        />
                    ))}
                </div>

                <div className="mt-6 md:mt-8 flex flex-wrap gap-2 md:gap-3">
                    <button
                        onClick={() => navigateTo('produtos')}
                        className="btn-primary py-2.5 md:py-3 px-5 md:px-7 text-xs flex items-center gap-2"
                    >
                        {t('home.products.allCategories')} <ArrowRight size={14} />
                    </button>
                    <button
                        onClick={() => navigateTo('ventiladores')}
                        className="btn-secondary py-2.5 md:py-3 px-5 md:px-7 text-xs"
                    >
                        {t('home.products.ctaVentiladores')} <ArrowRight size={14} />
                    </button>
                    <button
                        onClick={() => navigateTo('exaustores')}
                        className="btn-secondary py-2.5 md:py-3 px-5 md:px-7 text-xs"
                    >
                        {t('home.products.ctaExaustores')}
                    </button>
                </div>
            </section>

            {/* --- LOCAÇÃO --------------------------------------- */}
            <section className="bg-theme-surface border-y border-theme py-16 md:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
                    <div>
                        <p className="text-[11px] text-brand-main font-black uppercase tracking-widest mb-4">
                            {t('home.rental.subtitle')}
                        </p>
                        <h2 className="text-3xl md:text-4xl font-black text-theme-primary tracking-tighter leading-none mb-6">
                            {i18n.language === 'pt-BR' ? 'Portfólio Próprio' : 'Own Portfolio'}
                            <br /><span className="text-theme-secondary font-normal">{i18n.language === 'pt-BR' ? 'pronto para envio' : 'ready to ship'}</span>
                        </h2>
                        <p className="text-theme-muted text-sm leading-relaxed mb-4 max-w-md">
                            {t('home.rental.description')}
                        </p>
                        <p className="text-theme-muted/60 text-xs mb-8">
                            {t('home.rental.taxNote')}
                        </p>
                        <button
                            onClick={() => navigateTo('locacao')}
                            className="btn-primary py-3.5 px-7 text-xs flex items-center gap-2 w-fit"
                        >
                            {t('home.rental.cta')} <ArrowRight size={14} />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {localizedRentalProducts.slice(0, 4).map((p) => (
                            <div
                                key={p.id}
                                className="bg-theme-card border border-theme group hover:border-brand-main/25 transition-all cursor-pointer overflow-hidden flex flex-col hover:shadow-md hover:shadow-black/20"
                                onClick={() => navigateTo('locacao')}
                            >
                                <div className="bg-white h-28 flex items-center justify-center p-4 relative overflow-hidden">
                                    <ImgSkeleton
                                        src={p.image}
                                        alt={p.name}
                                        className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-main/20 transition-all duration-300" />
                                </div>
                                <div className="p-4 flex flex-col justify-center flex-1">
                                    <p className="text-theme-primary text-[11px] font-bold leading-tight">{p.name}</p>
                                    <p className="text-theme-muted text-[10px] mt-0.5">{p.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- COMO FUNCIONA (NOVO) --------------------------- */}
            <section className="py-20 md:py-28 bg-theme-body border-b border-theme">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="text-center mb-16">
                        <p className="text-[11px] text-brand-sub font-black uppercase tracking-widest mb-3">
                            {t('home.process.eyebrow')}
                        </p>
                        <h2 className="text-3xl md:text-4xl font-black text-theme-primary tracking-tighter">
                            {t('home.process.title')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {/* Linha conectora desktop */}
                        <div className="hidden lg:block absolute top-[50px] left-12 right-12 h-[1px] bg-theme-surface-elevated z-0" />
                        
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                                <div className="w-24 h-24 rounded-full bg-theme-surface border border-theme flex items-center justify-center mb-6 group-hover:border-brand-main group-hover:shadow-[0_0_20px_rgba(219,168,0,0.15)] transition-all duration-500 relative bg-theme-body">
                                    <span className="text-3xl font-black text-theme-muted/30 group-hover:text-brand-main transition-colors font-mono">
                                        {step.num}
                                    </span>
                                </div>
                                <h3 className="text-theme-primary font-bold text-[15px] mb-3">{step.title}</h3>
                                <p className="text-theme-muted text-xs leading-relaxed max-w-[220px]">
                                    {step.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- STATS COM PARALLAX (ATUALIZADO) ---------------- */}
            <section
                ref={statsRef}
                className="py-24 border-b border-theme relative flex items-center bg-theme-surface"
            >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(219,168,0,0.07),transparent_55%)]" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 text-center w-full">
                    <AnimatedStat value={60} label={t('home.stats.yearsMarket')} suffix="+" />
                    <AnimatedStat value={20} label={t('home.stats.yearsEx')} suffix="+" />
                    <AnimatedStat value={74} label={t('home.stats.employees')} />
                </div>
            </section>

            {/* --- CTA CONTATO ------------------------------------ */}
            <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="theme-panel p-6 sm:p-8 md:p-10 lg:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
                    <div>
                        <p className="text-[11px] text-brand-main font-black uppercase tracking-widest mb-3">
                            {t('home.cta.subtitle')}
                        </p>
                        <h2 className="text-2xl md:text-3xl font-black text-theme-primary tracking-tighter">
                            {t('home.cta.title')}
                        </h2>
                        <p className="text-theme-muted text-sm mt-2 max-w-xl">
                            {t('home.cta.description')}
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                        <button
                            type="button"
                            onClick={() => window.dispatchEvent(new CustomEvent('vesper:open-prechat'))}
                            className="border border-brand-main/40 hover:bg-brand-main hover:text-brand-main-contrast hover:border-brand-main text-brand-main text-[11px] font-black px-7 py-3.5 uppercase tracking-widest transition-all text-center flex items-center justify-center gap-2"
                        >
                            <Phone size={14} /> {t('home.cta.talkSpecialist')}
                        </button>
                        <button
                            onClick={() => navigateTo('contato')}
                            className="bg-theme-surface-elevated hover:bg-theme-surface text-theme-primary border border-theme text-[11px] font-black px-7 py-3.5 uppercase tracking-widest transition-all"
                        >
                            {t('home.cta.sendMessage')}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
