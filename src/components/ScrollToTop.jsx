import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 left-6 z-40 flex items-center justify-center w-12 h-12 rounded-full bg-brand-main hover:bg-white text-brand-main-contrast hover:text-black shadow-lg hover:shadow-xl transition-all duration-300 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
            }`}
            aria-label={t('common.scrollToTop')}
            title={t('common.scrollToTop')}
        >
            <ArrowUp size={20} />
        </button>
    );
}
