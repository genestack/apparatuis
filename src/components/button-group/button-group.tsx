/*
 * Copyright (c) 2011-2019 Genestack Limited
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

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** ButtonGroup public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    rootRef?: React.Ref<HTMLDivElement>;
    intent?: ButtonProps['intent'];
    ghost?: ButtonProps['ghost'];
    size?: ButtonProps['size'];
}

/** Joined group of buttons */
export const ButtonGroup = (props: Props) => {
    const {rootRef, intent, ghost, classes, size, ...rest} = mergeClassesProps(props, styles);

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
                ref={rootRef}
                className={classNames(rest.className, classes.root)}
            />
        </ButtonContext.Provider>
    );
};
