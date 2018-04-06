/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';
import Textarea from 'react-textarea-autosize';
import mapProps from '../../utils/mapProps';

type OnValueChanger = (value: number | string| string[]) => any;

type TextareaAutosizeProps =
    & Textarea['props']
    & {
        onValueChange?: OnValueChanger
    };

export default class TextareaAutosize extends React.Component<TextareaAutosizeProps> {

    onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {onChange, onValueChange} = this.props;

        onChange && onChange(event);
        onValueChange && onValueChange(event.currentTarget.value);
    }

    render() {
        const {onChange, onValueChange, ref, ...omited} = this.props;

        return  (
            <Textarea
                    {...omited}
                    onChange={this.onChange}
            />
        );
    }
}

