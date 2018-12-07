/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import cn from 'classnames';
import {Omit} from './omit';

/**
 * You might need to change the style of a component in some very specific situation.
 *
 * The first way to override the style of a component is to use class names.
 * Every component provides a `className` property which is always applied to the root element.
 */

/**
 * @example
 * import { Button } from './components/button';
 * import * as styles from './my-styles.module.css';
 *
 * function MyApp() {
 *     return (
 *         <Button className={styles.myButton}>My Button</Button>
 *     );
 * }
 */

/*
 * When the `className` property isn't enough, and you need to access deeper elements
 * or modify style for some component's internal states (ex. `disabled`),
 * you can take advantage of the `classes` property to customize all the CSS for a given component.
 */

/**
 * @example
 * import { Button } from './components/button';
 * import * as styles from './my-styles.module.css';
 *
 * function MyApp() {
 *     return (
 *         <Button classes={{
 *             root: styles.myButton,
 *             disabled: styles.myButtonDisabled,
 *             icon: styles.myButtonIcon
 *         }}>
 *             My Button
 *         </Button>
 *     );
 * }
 *
 */

/**
 * For defining components that support this API approach this util was created.
 */

/**
 * Type for objects that represent hash map of classNames with keys of type K.
 * {
 *   "classNameKey1": "__classNameValue1",
 *   "classNameKey2": "__classNameValue2",
 *   // ...etc
 * }
 *
 * Used for `classes` property or `styles` hash map imported from css modules.
 */
export type ClassNames<K extends string> = Record<K, string>;

/**
 * Props interface for react components which implements "classes design approach".
 */

/**
 * @example
 * // button.module.css
 * .root {}
 * .disabled {}
 *
 * // button.tsx
 * type ClassNameKeys = 'root' | 'disabled';
 * interface MyComponentProps extends WithClasses<ClassNameKeys> {}
 */
export interface WithClasses<K extends string> {
    /**
     * The root element `className`
     */
    className?: string;
    /**
     * Hash map of class names which component will add
     * to its elements's and internal state's class names.
     */
    classes?: Partial<ClassNames<K>>;
}

/**
 * Private helper type for inferring possible class names keys from component's props
 * to define internal `classes` type.
 * We add the 'root' key because we always move `className` property to `classes.root`
 */
type ClassKeys<P> = P extends WithClasses<infer K> ? K | 'root' : string;

/**
 * Internal component's props which will be used in component's `render()` method.
 * We remove optional `classes` and `className` from original props because
 * `className` moved to `classes.root` so `classes` key becomes permanent.
 */
type InternalProps<P extends WithClasses<any>> = Omit<P, 'classes' | 'className'> & {
    classes: ClassNames<ClassKeys<P>>;
};

/**
 * Merge `props.classes` with `styles` hash map from css modules.
 *
 * @param props - Original component's props
 * @param styles - Hasmap imported from css module
 * @returns Transformed original components's props with `classes` hash map
 * and omitted `className` prop which is moved to `classes.root`
 */
export function mergeClassesProps<P extends WithClasses<any>>(
    props: P,
    styles: ClassNames<string>
): InternalProps<P> {
    const {classes: publicClasses, className, ...rest} = props as any;

    const privateClasses = {} as ClassNames<ClassKeys<P>>;

    privateClasses.root = cn(className);

    Object.keys(styles).forEach((key) => {
        const value = styles[key];
        privateClasses[key] = cn(privateClasses[key], value, publicClasses && publicClasses[key]);
    });

    return {
        ...rest,
        classes: privateClasses
    };
}
