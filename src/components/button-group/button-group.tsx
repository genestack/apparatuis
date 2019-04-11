/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {ButtonProps} from '../button';
import {ButtonContextValue, ButtonContext} from '../button/button-context';
import {FlexItem} from '../flex';

import * as styles from './button-group.module.css';

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** ButtonGroup public properties */
export interface Props extends TargetProps {
    variant?: ButtonProps['variant'];
}

/** Joined group of buttons */
export const ButtonGroup = (props: Props) => {
    const {variant, ...rest} = props;

    const contextValue: ButtonContextValue = {
        variant,
        className: styles.button
    };

    return (
        <ButtonContext.Provider value={contextValue}>
            <FlexItem {...rest} container gap={0} />
        </ButtonContext.Provider>
    );
};
