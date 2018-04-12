/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';
import Textarea from 'react-textarea-autosize';
import styles from './textarea-autosize.module.css';
import classnames from 'classnames'

type OnValueChanger = (value: number | string| string[]) => any;

type TextareaAutosizeProps =
    & Textarea['props']
    & {
        onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>, value?: any) => void;
        onValueChange?: OnValueChanger
    };

export default class TextareaAutosize extends React.Component<TextareaAutosizeProps> {

    onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {onChange, onValueChange, name} = this.props;
        const {value} = event.currentTarget;

        onChange && onChange(
            event,
            name
                ? {[name]: value}
                : value
        );

        onValueChange && onValueChange(value);
    }

    render() {
        const {onChange, onValueChange, className, ...omited} = this.props as any;
        
        return  (
            <Textarea
                    className={classnames(styles['textarea-autosize'], className)}
                    {...omited}
                    onChange={this.onChange}
            />
        );
    };
};
