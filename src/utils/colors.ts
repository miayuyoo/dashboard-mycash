// Mapped from tailwind.config.js
export const COLORS = {
    brand: {
        500: '#DFFE35',
        600: '#D7FE03', // Primary Lime
    },
    neutral: {
        100: '#F9FAFB',
        200: '#F3F4F6',
        500: '#9CA3AF',
        1000: '#111827',
    },
    error: '#EF4444', // Fallback or defined?
    success: '#22C55E'
};

export const CHART_COLORS = {
    income: COLORS.brand[600],
    expense: COLORS.neutral[1000],
    grid: '#E5E5E5',
    text: COLORS.neutral[500]
};
