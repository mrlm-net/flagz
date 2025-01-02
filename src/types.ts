export interface IFeatures {
    get(key: string): boolean;
    set(key: string, value: boolean): void;
}

export type FeatureFlags = Record<string, FeatureFlag>;
export type FeatureFlag = boolean;