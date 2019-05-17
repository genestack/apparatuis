/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import React from 'react';
// tslint:disable-next-line:match-default-export-name
import ReactTextareaAutosize from 'react-textarea-autosize';

import {Omit} from '../../utils/omit';

import * as styles from './textarea-autosize.module.css';

type OnValueChanger = (value: number | string | string[]) => any;

type TargetProps = ReactTextareaAutosize['props'];

/** Textarea Autosize public properties */
export interface Props extends Omit<TargetProps, 'onChange'> {
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>, value?: any) => void;
    onValueChange?: OnValueChanger;
}

/**
 * React Textarea Autosize wrapper
 */
export class TextareaAutosize extends React.Component<Props> {
    private onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {onChange, onValueChange, name} = this.props;
        const {value} = event.currentTarget;

        if (onChange) {
            onChange(event, name ? {[name]: value} : value);
        }

        if (onValueChange) {
            onValueChange(value);
        }
    };

    public render() {
        const {onChange, onValueChange, className, ...omited} = this.props as any;

        return (
            <ReactTextareaAutosize
                className={classNames(styles.textareaAutosize, className)}
                {...omited}
                onChange={this.onChange}
            />
        );
    }
}
