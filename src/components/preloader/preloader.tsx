/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import * as React from 'react';

import {DarkContext} from '../../utils/dark-context';
import {Typography, TypographyProps} from '../typography';

import * as styles from './preloader.module.css';

/** Preloader public properties */
export interface Props {
    /**
     * How many lines of preloaders should be rendered.
     *
     * Default: `1`
     */
    count?: number;
    /**
     * Custom classnames that should be applied to preloader
     * one by one.
     * Please note, default classnames are imported from the
     * css module.
     *
     * Default: `['width100', 'width75', 'width85']`
     */
    iterateClassnames?: string[];
    /**
     * Describes should preloader be rendered or not.
     * Children will be rendered otherwise.
     *
     * Default `false`
     */
    show?: boolean;
    /**
     * What should be rendered when `show` prop equals to `false`
     *
     * Default `undefined`
     */
    children?: React.ReactNode;
    /**
     * Wrapper for preloader component
     *
     * Default `React.Fragment`
     */
    wrapAll?: React.ElementType;
    /**
     * Wrapper for each preloader line
     *
     * Default: `React.Fragment`
     */
    wrapEach?: React.ElementType;
    /**
     * Typography `className` prop
     */
    className?: TypographyProps['className'];
    /**
     * Typography `inverted` prop
     */
    inverted?: TypographyProps['inverted'];
    /**
     * Typography `variant` prop
     */
    variant?: TypographyProps['variant'];
    /**
     * Typography `box` prop
     */
    box?: TypographyProps['box'];
}

const getIterator = function* <T extends any = any>(array: T[]): IterableIterator<T> {
    while (true) {
        for (const value of array) {
            yield value;
        }
    }
};

const reduceNumber = <T extends any = any>(
    count: number,
    reducer: (value: T, i: number) => T,
    initialValue: T
) => {
    let value = initialValue;
    for (let i = 0; i < count; i += 1) {
        value = reducer(value, i);
    }

    return value;
};

const DEFAULT_CLASSES = [styles.width100, styles.width75, styles.width85];

/**
 * Component that renders preloader lines
 */
export const Preloader = ({
    count = 1,
    iterateClassnames = DEFAULT_CLASSES,
    show = false,
    wrapAll = React.Fragment,
    wrapEach = React.Fragment,
    children,
    className,
    inverted,
    variant,
    box
}: Props) => {
    const classNameGenerator = getIterator(iterateClassnames);
    const ListWrapper = wrapAll;
    const ListItemWrapper = wrapEach;

    if (!show) {
        // Wrapping is required for consistency of returning value
        return <>{children}</>;
    }

    return (
        <ListWrapper>
            {reduceNumber<JSX.Element[]>(
                count,
                (preloaderLines, index) => {
                    const nextClassName = classNameGenerator.next().value;

                    return [
                        ...preloaderLines,
                        <ListItemWrapper key={`${nextClassName}-${index}`}>
                            <DarkContext.Consumer>
                                {(darkContext) => {
                                    const backgroundInverted =
                                        typeof inverted === 'boolean'
                                            ? inverted
                                            : Boolean(darkContext);

                                    return (
                                        <Typography
                                            variant={variant}
                                            box={box}
                                            className={classNames(
                                                styles.preloader,
                                                {
                                                    [styles.backgroundRegular]: !backgroundInverted,
                                                    [styles.backgroundInverted]: backgroundInverted
                                                },
                                                nextClassName,
                                                className
                                            )}
                                            inverted={inverted}
                                        />
                                    );
                                }}
                            </DarkContext.Consumer>
                        </ListItemWrapper>
                    ];
                },
                []
            )}
        </ListWrapper>
    );
};
