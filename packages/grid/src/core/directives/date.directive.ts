import { directive, Directive } from 'lit/directive.js';

export const DATE_FORMAT: {[key: string]: Array<Partial<Intl.DateTimeFormatOptions | string>>} = {
    DEFAULT: [{day: '2-digit'}, '.', {month: '2-digit'}, '.', {year: 'numeric'}, ' ', {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}],
};

export function createDate(
    date: Date,
    params?: { dateTimeFormatOptions?: Array<Partial<Intl.DateTimeFormatOptions> | string> }
): string {
    const dateTimeFormatOptions = params?.dateTimeFormatOptions ?? DATE_FORMAT.DEFAULT;
    const format = (option: Partial<Intl.DateTimeFormatOptions> | string) => {
        return (typeof option === 'string') ? option : (new Intl.DateTimeFormat(undefined, option)).format(date);
    };
    return dateTimeFormatOptions.map(format).join('');
}

export class DateDirective extends Directive {
    render(value: number) {
        return `${this.getDateString(value)}`;
    }

    private getDateString(value: number): string {
        return createDate(new Date(value));
    }
}
export const dateDirective = directive(DateDirective);
