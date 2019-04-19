/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import React from 'react';

import {chain} from '../../utils/chain';
import {WithClasses, mergeClassesProps} from '../../utils/styles';

import * as styles from './input.module.css';

type TargetProps = React.InputHTMLAttributes<HTMLInputElement>;

/** Input public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /** If `true` input has invalid styles */
    invalid?: boolean;
    /** If `true` input has width: 100% */
    fullWidth?: boolean;
    /** Custom change event handler */
    onValueChange?: (value: string) => void;
    /** React reference to native input */
    inputRef?: React.Ref<HTMLInputElement>;
}

/** Input wrapper */
export const Input = (props: Props) => {
    const {invalid, fullWidth, onValueChange, inputRef, classes, ...rest} = mergeClassesProps(
        props,
        styles
    );

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const {value} = event.currentTarget;

        if (onValueChange) {
            onValueChange(value);
        }
    };

    return (
        <input
            {...rest}
            ref={inputRef}
            className={classNames(rest.className, classes.root, {
                [classes.fullWidth]: fullWidth,
                [classes.invalid]: invalid
            })}
            onChange={chain(rest.onChange, handleChange)}
        />
    );
};
