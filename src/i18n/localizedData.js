const CATEGORY_EN = {
    ventiladores: 'Fans',
    exaustores: 'Exhausters',
    insufladores: 'Air supply systems',
    locacao: 'Rental',
};

const PRODUCT_EN = {
    'ventilador-v500': {
        name: 'V500 Fan',
        subtitle: '50 and 60 cm - Commercial, fixed and oscillating',
        description: 'Commercial Vesper fan. Robust, quiet and efficient for stores, offices, schools and small warehouses.',
    },
    'ventilador-2410': {
        name: '2410 Fan',
        subtitle: '60 cm - Commercial - Normal or Turbo',
        description: 'Commercial oscillating or fixed fan, available in Normal and Turbo versions for stores, churches, halls and medium commercial spaces.',
    },
    'ventilador-1101': {
        name: '1101 Fan',
        subtitle: '70 cm - Commercial - Normal or Turbo',
        description: '70 cm oscillating fan in Normal and Turbo versions. Suitable for commercial use and rental in warehouses, fairs and events.',
    },
    'ventilador-8803': {
        name: '8803 Fan',
        subtitle: '88 cm - Fixed industrial - New',
        description: 'New fixed 88 cm industrial fan. Robust and powerful for demanding industrial environments.',
    },
    'ventilador-8813': {
        name: '8813 Fan',
        subtitle: '88 cm - Industrial - Fixed or oscillating - New',
        description: 'New 88 cm industrial fan available fixed or oscillating. Built for severe environments and continuous operation.',
    },
    'ventilador-8800': {
        name: '8800 Fan',
        subtitle: '88 cm - Super industrial - Fixed only',
        description: 'Super industrial 8800 fan with all-metal structure and steel/bronze gears. Long service life for 24-hour operation in harsh environments.',
    },
    'ventilador-super-1000': {
        name: 'Super 1000 Fan',
        subtitle: '100 cm - Super industrial - Fixed only',
        description: 'Largest model in the standard Vesper fan line. Ideal for large warehouses, factories and loading areas.',
    },
    'ventiladores-ex': {
        name: 'Explosion-Proof Fans',
        subtitle: '45, 60 and 80 cm - INMETRO certified',
        description: 'INMETRO certified fans for hazardous locations with explosive atmospheres. Suitable for flammable gases, vapors and combustible dust groups.',
    },
    'ventiladores-vic': {
        name: 'VIC Industrial Fans',
        subtitle: '70, 100 or 150 cm - Fixed or mobile with wheels',
        description: 'Large industrial fans with mobile wheeled support for spot ventilation in warehouses, construction sites and industrial environments.',
    },
    'ventiladores-vic-ex': {
        name: 'VIC EX Industrial Fan',
        subtitle: '70, 100 or 150 cm - Mobile support for hazardous locations',
        description: 'EX version of the VIC industrial fan for hazardous location applications, keeping the mobile wheeled support and high airflow of the VIC line.',
    },
    'ventiladores-vic-aspersao': {
        name: 'VIC Fan with Misting System',
        subtitle: '100 or 150 cm - Mobile support with ultra-fine mist',
        description: 'VIC industrial fan with optional misting system. The atomized water mist absorbs heat from the air and creates a safe cooling zone for large areas.',
    },
    'exaustores-ex': {
        name: 'Explosion-Proof Exhausters',
        subtitle: '20 to 100 cm - INMETRO 115:2022 certified',
        description: 'INMETRO certified axial exhausters for hazardous locations, flammable substances, vapors, dust and fibers. Also available in stainless steel for offshore environments.',
    },
    'exaustores-super-portatil': {
        name: 'Super Portable Exhauster',
        subtitle: 'Normal or EX - For confined spaces',
        description: 'Portable axial exhauster with PVC housing for confined spaces, construction sites and industrial environments. Normal and EX versions available.',
    },
    'exaustores-super-portatil-ex': {
        name: 'Super Portable EX Exhauster',
        subtitle: 'PVC housing - certified for hazardous locations',
        description: 'Super Portable model in EX version for hazardous locations, with dual air supply and exhaust function for confined spaces and field operations.',
    },
    'exaustores-super-portatil-pneumatico': {
        name: 'Pneumatic Super Portable Exhauster',
        subtitle: 'Compressed-air drive - with duct',
        description: 'Pneumatic Super Portable version for locations where electrical drive is not desired. Runs on compressed air and can be used with ducts.',
    },
    'exaustores-axiais': {
        name: 'Industrial Axial Exhausters',
        subtitle: 'Normal or EX - Direct and indirect drive',
        description: 'Wall-mounted axial exhausters with direct or indirect drive for industries, warehouses, storage areas and commercial facilities.',
    },
    'exaustores-axiais-indireta': {
        name: 'Indirect Drive Axial Exhauster',
        subtitle: 'Industrial - belt drive',
        description: 'Industrial axial exhauster with indirect belt transmission for robust applications and rotation adjustment according to airflow and pressure requirements.',
    },
    'exaustores-navais': {
        name: 'Marine Axial Exhausters',
        subtitle: 'Normal or EX - For offshore and vessels',
        description: 'Exhausters designed to resist marine corrosion, with naval epoxy coating or stainless steel for offshore platforms and vessels.',
    },
    'exaustores-offshore': {
        name: 'Offshore Stainless Steel Exhauster',
        subtitle: 'For platforms and highly aggressive environments',
        description: 'Stainless steel exhausters for offshore platforms and chemically or marine aggressive environments. EX version available.',
    },
    'exaustores-axial-parede': {
        name: 'Square Wall Axial Exhauster',
        subtitle: 'Normal or EX - Masonry installation',
        description: 'Square axial wall exhauster for compact and efficient ventilation in industrial and commercial environments.',
    },
    'exaustores-pneumatico': {
        name: 'Pneumatic Axial Exhauster',
        subtitle: 'No electricity - Normal or EX',
        description: 'Compressed-air driven exhauster with no electrical spark risk, ideal for fuel stations and critical EX environments.',
    },
    'exaustores-centrifugos': {
        name: 'Industrial Centrifugal Exhausters',
        subtitle: 'Standard, Explosion-Proof (EX), Sirocco, Radial, PP and Mini MCQ',
        description: 'Complete series of Vesper industrial centrifugal exhausters. Designed for high static pressure and long duct runs. Models with Sirocco and Radial impellers, robust carbon steel housing with electrostatic powder coating or anti-corrosive Polyethylene (PP). High performance motors with explosion-proof (EX) options certified by INMETRO and a special series of mini MCQ exhausters.',
    },
    'exaustores-especiais': {
        name: 'Special Exhausters',
        subtitle: 'Built to customer specification',
        description: 'Custom exhausters developed for specific applications, following national and international technical standards.',
    },
    'insuflador-axial-skid': {
        name: 'Axial Air Supply System with Skid',
        subtitle: '1 to 2 ducts (400 mm) - EX certified',
        description: 'Compact axial air supply system with mobile skid support for forced ventilation in confined spaces, galleries and job sites.',
    },
    'insuflador-centrifugo-2bocas': {
        name: 'Centrifugal Air Supply System with Skid',
        subtitle: '1 to 2 ducts (600 mm) - EX certified',
        description: 'Centrifugal air supply system with skid support for up to two 600 mm ducts. High airflow and pressure for long distances.',
    },
    'insuflador-centrifugo-4bocas': {
        name: 'Centrifugal Air Supply System with Skid',
        subtitle: '4 ducts (400 mm) - EX certified',
        description: 'Centrifugal air supply system with four 400 mm outlets for wide area coverage from one unit.',
    },
    'loc-ventilador-1600': {
        name: '1600 Fan',
        subtitle: '40 cm - 1.80 m height',
        description: 'Fixed or oscillating. Ideal for events, offices and commercial environments.',
    },
    'loc-ventilador-1101': {
        name: '1101 Fan',
        subtitle: '70 cm - 2.10 m height',
        description: 'Oscillating fan with strong airflow for warehouses and large environments.',
    },
    'loc-ventilador-8800': {
        name: '8800 Fan',
        subtitle: '88 cm - 3 m height',
        description: 'Fixed only. Largest fan in the Vesper rental line.',
    },
    'loc-ventilador-1600-asp': {
        name: '1600 Fan with Misting',
        subtitle: '40 cm - Super industrial - Fixed',
        description: 'Misting system for dust reduction and thermal comfort support.',
    },
    'loc-ventilador-1101-asp': {
        name: '1100 Fan with Misting',
        subtitle: '70 cm - Super industrial - Fixed',
        description: 'Airflow and cooling with integrated micro-misting.',
    },
    'loc-ventilador-8800-asp': {
        name: '8800 Fan with Misting',
        subtitle: '88 cm - Super industrial - Fixed',
        description: 'Maximum power with integrated misting system.',
    },
    'loc-ventfog-estatico': {
        name: 'Static VentFog System',
        subtitle: 'Fixed misting for large areas',
        description: 'Evaporative misting system distributed through the environment for thermal comfort and dust reduction in temporary operations.',
    },
    'loc-ventfog-dinamico': {
        name: 'Dynamic VentFog System',
        subtitle: 'Misting with directed airflow',
        description: 'Mobile ventilation and fine mist solution for localized cooling, events, construction sites and temporary industrial environments.',
    },
    'loc-ventex': {
        name: 'Mobile Ventex Fan / Exhauster',
        subtitle: '50, 60, 70 or 80 cm',
        description: 'Can be used as fan or exhauster. High versatility for job sites and events.',
    },
    'loc-centrifugo': {
        name: 'Mobile Centrifugal Exhauster',
        subtitle: '20 m outlet',
        description: 'For galleries, tanks, tunnels and confined spaces. High pressure for long distances.',
    },
    'loc-exaustor-ex': {
        name: 'Explosion-Proof Exhauster',
        subtitle: '40 or 60 cm - EX certified',
        description: 'Rental unit for hazardous locations, platforms and job sites with explosion risk.',
    },
    'loc-cortina': {
        name: 'Air Curtain',
        subtitle: '1.75 and 2 meters',
        description: 'For environment separation and temperature control. Weight: 20 to 21 kg.',
    },
};

const CERT_EN = {
    'Sistema de Gestao da Qualidade': 'Quality Management System',
    'Sistema de Gestão da Qualidade': 'Quality Management System',
    'Certificacao Compulsoria de Produtos Ex': 'Compulsory certification for EX products',
    'Certificação Compulsória de Produtos Ex': 'Compulsory certification for EX products',
};

const COMPANY_EN = {
    history: `The VESPER brand emerged more than 60 years ago, initially as a service provider for repairs of electric motors, generators, water pumps and fans, later also manufacturing fans and related products.

In the beginning, management was handled by a technician trained in Italy. In the second generation, management was assumed by a technician trained in the United States. Since then, Vesper has offered customers advanced technology with efficient, modern and powerful products.

Today, Vesper is associated with the manufacturing and commercialization of industrial fans and exhausters.

Vesper has more than 20 years of tradition in the Brazilian EX market, supplying fans and exhausters for hazardous locations. Vesper manufactures equipment under ISO 9001:2015 and INMETRO 115:2022 standards.

Vesper is a leading supplier of EX exhausters and fans for the Brazilian industrial Oil & Gas, chemical and petrochemical markets, with external consultants monitoring production according to EX equipment standards.

Vesper is expert in adapting customer-specific projects through custom engineering.

In services, Vesper is also present in the rental of fans and exhausters for events and temporary operations.

The company serves many domestic and international clients and exports to Colombia, Germany, Spain, Italy and Angola.`,
    exports: ['Colombia', 'Germany', 'Spain', 'Italy', 'Angola'],
    hours: {
        weekdays: 'Monday to Thursday from 8:00 to 17:30',
        friday: 'Friday from 8:00 to 15:10',
        lunch: 'Lunch break from 11:50 to 12:20',
    },
    bndes: {
        text: 'COMPANIES can purchase with BNDES Card',
        subtitle: 'Up to 36 months to pay.',
    },
};

const QUALITY_EN = {
    mission: 'Improve industrial ventilation and exhaust solutions, focusing on quality and safety for customers.',
    vision: [
        'Maintain and improve the Quality Management System and ISO 9001 certification.',
        'Maintain and expand the compulsory EX product certification.',
        'Become a national reference in industrial ventilation and exhaust products.',
    ],
    values: [
        'Commitment to the customer',
        'Quality in processes and products',
        'Integrity with stakeholders',
    ],
    scope: 'Design, manufacturing and commercialization of industrial fans and exhausters for industrial use and explosive atmospheres.',
};

const DOWNLOAD_SECTION_EN = {
    'Ventiladores': {
        category: 'Fans',
        subtitle: '2410, 1101, 8800, 8803, 8810, 8813 and S1000',
    },
    'Exaustores Axiais': {
        category: 'Axial Exhausters',
        subtitle: 'Direct and indirect drive',
    },
    'Exaustores Centrífugos': {
        category: 'Centrifugal Exhausters',
    },
    'À Prova de Explosão': {
        category: 'Explosion-Proof',
    },
    'Ventiladores Industriais Especiais': {
        category: 'Special Industrial Fans',
        subtitle: '1.0 to 1.5 meters diameter',
    },
    'Artigos Técnicos': {
        category: 'Technical Articles',
    },
    'Livros': {
        category: 'Books',
    },
};

const DOWNLOAD_ITEM_EN = {
    'Catálogo Exaustores Axiais': 'Axial Exhausters Catalog',
    'Folder Catálogo Axiais EX': 'EX Axial Catalog Folder',
    'Catálogo Centrífugos': 'Centrifugal Catalog',
    'Folder Catálogo Centrífugos EX': 'EX Centrifugal Catalog Folder',
    'Tabela Modelos EX — Catálogo Completo': 'EX Model Table - Complete Catalog',
    'Catálogo VIC — Suporte Móvel': 'VIC Catalog - Mobile Support',
    'Exemplos da Não Aplicação Correta de Normas Técnicas': 'Examples of Incorrect Application of Technical Standards',
    'Fontes de Ignição': 'Ignition Sources',
    'Técnicos de manutenção condenados por homicídio culposo ao não seguirem as NBR': 'Maintenance technicians convicted for manslaughter after not following NBR standards',
    'Segurança de Equipamentos e Instalações Elétricas em Áreas Classificadas — ed. 2021': 'Safety of Electrical Equipment and Installations in Hazardous Locations - 2021 ed.',
    'Guia Abendi 2021 — Atmosferas Explosivas: Equipamentos e Instalações Elétricas e Mecânicas': 'Abendi 2021 Guide - Explosive Atmospheres: Electrical and Mechanical Equipment and Installations',
};

function isEN(language) {
    return language === 'en';
}

export function localizeProduct(product, language) {
    if (!isEN(language)) return product;
    const copy = PRODUCT_EN[product.id] || {};
    return {
        ...product,
        ...copy,
        category: CATEGORY_EN[product.category] || product.category,
        specs: product.specs,
        certsDocs: product.certsDocs?.map((doc) => ({
            ...doc,
            name: doc.name
                .replace('Certificado', 'Certificate')
                .replace('Conformidade', 'Compliance')
                .replace('Nº', 'No.')
                .replace('Linha', 'Line'),
        })),
    };
}

export function localizeProducts(products, language) {
    return products.map((product) => localizeProduct(product, language));
}

export function localizeCompany(company, language) {
    if (!isEN(language)) return company;
    return {
        ...company,
        history: COMPANY_EN.history,
        exports: COMPANY_EN.exports,
        hours: COMPANY_EN.hours,
        certifications: company.certifications.map((cert) => ({
            ...cert,
            description: CERT_EN[cert.description] || cert.description,
        })),
        bndes: {
            ...company.bndes,
            ...COMPANY_EN.bndes,
        },
    };
}

export function localizeQuality(quality, language) {
    if (!isEN(language)) return quality;
    return {
        ...quality,
        ...QUALITY_EN,
        certificates: quality.certificates?.map((cert) => ({
            ...cert,
            name: cert.name.replace('Certificado', 'Certificate'),
        })),
    };
}

export function localizeDownloads(downloads, language) {
    if (!isEN(language)) return downloads;
    return downloads.map((section) => {
        const sectionCopy = DOWNLOAD_SECTION_EN[section.category] || {};
        return {
            ...section,
            ...sectionCopy,
            items: section.items.map((item) => ({
                ...item,
                name: DOWNLOAD_ITEM_EN[item.name] || item.name,
            })),
        };
    });
}
