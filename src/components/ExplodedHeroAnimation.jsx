import React from 'react';

/**
 * ExplodedHeroAnimation
 * Vista explodida animada do Exaustor Vesper Super Portátil — pure CSS + SVG.
 * Loop de 9s: Montado → Explodir → Pausar → Montar → Pausar
 */
export default function ExplodedHeroAnimation() {
    return (
        <div className="relative w-full h-full flex items-center justify-center select-none" aria-hidden="true">
            <style>{`
                /* ── LOOP PRINCIPAL: 9s ─────────────────────────────── */
                /* Fase 0-15%: montado | 25-60%: explodido | 75-100%: montado */

                @keyframes explodeGuard {
                    0%,12%   { transform: translateX(0px)   translateY(0px);   opacity:1; }
                    28%,62%  { transform: translateX(-240px) translateY(12px);  opacity:1; }
                    78%,100% { transform: translateX(0px)   translateY(0px);   opacity:1; }
                }
                @keyframes explodeImpeller {
                    0%,12%   { transform: translateX(0px)   translateY(0px);   opacity:1; }
                    28%,62%  { transform: translateX(-120px) translateY(6px);  opacity:1; }
                    78%,100% { transform: translateX(0px)   translateY(0px);   opacity:1; }
                }
                @keyframes explodeMotor {
                    0%,12%   { transform: translateX(0px)  translateY(0px);    opacity:1; }
                    28%,62%  { transform: translateX(0px)  translateY(0px);    opacity:1; }
                    78%,100% { transform: translateX(0px)  translateY(0px);    opacity:1; }
                }
                @keyframes explodeHousing {
                    0%,12%   { transform: translateX(0px)  translateY(0px);    opacity:1; }
                    28%,62%  { transform: translateX(140px) translateY(0px);   opacity:1; }
                    78%,100% { transform: translateX(0px)  translateY(0px);    opacity:1; }
                }
                @keyframes explodeCtrlBox {
                    0%,12%   { transform: translateX(0px)  translateY(0px);    opacity:0; }
                    28%,62%  { transform: translateX(60px)  translateY(-130px); opacity:1; }
                    78%,100% { transform: translateX(0px)  translateY(0px);    opacity:0; }
                }
                @keyframes explodeBell {
                    0%,12%   { transform: translateX(0px)  translateY(0px);    opacity:1; }
                    28%,62%  { transform: translateX(240px) translateY(-8px);  opacity:1; }
                    78%,100% { transform: translateX(0px)  translateY(0px);    opacity:1; }
                }
                @keyframes explodeScrews {
                    0%,12%   { opacity:0; transform:scale(0.5); }
                    28%,62%  { opacity:1; transform:scale(1); }
                    78%,100% { opacity:0; transform:scale(0.5); }
                }
                @keyframes calloutLines {
                    0%,20%   { opacity:0; }
                    35%,58%  { opacity:1; }
                    72%,100% { opacity:0; }
                }
                @keyframes calloutNums {
                    0%,30%   { opacity:0; transform:scale(0.5); }
                    40%,55%  { opacity:1; transform:scale(1); }
                    68%,100% { opacity:0; transform:scale(0.5); }
                }
                /* Rotação lenta da grade quando montado */
                @keyframes spinGuard {
                    0%     { transform: rotate(0deg); }
                    100%   { transform: rotate(360deg); }
                }
                .anim-guard    { animation: explodeGuard    9s cubic-bezier(.65,0,.35,1) infinite; }
                .anim-impeller { animation: explodeImpeller 9s cubic-bezier(.65,0,.35,1) infinite; }
                .anim-motor    { animation: explodeMotor    9s cubic-bezier(.65,0,.35,1) infinite; }
                .anim-housing  { animation: explodeHousing  9s cubic-bezier(.65,0,.35,1) infinite; }
                .anim-ctrlbox  { animation: explodeCtrlBox  9s cubic-bezier(.65,0,.35,1) infinite; }
                .anim-bell     { animation: explodeBell     9s cubic-bezier(.65,0,.35,1) infinite; }
                .anim-screws   { animation: explodeScrews   9s ease-in-out infinite; }
                .anim-lines    { animation: calloutLines    9s ease-in-out infinite; }
                .anim-nums     { animation: calloutNums     9s ease-in-out infinite; }
                .spin-guard    { animation: spinGuard       12s linear infinite; transform-origin: center; transform-box: fill-box; }
            `}</style>

            <svg
                viewBox="0 0 720 380"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* ── Fundo: grade de pontos ── */}
                <defs>
                    <pattern id="dotgrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                        <circle cx="1" cy="1" r="1" fill="#DBA800" opacity="0.12" />
                    </pattern>
                    {/* Gradiente do housing */}
                    <linearGradient id="housingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#C5A028" />
                        <stop offset="50%" stopColor="#8B6914" />
                        <stop offset="100%" stopColor="#5c440d" />
                    </linearGradient>
                    {/* Gradiente do motor */}
                    <linearGradient id="motorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2a5c38" />
                        <stop offset="100%" stopColor="#1a3922" />
                    </linearGradient>
                    {/* Gradiente da grade */}
                    <radialGradient id="guardGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="60%" stopColor="#DBA800" stopOpacity="0" />
                        <stop offset="100%" stopColor="#DBA800" stopOpacity="0.08" />
                    </radialGradient>
                    {/* Sombra/glow dourado */}
                    <filter id="goldGlow">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="softGlow">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>

                <rect width="720" height="380" fill="url(#dotgrid)" />

                {/* ── Eixo central (linha de referência) ── */}
                <line x1="20" y1="188" x2="700" y2="188"
                    stroke="#DBA800" strokeWidth="0.5" strokeDasharray="6 6" opacity="0.2" />

                {/* ══════════════════════════════════════════════════════
                    COMPONENTE: BELL / TAMPA TRASEIRA
                    Posição assemblada: x≈440 (atrás do housing)
                ════════════════════════════════════════════════════════ */}
                <g className="anim-bell" style={{ transformOrigin: '440px 188px', transformBox: 'fill-box' }}>
                    {/* Flange oval (tampa traseira) */}
                    <ellipse cx="448" cy="188" rx="22" ry="60" fill="#6a5010" stroke="#DBA800" strokeWidth="1.5" opacity="0.9" />
                    <ellipse cx="442" cy="188" rx="18" ry="52" fill="#4a3a0c" stroke="#DBA800" strokeWidth="1" opacity="0.8" />
                    {/* Furos de parafuso */}
                    {[0,1,2,3].map(i => {
                        const angle = (i * 90 + 45) * Math.PI / 180;
                        return <circle key={i}
                            cx={448 + 42 * Math.cos(angle)}
                            cy={188 + 42 * Math.sin(angle)}
                            r="4" fill="#1a1a1a" stroke="#DBA800" strokeWidth="1" />;
                    })}
                </g>

                {/* ══════════════════════════════════════════════════════
                    COMPONENTE: HOUSING (corpo cilíndrico principal)
                    Centro montado: x=340
                ════════════════════════════════════════════════════════ */}
                <g className="anim-housing" style={{ transformOrigin: '340px 188px', transformBox: 'fill-box' }}>
                    {/* Corpo cilíndrico — vista lateral */}
                    {/* Face superior (illusion 3D) */}
                    <path d="M245,148 L435,148 Q445,148 448,155 L448,160 Q435,153 245,153 Z"
                        fill="#c5a028" opacity="0.9" />
                    {/* Corpo lateral */}
                    <rect x="245" y="153" width="200" height="70" fill="url(#housingGrad)" />
                    {/* Faixas de reforço */}
                    {[265, 315, 365, 415].map(x => (
                        <rect key={x} x={x} y="153" width="6" height="70"
                            fill="#DBA800" opacity="0.25" />
                    ))}
                    {/* Face inferior */}
                    <path d="M245,223 L435,223 L448,228 Q435,230 245,230 Z"
                        fill="#5c440d" opacity="0.9" />
                    {/* Flange dianteira (anel) */}
                    <ellipse cx="245" cy="188" rx="14" ry="40" fill="#A88820" stroke="#DBA800" strokeWidth="1.5" />
                    {/* Parafusos do flange */}
                    {[0,1,2,3,4,5].map(i => {
                        const angle = (i * 60) * Math.PI / 180;
                        return <circle key={i}
                            cx={245 + 30 * Math.cos(angle)}
                            cy={188 + 30 * Math.sin(angle)}
                            r="3" fill="#1a1a1a" stroke="#DBA800" strokeWidth="1" />;
                    })}
                    {/* Plaqueta Vesper */}
                    <rect x="295" y="168" width="60" height="24" rx="2" fill="#C11818" opacity="0.85" />
                    <text x="325" y="184" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Inter,sans-serif">VESPER</text>
                </g>

                {/* ══════════════════════════════════════════════════════
                    COMPONENTE: MOTOR EX
                    Centro montado: x=320, fica no centro
                ════════════════════════════════════════════════════════ */}
                <g className="anim-motor" style={{ transformOrigin: '330px 188px', transformBox: 'fill-box' }}>
                    {/* Corpo do motor */}
                    <ellipse cx="350" cy="170" rx="16" ry="38" fill="#2a5c38" stroke="#1a3922" strokeWidth="1" />
                    <rect x="230" y="150" width="120" height="76" fill="url(#motorGrad)" />
                    <ellipse cx="230" cy="188" rx="16" ry="38" fill="#1a3922" stroke="#2a5c38" strokeWidth="1.5" />
                    {/* Faixas do motor */}
                    {[250, 275, 300, 325].map(x => (
                        <rect key={x} x={x} y="150" width="4" height="76"
                            fill="#1a3922" opacity="0.6" />
                    ))}
                    {/* Badge EX */}
                    <rect x="268" y="170" width="30" height="16" rx="2" fill="#DBA800" />
                    <text x="283" y="182" textAnchor="middle" fill="black" fontSize="9" fontWeight="black" fontFamily="Inter,sans-serif">EX</text>
                    {/* Eixo do motor (shaft) */}
                    <rect x="208" y="185" width="24" height="6" rx="3" fill="#888" />
                </g>

                {/* ══════════════════════════════════════════════════════
                    COMPONENTE: IMPELLER (rotor / hélice)
                    Centro montado: ~x=215
                ════════════════════════════════════════════════════════ */}
                <g className="anim-impeller" style={{ transformOrigin: '215px 188px', transformBox: 'fill-box' }}>
                    {/* 6 pás do impelidor */}
                    {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                        const rad = deg * Math.PI / 180;
                        const cx = 215, cy = 188;
                        const innerR = 20, outerR = 60;
                        const w = 14;
                        const x1 = cx + innerR * Math.cos(rad) - w / 2 * Math.sin(rad);
                        const y1 = cy + innerR * Math.sin(rad) + w / 2 * Math.cos(rad);
                        const x2 = cx + innerR * Math.cos(rad) + w / 2 * Math.sin(rad);
                        const y2 = cy + innerR * Math.sin(rad) - w / 2 * Math.cos(rad);
                        const x3 = cx + outerR * Math.cos(rad) + w / 2 * Math.sin(rad);
                        const y3 = cy + outerR * Math.sin(rad) - w / 2 * Math.cos(rad);
                        const x4 = cx + outerR * Math.cos(rad) - w / 2 * Math.sin(rad);
                        const y4 = cy + outerR * Math.sin(rad) + w / 2 * Math.cos(rad);
                        return <polygon key={i}
                            points={`${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`}
                            fill={i % 2 === 0 ? '#1a1a1a' : '#2a2a2a'}
                            stroke="#DBA800" strokeWidth="0.8" opacity="0.95" />;
                    })}
                    {/* Hub central */}
                    <circle cx="215" cy="188" r="18" fill="#C11818" />
                    <circle cx="215" cy="188" r="10" fill="#900000" />
                    <circle cx="215" cy="188" r="4" fill="#DBA800" />
                </g>

                {/* ══════════════════════════════════════════════════════
                    COMPONENTE: GRADE FRONTAL (o ícone da Vesper)
                    Centro montado: ~x=200
                ════════════════════════════════════════════════════════ */}
                <g className="anim-guard" style={{ transformOrigin: '200px 188px', transformBox: 'fill-box' }}>
                    {/* Anel externo + preenchimento radial */}
                    <circle cx="200" cy="188" r="78" fill="url(#guardGrad)" />
                    <circle cx="200" cy="188" r="78" fill="none" stroke="#DBA800" strokeWidth="4" />

                    {/* Barras radiais (8) com rotação lenta quando montado */}
                    <g className="spin-guard">
                        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5].map((deg, i) => {
                            const rad = deg * Math.PI / 180;
                            return <line key={i}
                                x1={200 + 22 * Math.cos(rad)} y1={188 + 22 * Math.sin(rad)}
                                x2={200 + 72 * Math.cos(rad)} y2={188 + 72 * Math.sin(rad)}
                                stroke="#DBA800" strokeWidth="3.5" strokeLinecap="round" opacity="0.9" />;
                        })}
                    </g>

                    {/* Anéis concêntricos */}
                    <circle cx="200" cy="188" r="58" fill="none" stroke="#DBA800" strokeWidth="1.5" opacity="0.6" />
                    <circle cx="200" cy="188" r="40" fill="none" stroke="#DBA800" strokeWidth="1.5" opacity="0.5" />
                    <circle cx="200" cy="188" r="22" fill="none" stroke="#DBA800" strokeWidth="2" opacity="0.7" />

                    {/* Hub central */}
                    <circle cx="200" cy="188" r="14" fill="#C11818" />
                    <circle cx="200" cy="188" r="7" fill="#900000" />
                    <circle cx="200" cy="188" r="3" fill="#DBA800" />

                    {/* Anel externo duplo (efeito de profundidade) */}
                    <circle cx="200" cy="188" r="75" fill="none" stroke="#DBA800" strokeWidth="1" opacity="0.3" />
                </g>

                {/* ══════════════════════════════════════════════════════
                    COMPONENTE: CAIXA DE LIGAÇÃO (control box) — flutua
                ════════════════════════════════════════════════════════ */}
                <g className="anim-ctrlbox" style={{ transformOrigin: '340px 160px', transformBox: 'fill-box' }}>
                    <rect x="295" y="120" width="70" height="50" rx="3"
                        fill="#1a1a1a" stroke="#DBA800" strokeWidth="1.5" />
                    {/* Tampa */}
                    <rect x="299" y="124" width="62" height="42" rx="2"
                        fill="#111" stroke="#444" strokeWidth="0.5" />
                    {/* Parafusos da tampa */}
                    {[[300,126],[360,126],[300,160],[360,160]].map(([x,y],i) => (
                        <circle key={i} cx={x} cy={y} r="3" fill="#444" stroke="#DBA800" strokeWidth="0.5" />
                    ))}
                    {/* Badge EX amarelo */}
                    <rect x="310" y="135" width="26" height="14" rx="2" fill="#DBA800" />
                    <text x="323" y="146" textAnchor="middle" fill="black" fontSize="8" fontWeight="black" fontFamily="Inter,sans-serif">EX</text>
                    {/* Prensa-cabos */}
                    <rect x="318" y="168" width="12" height="8" rx="2" fill="#555" stroke="#888" strokeWidth="0.5" />
                    {/* Cabo de conexão */}
                    <path d="M324,176 C324,190 310,195 295,188"
                        fill="none" stroke="#555" strokeWidth="3" strokeLinecap="round" />
                </g>

                {/* ══════════════════════════════════════════════════════
                    PARAFUSOS (visíveis apenas no estado explodido)
                ════════════════════════════════════════════════════════ */}
                <g className="anim-screws">
                    {/* Parafusos entre housing e bell */}
                    {[170, 205].map((y, i) => (
                        <g key={i} transform={`translate(450, ${y})`}>
                            <rect x="-4" y="-2" width="16" height="4" rx="1" fill="#888" stroke="#DBA800" strokeWidth="0.5" />
                            <line x1="-1" y1="-2" x2="-1" y2="2" stroke="#555" strokeWidth="1" />
                        </g>
                    ))}
                    {/* Parafusos entre motor e housing */}
                    {[168, 188, 208].map((y, i) => (
                        <g key={`m${i}`} transform={`translate(230, ${y})`}>
                            <rect x="-4" y="-2" width="16" height="4" rx="1" fill="#888" stroke="#DBA800" strokeWidth="0.5" />
                        </g>
                    ))}
                    {/* Parafusos da grade (borboletas) */}
                    {[148, 228].map((y, i) => (
                        <g key={`g${i}`} transform={`translate(140, ${y})`}>
                            <circle cx="0" cy="0" r="5" fill="#888" stroke="#DBA800" strokeWidth="0.8" />
                            <text x="0" y="4" textAnchor="middle" fill="#DBA800" fontSize="6" fontFamily="monospace">×</text>
                        </g>
                    ))}
                </g>

                {/* ══════════════════════════════════════════════════════
                    LINHAS DE CHAMADA (callout lines do desenho técnico)
                ════════════════════════════════════════════════════════ */}
                <g className="anim-lines" fill="none" stroke="#DBA800" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.7">
                    {/* Linha da grade */}
                    <line x1="-40" y1="130" x2="128" y2="130" />
                    <line x1="128" y1="130" x2="200" y2="150" />
                    {/* Linha do impelidor */}
                    <line x1="90" y1="115" x2="160" y2="115" />
                    <line x1="160" y1="115" x2="215" y2="148" />
                    {/* Linha do motor */}
                    <line x1="280" y1="98" x2="310" y2="98" />
                    <line x1="310" y1="98" x2="300" y2="150" />
                    {/* Linha do housing */}
                    <line x1="480" y1="112" x2="440" y2="112" />
                    <line x1="440" y1="112" x2="390" y2="148" />
                    {/* Linha da bell */}
                    <line x1="620" y1="140" x2="585" y2="140" />
                    <line x1="585" y1="140" x2="455" y2="168" />
                    {/* Linha caixa ligação */}
                    <line x1="400" y1="68" x2="370" y2="68" />
                    <line x1="370" y1="68" x2="360" y2="118" />
                </g>

                {/* ══════════════════════════════════════════════════════
                    NÚMEROS DAS PEÇAS (callout circles)
                ════════════════════════════════════════════════════════ */}
                <g className="anim-nums">
                    {[
                        { x: -48, y: 130, n: '2',  label: 'Grade' },
                        { x: 82,  y: 115, n: '11', label: 'Impelidor' },
                        { x: 272, y: 98,  n: '22', label: 'Motor EX' },
                        { x: 488, y: 112, n: '12', label: 'Corpo' },
                        { x: 628, y: 140, n: '24', label: 'Tampa' },
                        { x: 408, y: 68,  n: '14', label: 'Cx. Ligação' },
                    ].map(({ x, y, n, label }) => (
                        <g key={n} transform={`translate(${x}, ${y})`}>
                            <circle cx="0" cy="0" r="14" fill="#0A0A0A" stroke="#DBA800" strokeWidth="1.5" />
                            <text x="0" y="5" textAnchor="middle" fill="#DBA800"
                                fontSize="10" fontWeight="bold" fontFamily="Inter,sans-serif">{n}</text>
                            {/* Label abaixo */}
                            <text x="0" y="26" textAnchor="middle" fill="#DBA800"
                                fontSize="7" fontFamily="Inter,sans-serif" opacity="0.7">{label}</text>
                        </g>
                    ))}
                </g>

                {/* ── Título do desenho técnico (canto inferior direito) ── */}
                <g opacity="0.35">
                    <rect x="490" y="335" width="220" height="36" fill="none" stroke="#DBA800" strokeWidth="0.5" />
                    <line x1="490" y1="348" x2="710" y2="348" stroke="#DBA800" strokeWidth="0.5" />
                    <text x="600" y="345" textAnchor="middle" fill="#DBA800"
                        fontSize="7" fontFamily="Inter,sans-serif" fontWeight="bold">VESPER IND. E COM.</text>
                    <text x="600" y="364" textAnchor="middle" fill="#DBA800"
                        fontSize="6" fontFamily="Inter,sans-serif">SUPER PORTÁTIL 3PE 400e T2 — VISTA EXPLODIDA</text>
                </g>

                {/* ── Glow central (efeito de luz) ── */}
                <ellipse cx="330" cy="188" rx="120" ry="60" fill="#DBA800" opacity="0.03" />
            </svg>
        </div>
    );
}
