// tslint:disable-next-line:no-any
export type Omit<T, K extends keyof T> = T extends any
    ? Pick<T, Exclude<keyof T, K>>
    : never;
