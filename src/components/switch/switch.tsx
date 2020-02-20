/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {chain} from '../../utils/chain';
import {Omit} from '../../utils/omit';
import {mergeClassesProps, WithClasses} from '../../utils/styles';

import * as styles from './switch.module.css';

type BaseTargetProps = React.ComponentPropsWithRef<'input'>;
type BaseRootProps = React.ComponentPropsWithRef<'div'>;

/** Properties that are exchanged between input and its wrapper (root element) */
type ExchangedProps =
    | 'className'
    | 'style'
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'onFocus'
    | 'onBlur';

type TargetProps = Omit<BaseTargetProps, ExchangedProps | 'size'>;
type RootProps = Pick<BaseRootProps, ExchangedProps> & WithClasses<keyof typeof styles>;

type OtherTargetProps = Pick<BaseTargetProps, ExchangedProps | 'size'>;
type OtherRootProps = Omit<BaseRootProps, ExchangedProps>;

/** Switch public properties */
export interface Props extends TargetProps, RootProps, WithClasses<keyof typeof styles> {
    /** Defines a size of the component */
    size?: 'small' | 'normal';
    /** Custom change event handler */
    onCheckedChange?: (checked: boolean) => void;
    /**
     * Properties for root wrapper element.
     * Some properties like styles or mouse listeners from a root level
     * of properties are passed to this wrapper not to input.
     * @see ExchangedProps
     */
    rootProps?: OtherRootProps;
    /**
     * The rest properties for native input element that could not be passed
     * to a root level of properties.
     * @see ExchangedProps
     */
    inputProps?: OtherTargetProps;
    /** Properties for a track element */
    trackProps?: React.ComponentPropsWithRef<'div'>;
    /** Properties for a handler element */
    handlerProps?: React.ComponentPropsWithRef<'div'>;
}

/** The input component which toggles the state of a single setting on or off */
export const Switch = (props: Props) => {
    const {
        size,
        classes,
        onCheckedChange,
        inputProps = {},
        rootProps,
        handlerProps = {},
        trackProps = {},
        ...rest
    } = mergeClassesProps(props, styles);

    const [focused, setFocused] = React.useState(false);

    const handleFocus = () => {
        setFocused(true);
    };

    const handleBlur = () => {
        setFocused(false);
    };

    const handleInputChange =
        onCheckedChange &&
        ((event: React.ChangeEvent<HTMLInputElement>) => {
            if (onCheckedChange) {
                onCheckedChange(event.target.checked);
            }
        });

    return (
        <div
            data-qa="switch"
            {...rootProps}
            className={classNames(classes.root, rest.className, {
                [classes.small]: size === 'small',
                [classes.disabled]: rest.disabled,
                [classes.focused]: focused
            })}
        >
            <input
                type="checkbox"
                {...rest}
                {...inputProps}
                className={classNames(classes.input, inputProps.className)}
                onChange={chain(handleInputChange, rest.onChange)}
                onFocus={chain(handleFocus, rest.onFocus)}
                onBlur={chain(handleBlur, rest.onBlur)}
            />
            <div {...trackProps} className={classNames(classes.track, trackProps.className)}>
                <span
                    {...handlerProps}
                    className={classNames(classes.handler, handlerProps.className)}
                />
            </div>
        </div>
    );
};
