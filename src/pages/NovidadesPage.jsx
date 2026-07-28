import React from 'react';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../components/Breadcrumb.jsx';
import InnerPageHero from '../components/InnerPageHero.jsx';
import { COMPANY } from '../data/company.js';
import { Newspaper, ExternalLink, Facebook, Instagram, Linkedin, Link, Tag, Calendar, Globe, Award } from 'lucide-react';

const SOCIAL_LINKS = [
    {
        label: 'Facebook',
        href: 'https://www.facebook.com/profile.php?id=100001488083490',
        icon: <Facebook size={18} />,
        color: '#1877F2',
    },
    {
        label: 'Instagram',
        href: 'https://instagram.com/vesper.ind.br',
        icon: <Instagram size={18} />,
        color: '#E4405F',
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/vesper-equipamentos-e-a645a2360/',
        icon: <Linkedin size={18} />,
        color: '#0A66C2',
    },
    {
        label: 'Linktree',
        href: 'https://linktr.ee/vesper.ind.br',
        icon: <Link size={18} />,
        color: '#39E09B',
    },
];

const POST_META = [
    {
        id: 1,
        image: null,
        icon: <Newspaper size={32} className="text-brand-main" />,
    },
    {
        id: 2,
        image: 'https://www.vesper.ind.br/posts/850.png',
    },
    {
        id: 3,
        image: null,
        icon: <Tag size={32} className="text-brand-main" />,
    },
    {
        id: 4,
        image: null,
        icon: <Award size={32} className="text-brand-main" />,
    },
    {
        id: 5,
        image: null,
        icon: <Globe size={32} className="text-brand-main" />,
    },
];

const TAG_COLORS = {
    2: 'text-brand-main border-brand-main/30 bg-brand-main/5',
    4: 'text-brand-sub border-brand-sub/30 bg-brand-sub/5',
    5: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
};

export default function NovidadesPage({ navigateTo }) {
    const { t } = useTranslation();
    const posts = t('newsPage.posts', { returnObjects: true }).map((post, index) => ({
        ...POST_META[index],
        ...post,
    }));

    return (
        <div>
            <Breadcrumb navigateTo={navigateTo} items={[{ label: t('nav.novidades') }]} />

            <InnerPageHero
                badge={t('newsPage.hero.badge')}
                title={t('newsPage.hero.title')}
                titleHighlight="Vesper"
                subtitle={t('newsPage.hero.subtitle')}
            />

            <div className="max-w-5xl mx-auto px-4 py-16">

                {/* Redes Sociais */}
                <div className="bg-theme-surface border border-theme p-8 mb-14">
                    <p className="text-theme-primary text-xs font-bold uppercase tracking-widest mb-6">
                        {t('newsPage.social')}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {SOCIAL_LINKS.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 border border-theme px-5 py-3 text-theme-muted hover:text-theme-primary hover:border-theme-hover transition-all text-xs font-bold uppercase tracking-widest hover:bg-theme-surface-elevated"
                            >
                                <span style={{ color: s.color }}>{s.icon}</span>
                                {s.label}
                                <ExternalLink size={10} className="opacity-40" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Posts */}
                <h2 className="text-sm font-black text-theme-muted uppercase tracking-[0.3em] mb-10 flex items-center gap-4">
                    <span className="w-8 h-[2px] bg-brand-main" /> {t('newsPage.recent')}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-theme-card border border-theme hover:border-brand-main/25 transition-all overflow-hidden group">
                            <div className="h-56 overflow-hidden bg-theme-surface flex items-center justify-center">
                                {post.image ? (
                                    <img
                                        src={post.image}
                                        alt={post.alt}
                                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                                        loading="lazy"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center gap-3 opacity-60">
                                        {post.icon}
                                        <span className="text-theme-muted text-xs uppercase tracking-widest font-bold">{post.tag}</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border ${TAG_COLORS[post.id] || 'text-theme-muted border-theme'}`}>
                                        {post.tag}
                                    </span>
                                    <span className="text-theme-muted text-[10px] flex items-center gap-1">
                                        <Calendar size={10} /> {post.date}
                                    </span>
                                </div>
                                <h3 className="text-theme-primary font-black uppercase tracking-tighter text-base mb-2">
                                    {post.title}
                                </h3>
                                <p className="text-theme-muted text-xs font-medium leading-relaxed mb-3">
                                    {post.desc}
                                </p>
                                {post.note && (
                                    <span className="text-[10px] text-theme-muted/60 font-bold italic">
                                        {post.note}
                                    </span>
                                )}
                                <div className="flex gap-3 mt-4 pt-4 border-t border-theme">
                                    {SOCIAL_LINKS.map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="transition-all hover:opacity-80 hover:scale-110"
                                            aria-label={t('newsPage.share', { network: s.label })}
                                            style={{ color: s.color }}
                                        >
                                            {s.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 bg-theme-surface border border-theme p-8 text-center">
                    <p className="text-theme-secondary text-sm font-medium mb-6">
                        {t('newsPage.cta.description')}
                    </p>
                    <button
                        onClick={() => navigateTo('downloads')}
                        className="bg-brand-main hover:bg-white text-brand-main-contrast hover:text-black font-black py-3 px-8 uppercase tracking-widest transition-all text-xs shadow-md shadow-[#DBA800]/20"
                    >
                        {t('newsPage.cta.button')}
                    </button>
                </div>
            </div>
        </div>
    );
}
