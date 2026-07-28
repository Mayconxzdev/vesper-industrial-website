/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Brand colors
                primary: '#C11818',
                accent: '#DBA800',
                // Theme-aware colors (fallback)
                'theme-body': 'var(--bg-body)',
                'theme-surface': 'var(--bg-surface)',
                'theme-card': 'var(--bg-card)',
                'theme-header': 'var(--bg-header)',
                'theme-footer': 'var(--bg-footer)',
                'theme-input': 'var(--bg-input)',
                // Text colors
                'theme-primary': 'var(--text-primary)',
                'theme-secondary': 'var(--text-secondary)',
                'theme-muted': 'var(--text-muted)',
                'theme-placeholder': 'var(--text-placeholder)',
                // Border colors
                'theme-border': 'var(--border-default)',
                'theme-border-hover': 'var(--border-hover)',
                'theme-border-accent': 'var(--border-accent)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
