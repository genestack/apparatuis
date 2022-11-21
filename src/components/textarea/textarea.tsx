/*
 * Copyright (c) 2011-2021 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import React from 'react';
import TextareaAutosize, {TextareaAutosizeProps} from 'react-textarea-autosize';

import {chain, mergeClassesProps, WithClasses} from '../../utils';

import * as styles from './textarea.module.css';
type TargetProps = TextareaAutosizeProps;

/** Textarea Autosize public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /** If `true` input has invalid styles */
    invalid?: boolean;
    /** If `true` input has width: 100% */
    fullWidth?: boolean;
    /** Custom change event handler */
    onValueChange?: (value: string) => void;
    inputRef?: React.Ref<HTMLTextAreaElement>;
}

/**
 * React Textarea Autosize wrapper
 */
export const Textarea = (props: Props) => {
    const {invalid, fullWidth, onValueChange, classes, inputRef, ...rest} = mergeClassesProps(
        props,
        styles
    );

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        const {value} = event.currentTarget;

        if (onValueChange) {
            onValueChange(value);
        }
    };

    return (
        <TextareaAutosize
            data-qa="textarea"
            {...rest}
            ref={inputRef as any}
            onChange={chain(rest.onChange, handleChange)}
            className={classNames(rest.className, classes.root, {
                [classes.fullWidth]: fullWidth,
                [classes.invalid]: invalid
            })}
        />
    );
};
