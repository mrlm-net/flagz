import { deepmerge } from "@mrlm/cfg";

export interface FlaggerOptions {
    separator?: string;
}

const defaultOptions: FlaggerOptions = {
    separator: '.',
};

export default class Flagger {
    private flags: Record<string, any>;
    private separator: string;

    constructor(flags: Record<string, any> = {}, options: FlaggerOptions = {}) {
        const mergedOptions = deepmerge(defaultOptions, options);
        this.flags = flags;
        this.separator = mergedOptions.separator!;
    }
    
    public get(key: string): boolean {
        const keys = key.split(this.separator);
        let result = this.flags;
        for (const k of keys) {
            if (result[k] === undefined) {
                return false;
            }
            result = result[k];
        }
        if (typeof result === 'boolean') {
            return result;
        }
        return false;
    }
    
    public set(key: string, value: boolean): void {
        const keys = key.split(this.separator);
        let result = this.flags;
        for (let i = 0; i < keys.length - 1; i++) {
            if (result[keys[i]] === undefined) {
                result[keys[i]] = {};
            }
            result = result[keys[i]];
        }
        result[keys[keys.length - 1]] = value;
    }

    public addFlags(newFlags: Record<string, any>): void {
        this.flags = deepmerge(this.flags, newFlags);
    }

    public setFlags(newFlags: Record<string, any>): void {
        this.flags = deepmerge({}, newFlags);
    }
}