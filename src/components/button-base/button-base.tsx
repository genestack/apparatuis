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

import * as styles from './button-base.module.css';

interface TargetProps {
    className?: string;
    onClick?: React.ReactEventHandler;
    onKeyDown?: React.KeyboardEventHandler;
    onKeyUp?: React.KeyboardEventHandler;
    tabIndex?: number;
}

type DefaultTargetProps = React.HTMLAttributes<HTMLElement>;

interface ButtonBaseProps {
    disabled?: boolean;
    activeClassName?: string;
    as?: React.ReactType;
}

/** ButtonBase public properties */
export type Props<T extends TargetProps = DefaultTargetProps> = Omit<T, 'onClick' | 'onKeyDown'> &
    TargetProps &
    ButtonBaseProps;

interface State {
    active?: boolean;
}

/**
 * Internal component that simulates native button behaviour.
 * It is used for placing button elements into other "button" elements.
 */
export class ButtonBase<T extends TargetProps = DefaultTargetProps> extends React.Component<
    Props<T>,
    State
> {
    public state: State = {
        active: false
    };

    public shouldComponentUpdate(props: Props, state: State) {
        return props !== this.props || state.active !== this.state.active;
    }

    private handleClick: TargetProps['onClick'] = (event) => {
        this.setState({active: false});

        if (!this.props.disabled && this.props.onClick) {
            this.props.onClick(event);
        }
    };

    private handleKeyDown: TargetProps['onKeyDown'] = (event) => {
        if (event.target === event.currentTarget && event.key === ' ') {
            event.preventDefault();
            this.setState({active: true});
        }
    };

    private handleKeyUp: TargetProps['onKeyUp'] = (event) => {
        if (event.target === event.currentTarget && event.key === ' ') {
            event.preventDefault();
            this.setState({active: false});

            if (this.props.onClick) {
                this.props.onClick(event);
            }
        }
    };

    public render() {
        const {
            as: Component = 'div',
            activeClassName,
            disabled,
            tabIndex = 0,
            type = 'button',
            ...rest
        } = this.props as Props<React.ButtonHTMLAttributes<HTMLButtonElement>>;

        const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {};
        const buttonLikeProps: TargetProps = {};

        if (Component === 'button') {
            buttonProps.disabled = disabled;
            buttonProps.type = type;
        } else {
            buttonLikeProps.onClick = this.handleClick;

            if (!disabled) {
                buttonLikeProps.onKeyDown = chain(rest.onKeyDown, this.handleKeyDown);
                buttonLikeProps.onKeyUp = chain(rest.onKeyUp, this.handleKeyUp);
            }
        }

        return (
            <Component
                {...rest}
                {...buttonProps}
                {...buttonLikeProps}
                tabIndex={disabled ? -1 : tabIndex}
                className={classNames(
                    rest.className,
                    styles.root,
                    this.state.active && activeClassName
                )}
            />
        );
    }
}
