import { DateTime } from 'luxon';
/**
 * parse value to date
 * a wrapper of luxon date parsers to allow taking multiple formats
 * @param val
 * @param {string | string[]} format
 */
export declare function toDate(val: any, format?: string | string[]): DateTime;
