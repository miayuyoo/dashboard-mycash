export function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
}

export function formatPercentage(value: number): string {
    const formatted = Math.abs(value).toFixed(0);
    const sign = value >= 0 ? '+' : '-';
    return `${sign}${formatted}%`;
}
