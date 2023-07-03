/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';

/**
 * @description
 * You might need to change the style of a component in some very specific situation.
 *
 * The first way to override the style of a component is to use class names.
 * Every component provides a `className` property which is always applied to the target element.
 *
 * @example
 * import { Button } from './components/button';
 * import * as styles from './my-styles.module.css';
 *
 * function MyApp() {
 *     return (
 *         <Button className={styles.myButton}>My Button</Button>
 *     );
 * }
 *
 * @description
 * When the `className` property isn't enough, and you need to access deeper elements
 * or modify style for some component's internal states (ex. `disabled`),
 * you can take advantage of the `classes` property to customize all the CSS for a given component.
 *
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
 * @description
 * For defining components that support this API approach this util was created.
 */

/**
 * Type for objects that represent hash map of classNames with keys of type K.
 *
 * Used for `classes` property or `styles` hash map imported from css modules.
 *
 * @example
 * {
 *   "classNameKey1": "__classNameValue1",
 *   "classNameKey2": "__classNameValue2",
 *   // ...etc
 * }
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
     * The target element `className`
     */
    className?: string;
    /**
     * Hash map of class names which component will add
     * to its element's and internal state's class names.
     */
    classes?: Partial<ClassNames<K>>;
}

/**
 * Internal component's props which will be used in component's `render()` method.
 */
type InternalProps<P extends WithClasses<K>, K extends string> = Omit<P, 'classes'> & {
    classes: ClassNames<K>;
};

/**
 * Merge `props.classes` with `styles` hash map from css modules.
 *
 * @param props - Original component's props
 * @param styles - Hashmap imported from css module
 * @returns Transformed original component's props with `classes` hash map
 */
export function mergeClassesProps<P extends WithClasses<K>, K extends string>(
    props: P,
    styles: ClassNames<K>
): InternalProps<P, K> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const {classes: publicClasses = {}, ...rest} = props as any;

    const privateClasses: Partial<ClassNames<K>> = {};

    const keys = Array.from(
        new Set([...Object.keys(styles), ...Object.keys(publicClasses)])
    ) as K[];

    keys.forEach((key) => {
        privateClasses[key] = classNames(privateClasses[key], styles[key], publicClasses[key]);
    });

    return {
        ...rest,
        classes: privateClasses
    };
}
