import React from 'react';
import { FileText, Info, ShieldCheck } from 'lucide-react';

function SpecTable({ section }) {
    // Se a tabela tiver muitas colunas (por exemplo, mais de 4), forçamos whitespace-nowrap
    // para garantir que os dados de dimensões mecânicas não quebrem linha e fiquem fáceis de ler
    const isLargeTable = section.columns && section.columns.length > 4;

    return (
        <div className="overflow-x-auto border border-theme bg-theme-card">
            <table className="min-w-full text-left text-xs">
                <thead className="bg-theme-surface-elevated">
                    <tr>
                        {section.columns.map((column) => (
                            <th
                                key={column}
                                scope="col"
                                className={`px-4 py-3 text-[10px] font-black uppercase tracking-widest text-theme-muted ${
                                    isLargeTable ? 'whitespace-nowrap' : ''
                                }`}
                            >
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {section.rows.map((row, rowIndex) => (
                        <tr key={`${section.title}-${rowIndex}`} className="border-t border-theme">
                            {section.columns.map((_, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className={`px-4 py-3 align-top leading-relaxed ${
                                        cellIndex === 0
                                            ? 'font-bold text-theme-primary'
                                            : 'text-theme-secondary'
                                    } ${isLargeTable ? 'whitespace-nowrap' : ''}`}
                                >
                                    {row[cellIndex] || '-'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function SpecList({ section }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {section.items.map((item) => (
                <div key={item} className="flex items-start gap-3 border border-theme bg-theme-card px-4 py-3">
                    <ShieldCheck size={13} className="mt-0.5 shrink-0 text-brand-main" />
                    <p className="text-xs leading-relaxed text-theme-secondary">{item}</p>
                </div>
            ))}
        </div>
    );
}

export default function ProductTechnicalSpecs({ technicalSpecs, catalogHref }) {
    if (!technicalSpecs) return null;

    return (
        <section className="mt-14 border-t border-theme pt-10">
            <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="mb-3 flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.35em] text-theme-muted">
                        <span className="h-px w-5 bg-theme-border" />
                        Dados técnicos completos
                    </p>
                    <h2 className="text-xl font-black tracking-tight text-theme-primary md:text-2xl">
                        Especificações técnicas do produto
                    </h2>
                </div>
                {catalogHref && (
                    <a
                        href={catalogHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-brand-main/40 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-brand-main transition-colors hover:border-brand-main hover:bg-brand-main/5"
                    >
                        <FileText size={13} />
                        Abrir catálogo PDF
                    </a>
                )}
            </div>

            <div className="space-y-8">
                {technicalSpecs.sections.map((section) => (
                    <div key={section.title}>
                        <h3 className="mb-3 text-[11px] font-black uppercase tracking-widest text-theme-primary">
                            {section.title}
                        </h3>
                        {section.rows?.length > 0 && section.columns?.length > 0 && <SpecTable section={section} />}
                        {section.items?.length > 0 && <SpecList section={section} />}
                    </div>
                ))}
                      {/* Imagens Técnicas e Desenhos Mecânicos */}
            {(technicalSpecs.hasMechanicalDrawings || 
              technicalSpecs.hasEacDrawings || 
              technicalSpecs.hasBanheiroDrawings || 
              technicalSpecs.hasChurrasqueiraDrawings) && (
                <div className="mt-8 border-t border-theme pt-8">
                    <h3 className="mb-4 text-[11px] font-black uppercase tracking-widest text-theme-primary">
                        Desenhos Técnicos e Dimensional (mm)
                    </h3>
                    
                    {technicalSpecs.hasMechanicalDrawings && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-sm border border-theme">
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Tabela de Medidas e Dimensões</span>
                                <img 
                                    src="/assets/img/produtos/ext_centrifugo_medidas.jpg" 
                                    alt="Dimensões do Exaustor Centrífugo" 
                                    className="max-w-full h-auto object-contain"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Posições de Descarga e Rotação</span>
                                <img 
                                    src="/assets/img/produtos/ext_centrifugo_posicoes.jpg" 
                                    alt="Posições de Descarga Exaustor Centrífugo" 
                                    className="max-w-full h-auto object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    )}

                    {technicalSpecs.hasEacDrawings && (
                        <div className="flex flex-col items-center bg-white p-6 rounded-sm border border-theme">
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Dimensões do Exaustor Móvel EAC 2MN</span>
                            <img 
                                src="/assets/img/produtos/eac_medidas.jpg" 
                                alt="Dimensões do Exaustor Móvel EAC 2MN" 
                                className="max-w-md w-full h-auto object-contain"
                                loading="lazy"
                            />
                        </div>
                    )}

                    {technicalSpecs.hasBanheiroDrawings && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-sm border border-theme">
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Tabela de Medidas e Recorte</span>
                                <img 
                                    src="/assets/img/produtos/ex_banh_desenho.jpg" 
                                    alt="Medidas e Recorte de Exaustor de Banheiro" 
                                    className="max-w-full h-auto object-contain"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Desenho Dimensional do Exaustor</span>
                                <img 
                                    src="/assets/img/produtos/ex_banh_ea_desenho.jpg" 
                                    alt="Dimensional do Exaustor de Banheiro" 
                                    className="max-w-full h-auto object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    )}

                    {technicalSpecs.hasChurrasqueiraDrawings && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-sm border border-theme">
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Dimensões do Exaustor de Churrasqueira</span>
                                <img 
                                    src="/assets/img/produtos/ex_churrasqueira_vesper_medidas.jpg" 
                                    alt="Dimensões do Exaustor de Churrasqueira" 
                                    className="max-w-full h-auto object-contain"
                                    loading="lazy"
                                />
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-3">Formas de Utilização e Esquema</span>
                                <img 
                                    src="/assets/img/produtos/ex_churrasqueira_vesper_esquema.jpg" 
                                    alt="Esquema de Instalação do Exaustor de Churrasqueira" 
                                    className="max-w-full h-auto object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>

            <div className="mt-6 flex flex-col gap-2 border border-theme bg-theme-surface px-4 py-4 text-[11px] leading-relaxed text-theme-muted md:flex-row md:items-center md:justify-between">
                <span className="flex items-start gap-2">
                    <Info size={13} className="mt-0.5 shrink-0 text-brand-main" />
                    {technicalSpecs.note}
                </span>
                {technicalSpecs.sourceLabel && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-theme-muted">
                        {String(technicalSpecs.sourceLabel).includes('Site antigo')
                            ? 'Especificações técnicas Vesper'
                            : technicalSpecs.sourceLabel}
                    </span>
                )}
            </div>
        </section>
    );
}
