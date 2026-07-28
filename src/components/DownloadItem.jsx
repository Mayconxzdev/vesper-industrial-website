import React from 'react';
import { ChevronRight, FileText, ExternalLink } from 'lucide-react';

export default function DownloadItem({ item, navigateTo }) {
    const isExternal = item.external || item.href?.startsWith('http');
    const isPdf = item.type === 'pdf';

    if (item.page && navigateTo) {
        return (
            <li className="flex items-center gap-3 py-2 border-b border-theme group">
                <ChevronRight size={12} className="text-brand-main shrink-0" />
                <button
                    type="button"
                    onClick={() => navigateTo(item.page)}
                    className="text-left text-xs font-medium text-theme-muted hover:text-brand-main transition-colors flex items-center gap-1 flex-1"
                >
                    {item.name}
                    {item.tag && (
                        <span className="text-[8px] bg-brand-sub text-slate-200 px-1.5 py-0.5 font-black uppercase">
                            {item.tag}
                        </span>
                    )}
                </button>
            </li>
        );
    }

    if (!item.href) {
        return (
            <li className="flex items-center gap-3 py-2 border-b border-theme text-theme-muted text-xs font-medium">
                <ChevronRight size={12} className="text-theme-muted shrink-0" />
                <span>{item.name}</span>
            </li>
        );
    }

    return (
        <li className="flex items-center gap-3 py-2 border-b border-theme group">
            <FileText size={12} className="text-brand-sub shrink-0" />
            <a
                href={item.href}
                target={isPdf || isExternal ? '_blank' : '_self'}
                rel={isPdf || isExternal ? 'noopener noreferrer' : undefined}
                className="text-xs font-medium text-theme-muted hover:text-brand-main transition-colors flex items-center gap-1 flex-1"
            >
                {item.name}
                {item.tag && (
                    <span className="text-[8px] bg-brand-sub text-slate-200 px-1.5 py-0.5 font-black uppercase ml-1">
                        {item.tag}
                    </span>
                )}
                {isPdf && (
                    <span className="text-[9px] text-brand-sub font-bold ml-1">(PDF)</span>
                )}
                {isExternal && <ExternalLink size={10} className="opacity-40" />}
            </a>
        </li>
    );
}
