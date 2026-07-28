import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronRight, Menu, X, Phone, Sun, Moon, Globe, Search, Fan, Wind, Truck } from 'lucide-react';
import { COMPANY } from '../data/company.js';
import { useTheme } from '../contexts/theme.js';
import { PRODUCTS } from '../data/products.js';
import { getTechnicalSearchText } from '../data/technicalSpecs.js';
import { localizeProducts } from '../i18n/localizedData.js';

const getNavLinks = (t) => [
    { id: 'home', label: t('nav.home') },
    { id: 'produtos', label: t('nav.produtos') },
    { id: 'empresa', label: t('nav.empresa') },
    { id: 'novidades', label: t('nav.novidades') },
    { id: 'qualidade', label: t('nav.qualidade') },
    { id: 'etica', label: t('nav.etica') },
    { id: 'downloads', label: t('nav.artigosDownload', { defaultValue: t('nav.downloads') }) },
    { id: 'contato', label: t('nav.contato') },
];

const getProductLinks = (t) => [
    { id: 'ventiladores', label: t('nav.ventiladores') },
    { id: 'exaustores', label: t('nav.exaustores') },
    { id: 'locacao', label: t('nav.locacao') },
];

const getProductMenu = (t) => [
    {
        id: 'ventiladores',
        page: 'ventiladores',
        label: t('nav.ventiladores'),
        summary: t('nav.productMenu.ventiladores.summary'),
        icon: Fan,
        children: [
            {
                id: 'ventiladores-normal',
                label: t('nav.productMenu.labels.normal'),
                children: [
                    {
                        id: 'ventiladores-comerciais',
                        label: t('nav.productMenu.ventiladores.groups.comerciais'),
                        children: [
                            { id: 'ventilador-v500', label: t('nav.productMenu.ventiladores.items.v500'), target: { type: 'product', id: 'ventilador-v500' } },
                            { id: 'ventilador-2410', label: t('nav.productMenu.ventiladores.items.v2410'), target: { type: 'product', id: 'ventilador-2410' } },
                            { id: 'ventilador-1101', label: t('nav.productMenu.ventiladores.items.v1101'), target: { type: 'product', id: 'ventilador-1101' } },
                        ],
                    },
                    {
                        id: 'ventiladores-industriais',
                        label: t('nav.productMenu.ventiladores.groups.industriais'),
                        children: [
                            { id: 'ventilador-8803', label: t('nav.productMenu.ventiladores.items.v8803'), target: { type: 'product', id: 'ventilador-8803' } },
                            { id: 'ventilador-8813', label: t('nav.productMenu.ventiladores.items.v8813'), target: { type: 'product', id: 'ventilador-8813' } },
                            { id: 'ventilador-8800', label: t('nav.productMenu.ventiladores.items.v8800'), target: { type: 'product', id: 'ventilador-8800' } },
                            { id: 'ventilador-super-1000', label: t('nav.productMenu.ventiladores.items.super1000'), target: { type: 'product', id: 'ventilador-super-1000' } },
                        ],
                    },
                ],
            },
            {
                id: 'ventiladores-ex-vpe',
                label: t('nav.productMenu.labels.exVpe'),
                children: [
                    { id: 'ventiladores-ex', label: t('nav.productMenu.ventiladores.items.ex'), target: { type: 'product', id: 'ventiladores-ex' } },
                ]
            },
            {
                id: 'ventiladores-portatil-vic',
                label: t('nav.productMenu.labels.portatilVic'),
                children: [
                    { id: 'ventiladores-vic-normal', label: t('nav.productMenu.labels.vicNormal'), target: { type: 'product', id: 'ventiladores-vic' } },
                    { id: 'ventiladores-vic-ex', label: t('nav.productMenu.labels.linhex'), target: { type: 'product', id: 'ventiladores-vic-ex' } },
                    { id: 'ventiladores-vic-aspersao', label: t('nav.productMenu.ventiladores.items.vicAspersao'), target: { type: 'product', id: 'ventiladores-vic-aspersao' } },
                ],
            },
        ],
    },
    {
        id: 'exaustores',
        page: 'exaustores',
        label: t('nav.exaustores'),
        summary: t('nav.productMenu.exaustores.summary'),
        icon: Wind,
        children: [
            {
                id: 'exaustores-axiais',
                label: t('nav.productMenu.exaustores.groups.axiais'),
                children: [
                    { id: 'exaustores-axiais-normal', label: t('nav.productMenu.labels.normal'), target: { type: 'product', id: 'exaustores-axiais' } },
                    { id: 'exaustores-axiais-ex', label: t('nav.productMenu.labels.ex'), target: { type: 'product', id: 'exaustores-ex' } },
                    { id: 'exaustores-axiais-ventex', label: t('nav.productMenu.exaustores.items.ventex'), target: { type: 'rental', id: 'loc-ventex', page: 'locacao' } },
                    { id: 'exaustores-axiais-indireta', label: t('nav.productMenu.exaustores.items.indireta'), target: { type: 'product', id: 'exaustores-axiais-indireta' } },
                    { id: 'exaustores-axiais-parede', label: t('nav.productMenu.exaustores.items.parede'), target: { type: 'product', id: 'exaustores-axial-parede' } },
                    { id: 'exaustores-axiais-pneumatico', label: t('nav.productMenu.exaustores.items.pneumatico'), target: { type: 'product', id: 'exaustores-pneumatico' } },
                    { id: 'exaustores-axiais-naval', label: t('nav.productMenu.exaustores.items.naval'), target: { type: 'product', id: 'exaustores-navais' } },
                    { id: 'exaustores-axiais-offshore', label: t('nav.productMenu.exaustores.items.offshore'), target: { type: 'product', id: 'exaustores-offshore' } },
                ],
            },
            {
                id: 'exaustores-centrifugos',
                label: t('nav.productMenu.exaustores.groups.centrifugos'),
                children: [
                    { id: 'exaustores-centrifugos-industriais', label: t('nav.productMenu.exaustores.items.centrifugosIndustriais'), target: { type: 'product', id: 'exaustores-centrifugos' } },
                    { id: 'exaustores-especiais', label: t('nav.productMenu.exaustores.items.especiais'), target: { type: 'product', id: 'exaustores-especiais' } },
                ],
            },
            {
                id: 'exaustores-portateis',
                label: t('nav.productMenu.labels.portatil'),
                children: [
                    { id: 'exaustores-super-portatil-normal', label: t('nav.productMenu.labels.normal'), target: { type: 'product', id: 'exaustores-super-portatil' } },
                    { id: 'exaustores-super-portatil-ex', label: t('nav.productMenu.labels.linhex'), target: { type: 'product', id: 'exaustores-super-portatil-ex' } },
                    { id: 'exaustores-super-portatil-pneumatico', label: t('nav.productMenu.exaustores.items.pneumatico'), target: { type: 'product', id: 'exaustores-super-portatil-pneumatico' } },
                ],
            },
            {
                id: 'tank-fan',
                label: t('nav.productMenu.exaustores.items.tankFan'),
                children: [
                    { id: 'insuflador-axial-skid', label: t('nav.productMenu.labels.axial'), target: { type: 'product', id: 'insuflador-axial-skid' } },
                    { id: 'insuflador-centrifugo-2bocas', label: t('nav.productMenu.labels.centrifugo2Bocas'), target: { type: 'product', id: 'insuflador-centrifugo-2bocas' } },
                    { id: 'insuflador-centrifugo-4bocas', label: t('nav.productMenu.labels.centrifugo4Bocas'), target: { type: 'product', id: 'insuflador-centrifugo-4bocas' } },
                    { id: 'insuflador-centrifugo-6bocas', label: t('nav.productMenu.labels.centrifugo6Bocas'), target: { type: 'product', id: 'insuflador-centrifugo-6bocas' } },
                ],
            },
        ],
    },
    {
        id: 'locacao',
        page: 'locacao',
        label: t('nav.locacao'),
        summary: t('nav.productMenu.locacao.summary'),
        icon: Truck,
        children: [
            {
                id: 'locacao-ventiladores',
                label: t('nav.productMenu.locacao.groups.ventiladores'),
                children: [
                    {
                        id: 'locacao-ventiladores-normal',
                        label: t('nav.productMenu.labels.normal'),
                        children: [
                            { id: 'loc-ventilador-1600', label: t('nav.productMenu.locacao.items.v1600'), target: { type: 'rental', id: 'loc-ventilador-1600' } },
                            { id: 'loc-ventilador-1101', label: t('nav.productMenu.locacao.items.v1101'), target: { type: 'rental', id: 'loc-ventilador-1101' } },
                            { id: 'loc-ventilador-8800', label: t('nav.productMenu.locacao.items.v8800'), target: { type: 'rental', id: 'loc-ventilador-8800' } },
                        ],
                    },
                    {
                        id: 'locacao-ventiladores-aspersao',
                        label: t('nav.productMenu.locacao.groups.aspersao'),
                        children: [
                            { id: 'loc-ventilador-1600-asp', label: t('nav.productMenu.locacao.items.v1600Asp'), target: { type: 'rental', id: 'loc-ventilador-1600-asp' } },
                            { id: 'loc-ventilador-1101-asp', label: t('nav.productMenu.locacao.items.v1100Asp'), target: { type: 'rental', id: 'loc-ventilador-1101-asp' } },
                            { id: 'loc-ventilador-8800-asp', label: t('nav.productMenu.locacao.items.v8800Asp'), target: { type: 'rental', id: 'loc-ventilador-8800-asp' } },
                        ],
                    },
                ],
            },
            {
                id: 'locacao-exaustores',
                label: t('nav.productMenu.locacao.groups.exaustores'),
                children: [
                    { id: 'loc-ventex', label: t('nav.productMenu.locacao.items.ventex'), target: { type: 'rental', id: 'loc-ventex' } },
                    { id: 'loc-centrifugo', label: t('nav.productMenu.locacao.items.centrifugo'), target: { type: 'rental', id: 'loc-centrifugo' } },
                    { id: 'loc-exaustor-ex', label: t('nav.productMenu.locacao.items.ex'), target: { type: 'rental', id: 'loc-exaustor-ex' } },
                ],
            },
            {
                id: 'locacao-ventfog',
                label: t('nav.productMenu.locacao.items.ventfog'),
                children: [
                    { id: 'loc-ventfog-estatico', label: t('nav.productMenu.labels.estatico'), target: { type: 'rental', id: 'loc-ventfog-estatico' } },
                    { id: 'loc-ventfog-dinamico', label: t('nav.productMenu.labels.dinamico'), target: { type: 'rental', id: 'loc-ventfog-dinamico' } },
                ],
            },
            { id: 'loc-cortina', label: t('nav.productMenu.locacao.items.cortina'), target: { type: 'rental', id: 'loc-cortina' } },
        ],
    },
];

// Busca real nos produtos: retorna correspondência de nome, categoria, descrição
function normalizeSearchText(value) {
    return String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
}

function searchProducts(query, products) {
    const q = normalizeSearchText(query);
    if (!q) return [];
    return products.filter((p) => {
        const searchable = normalizeSearchText([
            p.name,
            p.category,
            p.description,
            p.subtitle,
            getTechnicalSearchText(p.id),
            ...(p.specs || []),
        ].filter(Boolean).join(' '));
        return searchable.includes(q);
    }).slice(0, 6);
}

// Mapeia categoria de produto para página de navegação
function categoryToPage(category) {
    if (category === 'ventiladores') return 'ventiladores';
    if (category === 'exaustores') return 'exaustores';
    if (category === 'insufladores') return 'exaustores';
    return 'produtos';
}

function CascadeMenuNode({ node, onNavigate, openPath, setOpenPath, parentPath = [], level = 0 }) {
    const hasChildren = Array.isArray(node.children) && node.children.length > 0;
    const canNavigate = Boolean(node.target || node.page);
    const Icon = node.icon;
    const isOpen = hasChildren && openPath[level] === node.id;

    const handleClick = (event) => {
        if (!canNavigate) return;
        event?.preventDefault?.();
        event?.stopPropagation?.();
        onNavigate(node);
    };
    const activateNode = () => setOpenPath([...parentPath, node.id]);

    return (
        <div className="relative" onMouseEnter={activateNode} onFocus={activateNode}>
            <button
                type="button"
                onMouseDown={handleClick}
                onClick={(event) => {
                    if (event.detail === 0) handleClick(event);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-[10px] font-black uppercase tracking-widest transition-colors ${
                    level === 0
                        ? 'text-nav-link hover:bg-theme-surface-elevated hover:text-nav-hover'
                        : 'text-theme-primary hover:bg-theme-surface-elevated hover:text-nav-link'
                }`}
                aria-haspopup={hasChildren ? 'menu' : undefined}
            >
                {Icon && <Icon size={14} className="shrink-0 text-brand-main" />}
                <span className="min-w-0 flex-1 leading-snug">{node.label}</span>
                {hasChildren && <ChevronRight size={13} className={`shrink-0 transition-colors ${isOpen ? 'text-brand-main' : 'text-theme-muted'}`} />}
            </button>

            {hasChildren && isOpen && (
                <div className="absolute left-full top-0 z-50 pl-2">
                    <div className="w-52 bg-theme-surface border border-theme shadow-2xl py-2">
                        {node.children.map((child) => (
                            <CascadeMenuNode
                                key={child.id || child.label}
                                node={child}
                                onNavigate={onNavigate}
                                openPath={openPath}
                                setOpenPath={setOpenPath}
                                parentPath={[...parentPath, node.id]}
                                level={level + 1}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function MobileProductNode({ node, depth = 0, openNodes, toggleNode, onNavigate, t }) {
    const hasChildren = Array.isArray(node.children) && node.children.length > 0;
    const canNavigate = Boolean(node.target || node.page);
    const isOpen = Boolean(openNodes[node.id]);
    const Icon = node.icon;

    return (
        <div className={depth === 0 ? 'border border-theme bg-theme-card' : 'border-l border-theme'}>
            <div className="flex items-stretch">
                <button
                    type="button"
                    onClick={() => {
                        if (canNavigate) {
                            onNavigate(node);
                        } else if (hasChildren) {
                            toggleNode(node.id);
                        }
                    }}
                    className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3 text-left text-theme-primary transition-colors hover:text-nav-link"
                    style={{ paddingLeft: `${1 + depth * 0.85}rem` }}
                >
                    {Icon && <Icon size={16} className="shrink-0 text-brand-main" />}
                    <span className="min-w-0">
                        <span className="block text-[11px] font-black uppercase tracking-widest leading-snug">
                            {node.label}
                        </span>
                        {depth === 0 && node.summary && (
                            <span className="mt-0.5 block text-[10px] normal-case leading-relaxed tracking-normal text-theme-muted">
                                {node.summary}
                            </span>
                        )}
                    </span>
                </button>
                {hasChildren && (
                    <button
                        type="button"
                        onClick={() => toggleNode(node.id)}
                        className="w-12 border-l border-theme text-theme-muted hover:text-theme-primary transition-colors flex items-center justify-center"
                        aria-label={isOpen ? t('common.close') : t('common.open')}
                        aria-expanded={isOpen}
                        aria-controls={`mobile-product-node-${node.id}`}
                    >
                        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                )}
            </div>

            {hasChildren && isOpen && (
                <div id={`mobile-product-node-${node.id}`} className="border-t border-theme py-1">
                    {node.children.map((child) => (
                        <MobileProductNode
                            key={child.id || child.label}
                            node={child}
                            depth={depth + 1}
                            openNodes={openNodes}
                            toggleNode={toggleNode}
                            onNavigate={onNavigate}
                            t={t}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default function Header({ currentPage, navigateTo }) {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [mobileProductGroupsOpen, setMobileProductGroupsOpen] = useState({ ventiladores: true });
    const [desktopProductPath, setDesktopProductPath] = useState([]);
    const searchRef = useRef(null);

    const navLinks = getNavLinks(t);
    const productLinks = getProductLinks(t);
    const productMenu = getProductMenu(t);
    const localizedProducts = localizeProducts(PRODUCTS, i18n.language);
    const productPages = ['produtos', ...productLinks.map((link) => link.id)];

    const go = (page, target = null) => {
        const targetId = target && typeof target === 'object' ? target.id : target;
        navigateTo(page, targetId);
        setMenuOpen(false);
        setSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
        setDesktopProductPath([]);
    };

    const goMenuNode = (node) => {
        const target = node.target || null;
        let page = target?.page || node.page;

        if (!page && target?.type === 'product') {
            page = target.id.startsWith('ventilador') ? 'ventiladores' : 'exaustores';
        }

        if (!page && target?.type === 'rental') {
            page = 'locacao';
        }

        go(page || 'produtos', target);
    };

    const toggleMobileProductGroup = (id) => {
        setMobileProductGroupsOpen((current) => ({
            ...current,
            [id]: !current[id],
        }));
    };

    const toggleLanguage = () => {
        const newLang = i18n.language === 'pt-BR' ? 'en' : 'pt-BR';
        i18n.changeLanguage(newLang);
    };

    // Busca em tempo real ao digitar
    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchQuery(val);
        setSearchResults(searchProducts(val, localizedProducts));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const results = searchProducts(searchQuery, localizedProducts);
        if (results.length > 0) {
            const product = results[0];
            go(categoryToPage(product.category), { type: 'product', id: product.id });
        } else if (normalizeSearchText(searchQuery).includes('exaustor') || normalizeSearchText(searchQuery).includes('exhaust')) {
            go('exaustores');
        } else {
            go('produtos');
        }
    };

    // Fechar busca ao clicar fora
    useEffect(() => {
        const handleClick = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchOpen(false);
                setSearchResults([]);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <nav className="fixed top-0 w-full z-50 bg-theme-header border-b border-theme transition-colors duration-300">
            {/* Barra de topo com telefone e controles */}
            <div className="bg-theme-surface border-b border-theme py-1 px-4 hidden lg:flex justify-between items-center transition-colors duration-300">
                <div className="flex items-center gap-3">
                    {/* Toggle Tema */}
                    <button
                        onClick={toggleTheme}
                        className="p-1.5 rounded-md text-theme-muted hover:text-theme-primary hover:bg-theme-surface-elevated transition-all"
                        aria-label={theme === 'dark' ? t('nav.theme.light') : t('nav.theme.dark')}
                        title={theme === 'dark' ? t('nav.theme.light') : t('nav.theme.dark')}
                    >
                        {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                    </button>

                    {/* Toggle Idioma */}
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider text-theme-muted hover:text-theme-primary hover:bg-theme-surface-elevated transition-all"
                        aria-label={t('nav.language.toggle')}
                        title={t('nav.language.toggle')}
                    >
                        <Globe size={12} />
                        {i18n.language === 'pt-BR' ? 'PT' : 'EN'}
                    </button>
                </div>

                <a
                    href={`tel:+5521967271871`}
                    className="flex items-center gap-2 text-[11px] text-theme-muted hover:text-theme-accent transition-colors font-bold uppercase tracking-widest"
                >
                    <Phone size={10} />
                    {COMPANY.phonesDisplay}
                </a>
            </div>

            {/* Barra principal */}
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
                {/* Logo */}
                <button
                    onClick={() => go('home')}
                    className="flex items-center shrink-0 group"
                    aria-label={`Vesper — ${t('nav.home')}`}
                >
                    <img
                        src="/assets/img/vesper-ex-logo.png"
                        alt="Vesper Equipamentos EX"
                        className="h-10 w-auto max-w-[158px] object-contain transition-transform duration-300 group-hover:scale-[1.02] sm:h-14 sm:max-w-[210px]"
                        decoding="async"
                    />
                </button>

                {/* Nav desktop */}
                <div className="hidden lg:flex items-center gap-4">
                    {navLinks.map((link) => {
                        const isProductLink = link.id === 'produtos';
                        const hasChildren = Array.isArray(link.children) && link.children.length > 0;
                        const isActive = isProductLink
                            ? productPages.includes(currentPage)
                            : currentPage === link.id || (hasChildren && link.children.some((c) => c.id === currentPage));

                        if (isProductLink) {
                            return (
                                <div key={link.id} className="relative group">
                                    <button
                                        onClick={() => go(link.id)}
                                        onMouseEnter={() => setDesktopProductPath([])}
                                        onFocus={() => setDesktopProductPath([])}
                                        className="text-[10px] font-black uppercase tracking-[0.16em] transition-all relative text-nav-link hover:text-nav-hover flex items-center gap-1.5 py-2"
                                        aria-current={currentPage === link.id ? 'page' : undefined}
                                        aria-haspopup="menu"
                                    >
                                        {link.label}
                                        <ChevronDown size={12} className="transition-transform group-hover:rotate-180" />
                                        <span
                                            className={`absolute bottom-0 left-0 h-[2px] bg-nav-active transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                                        />
                                    </button>
                                    <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 absolute top-full right-0 pt-3 transition-all duration-200 z-50">
                                        <div className="w-52 bg-theme-surface border border-theme shadow-2xl py-2">
                                            <button
                                                onClick={() => go(link.id)}
                                                className={`w-full text-left px-3 py-2.5 text-[10px] font-black uppercase tracking-widest border-b border-theme transition-colors ${
                                                    currentPage === link.id
                                                        ? 'text-nav-link'
                                                        : 'text-theme-primary hover:text-nav-link hover:bg-theme-surface-elevated'
                                                }`}
                                                aria-current={currentPage === link.id ? 'page' : undefined}
                                            >
                                                {t('common.seeAll')} {link.label}
                                            </button>
                                            {productMenu.map((section) => (
                                                <CascadeMenuNode
                                                    key={section.id}
                                                    node={section}
                                                    onNavigate={goMenuNode}
                                                    openPath={desktopProductPath}
                                                    setOpenPath={setDesktopProductPath}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        if (hasChildren) {
                            return (
                                <div key={link.id} className="relative group">
                                    <button
                                        onClick={() => { /* keep behavior: no direct nav */ }}
                                        className="text-[10px] font-black uppercase tracking-[0.16em] transition-all relative group text-nav-link hover:text-nav-hover flex items-center gap-1.5 py-2"
                                        aria-haspopup="menu"
                                    >
                                        {link.label}
                                        <ChevronDown size={12} className="transition-transform group-hover:rotate-180" />
                                        <span
                                            className={`absolute bottom-0 left-0 h-[2px] bg-nav-active transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                                        />
                                    </button>
                                    <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 absolute top-full left-0 pt-3 transition-all duration-200 z-50">
                                        <div className="w-40 bg-theme-surface border border-theme shadow-2xl py-2">
                                            {link.children.map((child) => (
                                                <button
                                                    key={child.id}
                                                    onClick={() => go(child.id)}
                                                    className={`w-full text-left px-3 py-2.5 text-[10px] font-black uppercase tracking-widest transition-colors ${
                                                        currentPage === child.id ? 'text-nav-link' : 'text-theme-primary hover:text-nav-link hover:bg-theme-surface-elevated'
                                                    }`}
                                                >
                                                    {child.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <button
                                key={link.id}
                                onClick={() => go(link.id)}
                                className="text-[10px] font-black uppercase tracking-[0.16em] transition-all relative group text-nav-link hover:text-nav-hover"
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {link.label}
                                <span
                                    className={`absolute -bottom-1 left-0 h-[2px] bg-nav-active transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                                />
                            </button>
                        );
                    })}

                    {/* Search Button */}
                    <button
                        onClick={() => { setSearchOpen(!searchOpen); setSearchQuery(''); setSearchResults([]); }}
                        className="p-2 rounded-md text-theme-muted hover:text-theme-primary hover:bg-theme-surface-elevated transition-all"
                        aria-label={t('common.search')}
                        title={t('common.search')}
                    >
                        <Search size={16} />
                    </button>

                    <button
                        onClick={() => go('contato')}
                        className="btn-primary text-[9px] px-4 py-2.5"
                    >
                        {t('nav.solicitarOrcamento')}
                    </button>
                </div>

                {/* Mobile controls */}
                <div className="lg:hidden flex items-center gap-1.5">
                    <button
                        onClick={() => { setSearchOpen(!searchOpen); setSearchQuery(''); setSearchResults([]); }}
                        className="p-2 rounded-md text-theme-muted hover:text-theme-primary transition-all"
                        aria-label={t('common.search')}
                    >
                        <Search size={20} />
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-md text-theme-muted hover:text-theme-primary transition-all"
                        aria-label={t('nav.theme.toggle')}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        className="p-2 rounded-md text-theme-primary"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label={menuOpen ? t('common.close') : t('common.open')}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Search Bar com resultados em tempo real */}
            {searchOpen && (
                <div ref={searchRef} className="absolute top-full left-0 w-full bg-theme-surface border-b border-theme py-4 px-4 animate-fade-in shadow-lg">
                    <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder={t('nav.search')}
                                className="w-full px-4 py-2 bg-theme-body border border-theme rounded-md text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-brand-main text-sm"
                                autoFocus
                            />
                            {/* Dropdown de resultados */}
                            {searchResults.length > 0 && (
                                <div className="absolute top-full left-0 w-full bg-theme-surface border border-theme rounded-b-md shadow-xl z-50 mt-1 overflow-hidden">
                                    {searchResults.map((product) => (
                                        <button
                                            key={product.id}
                                            type="button"
                                            onClick={() => go(categoryToPage(product.category), { type: 'product', id: product.id })}
                                            className="w-full text-left px-4 py-3 hover:bg-theme-surface-elevated transition-colors border-b border-theme last:border-0 flex items-center gap-3"
                                        >
                                            <div className="w-8 h-8 bg-white rounded flex items-center justify-center shrink-0">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-6 h-6 object-contain"
                                                    onError={(e) => { e.target.style.display = 'none'; }}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-theme-primary text-xs font-bold leading-tight">{product.name}</p>
                                                <p className="text-theme-muted text-[10px]">{product.category}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                            {searchQuery.length > 1 && searchResults.length === 0 && (
                                <div className="absolute top-full left-0 w-full bg-theme-surface border border-theme rounded-b-md shadow-xl z-50 mt-1 px-4 py-3">
                                    <p className="text-theme-muted text-xs">{t('nav.noSearchResults', { query: searchQuery })}</p>
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-brand-main text-brand-main-contrast font-bold text-sm uppercase tracking-wider rounded-md hover:bg-white transition-all"
                        >
                            {t('common.search')}
                        </button>
                        <button
                            type="button"
                            onClick={() => { setSearchOpen(false); setSearchQuery(''); setSearchResults([]); }}
                            className="px-3 py-2 text-theme-muted hover:text-theme-primary"
                            aria-label={t('common.close')}
                        >
                            <X size={20} />
                        </button>
                    </form>
                </div>
            )}

            {/* Menu mobile */}
            {menuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-theme-surface/95 backdrop-blur-md border-b border-theme py-6 px-6 flex flex-col gap-5 animate-slide-up max-h-[80vh] overflow-y-auto shadow-2xl">
                    {/* Language Toggle Mobile */}
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-theme-muted hover:text-theme-accent transition-colors"
                    >
                        <Globe size={14} />
                        {i18n.language === 'pt-BR' ? 'Português (PT)' : 'English (EN)'}
                        <span className="text-[9px] text-theme-muted">— {t('nav.language.toggle')}</span>
                    </button>

                    <hr className="border-theme" />

                    {navLinks.map((link) => {
                        const isProductLink = link.id === 'produtos';
                        const hasChildren = Array.isArray(link.children) && link.children.length > 0;
                        const isActive = isProductLink
                            ? productPages.includes(currentPage)
                            : currentPage === link.id || (hasChildren && link.children.some((c) => c.id === currentPage));

                        if (isProductLink) {
                            return (
                                <div key={link.id} className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => go(link.id)}
                                            className={`min-w-0 flex-1 text-left text-sm font-black uppercase tracking-widest border-l-4 pl-4 py-1 transition-all ${
                                                isActive
                                                    ? 'text-nav-link border-nav-active'
                                                    : 'text-nav-link border-transparent hover:border-nav-active hover:text-nav-hover'
                                            }`}
                                            aria-current={currentPage === link.id ? 'page' : undefined}
                                        >
                                            {link.label}
                                        </button>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-theme-muted">
                                            {t('nav.productMenu.mobileHint')}
                                        </span>
                                    </div>
                                    <div className="space-y-2">
                                        {productMenu.map((section) => (
                                            <MobileProductNode
                                                key={section.id}
                                                node={section}
                                                openNodes={mobileProductGroupsOpen}
                                                toggleNode={toggleMobileProductGroup}
                                                onNavigate={goMenuNode}
                                                t={t}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        if (hasChildren) {
                            return (
                                <div key={link.id} className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => { /* no direct nav for parent */ }}
                                            className={`min-w-0 flex-1 text-left text-sm font-black uppercase tracking-widest border-l-4 pl-4 py-1 transition-all ${
                                                isActive
                                                    ? 'text-nav-link border-nav-active'
                                                    : 'text-nav-link border-transparent hover:border-nav-active hover:text-nav-hover'
                                            }`}
                                            aria-current={isActive ? 'page' : undefined}
                                        >
                                            {link.label}
                                        </button>
                                        <span className="text-[9px] font-black uppercase tracking-widest text-theme-muted">&nbsp;</span>
                                    </div>
                                    <div className="space-y-2">
                                        {link.children.map((child) => (
                                            <button
                                                key={child.id}
                                                onClick={() => go(child.id)}
                                                className={`text-left text-sm font-black uppercase tracking-widest border-l-4 pl-8 py-1 transition-all ${
                                                    currentPage === child.id
                                                        ? 'text-nav-link border-nav-active'
                                                        : 'text-nav-link border-transparent hover:border-nav-active hover:text-nav-hover'
                                                }`}
                                            >
                                                {child.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <button
                                key={link.id}
                                onClick={() => go(link.id)}
                                className={`text-left text-sm font-black uppercase tracking-widest border-l-4 pl-4 py-1 transition-all ${
                                    isActive
                                        ? 'text-nav-link border-nav-active'
                                        : 'text-nav-link border-transparent hover:border-nav-active hover:text-nav-hover'
                                }`}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {link.label}
                            </button>
                        );
                    })}
                    <a
                        href={`tel:+5521967271871`}
                        className="flex items-center gap-2 text-theme-accent text-xs font-bold uppercase mt-2"
                    >
                        <Phone size={14} />
                        {COMPANY.phones[0]}
                    </a>
                    <button
                        onClick={() => go('contato')}
                        className="btn-primary text-[11px] px-5 py-3 text-center"
                    >
                        {t('nav.solicitarOrcamento')}
                    </button>
                </div>
            )}
        </nav>
    );
}
