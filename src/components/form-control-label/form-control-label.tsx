/*
 * Copyright (c) 2011-2021 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import React from 'react';

import {Controls, ControlsItem, ControlsProps} from '../controls';
import {Typography, TypographyProps} from '../typography';

import * as styles from './form-control-label.module.css';

/** Public FormControlLabel properties */
export interface Props extends React.HTMLAttributes<HTMLLabelElement>, Pick<ControlsProps, 'gap'> {
    control: React.ReactElement;
    label: React.ReactNode;
    labelProps?: TypographyProps;
    disabled?: boolean;
}

/** Drop-in replacement of the Switch component. Use this component if you want to display an extra label. */
export function FormControlLabel(props: Props) {
    const {control, label, labelProps, disabled: disabledProp, gap = 1, ...restProps} = props;

    let disabled = disabledProp;

    if (typeof disabled === 'undefined' && typeof control.props.disabled !== 'undefined') {
        disabled = control.props.disabled;
    }

    const controlProps = {
        disabled
    };

    const renderLabel = () => {
        const mutatedLabelProps = {
            ...labelProps,
            className: classNames(labelProps?.className, {
                [styles.typographyDisabled]: disabled
            })
        };

        if (React.isValidElement(props.label) && props.label.type === Typography) {
            return <>{React.cloneElement(label as React.ReactElement, mutatedLabelProps)}</>;
        }

        return <Typography {...mutatedLabelProps}>{label}</Typography>;
    };

    return (
        <Controls
            data-qa="form-control-label"
            {...restProps}
            gap={gap}
            as="label"
            className={classNames(styles.label, restProps.className, {
                [styles.disabled]: disabled
            })}
        >
            <ControlsItem>{React.cloneElement(props.control, controlProps)}</ControlsItem>
            <ControlsItem>{renderLabel()}</ControlsItem>
        </Controls>
    );
}
