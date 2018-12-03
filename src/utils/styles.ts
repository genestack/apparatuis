import cn from 'classnames';
import { Omit } from '../../node_modules/@types/lodash';

function forEachKeys<T, K extends keyof T>(
    obj: T,
    cb: (key: K, value: T[K]) => void
) {
    (Object.keys(obj) as K[]).forEach((key) => {
        const value = obj[key];
        cb(key, value);
    });
}

type ClassKeys<P> = P extends WithClasses<infer K> ? K | 'root' : string;
export type ClassNamesMap<K extends string> = Partial<Record<K, string>>;

export interface WithClasses<K extends string> {
    className?: string;
    classes?: ClassNamesMap<K>;
}

type PrivateProps<
    P extends WithClasses<any>,
    K extends ClassKeys<P>
> = Omit<P, 'classes' | 'className'> & { classes: Record<K, string> };

export function mergeClassesProps<P extends WithClasses<any>, K extends ClassKeys<P>>(
    props: P,
    styles: ClassNamesMap<string>
): PrivateProps<P, K> {
    const { classes: publicClasses, className, ...rest } = (props as any);

    const privateClasses: ClassNamesMap<K> = {};

    privateClasses.root = cn(className);

    forEachKeys(styles, (key, value) => {
        privateClasses[key] = cn(privateClasses[key], value, publicClasses && publicClasses[key]);
    });

    return {
        ...rest,
        classes: privateClasses
    };
}
