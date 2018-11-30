import * as React from 'react';
import cn from 'classnames';

function forEachKeys<T, K extends keyof T>(
    obj: T,
    cb: (key: K, value: T[K]) => void
) {
    (Object.keys(obj) as K[]).forEach((key) => {
        const value = obj[key];
        cb(key, value);
    });
}

type ClassNameMap<C extends string> = Record<C, string>;

interface PublicProps<K extends string> {
    className?: string;
    style?: React.CSSProperties;
    classes?: Partial<ClassNameMap<K>>;
}

interface PrivateProps<K extends string> {
    classes: ClassNameMap<K | 'root'>;
}

type ClassNamesMegre<K extends string = string> = <Props>(
    props: Props
) => Props & PrivateProps<K>;

export function createClassNamesMerger<K extends string>(
    styles: ClassNameMap<K>
): ClassNamesMegre<K> {
    return <Props extends PublicProps<K>>(props: Props) => {
        const classes = {} as ClassNameMap<K | 'root'>;

        classes.root = cn(props.className);

        forEachKeys(styles, (key, value) => {
            classes[key] = cn(classes[key], value, props.classes && props.classes[key]);
        });

        return {
            ...(props as any),
            classes
        };
    };
}

export type WithStyles<
    T extends ClassNamesMegre,
    K extends string = T extends ClassNamesMegre<infer K> ? K : never
> = PublicProps<K>;
