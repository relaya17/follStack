export function formatDate(date: Date | string, locale: string = 'he-IL'): string {
    const d = new Date(date);
    return d.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function formatDateTime(date: Date | string, locale: string = 'he-IL'): string {
    const d = new Date(date);
    return d.toLocaleString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatTime(date: Date | string, locale: string = 'he-IL'): string {
    const d = new Date(date);
    return d.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
    });
}

export function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours > 0) {
        return `${hours} שעות${mins > 0 ? ` ו-${mins} דקות` : ''}`;
    }
    return `${mins} דקות`;
}

export function formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

export function formatNumber(num: number, locale: string = 'he-IL'): string {
    return num.toLocaleString(locale);
}

export function formatPercentage(value: number, total: number): string {
    const percentage = (value / total) * 100;
    return `${Math.round(percentage)}%`;
}

export function formatCurrency(amount: number, currency: string = 'ILS', locale: string = 'he-IL'): string {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(amount);
}
