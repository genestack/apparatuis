/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {ButtonProps} from '../button';
import {ButtonContextValue, ButtonContext} from '../button/button-context';

import * as styles from './button-group.module.css';

type TargetProps = React.ComponentPropsWithoutRef<'div'>;

/** ButtonGroup public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    intent?: ButtonProps['intent'];
    ghost?: ButtonProps['ghost'];
    size?: ButtonProps['size'];
}

/** Joined group of buttons */
export const ButtonGroup = React.forwardRef<HTMLDivElement, Props>(function ButtonGroup(
    props,
    ref
) {
    const {intent, ghost, classes, size, ...rest} = mergeClassesProps(props, styles);

    const contextValue: ButtonContextValue = React.useMemo(
        () => ({
            intent,
            ghost,
            size,
            className: classNames(classes.button, {
                [classes.ghostAccent]: ghost && intent === 'accent'
            })
        }),
        [ghost, intent, classes.button, classes.ghostAccent, size]
    );

    return (
        <ButtonContext.Provider value={contextValue}>
            <div
                data-qa="button-group"
                {...rest}
                ref={ref}
                className={classNames(rest.className, classes.root)}
            />
        </ButtonContext.Provider>
    );
});
