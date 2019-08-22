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

import * as styles from './interactive-element.module.css';

interface TargetProps {
    className?: string;
    onClick?: React.ReactEventHandler;
    onKeyDown?: React.KeyboardEventHandler;
    onKeyUp?: React.KeyboardEventHandler;
    tabIndex?: number;
    href?: string;
}

type DefaultTargetProps = React.AnchorHTMLAttributes<HTMLElement> &
    React.ButtonHTMLAttributes<HTMLElement>;

interface InteractiveElementProps {
    /** It `true` button does not react on clicks */
    disabled?: boolean;
    /** Class name which is added when user activates button by "Space" key */
    activeClassName?: string;
    /** Disable all listeners which could make button to be active */
    disableListeners?: boolean;
    /** Target React element. "div" by default */
    as?: React.ReactType;
}

/** InteractiveElement public properties */
export type Props<T extends TargetProps = DefaultTargetProps> = Omit<T, 'onClick' | 'onKeyDown'> &
    TargetProps &
    InteractiveElementProps;

interface State {
    active?: boolean;
}

/**
 * Internal component that simulates native button behaviour.
 * It is used for placing button elements into other "button" elements.
 */
export class InteractiveElement<T extends TargetProps = DefaultTargetProps> extends React.Component<
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
        const props = this.props as Props;

        const {
            as: Component = typeof props.href === 'string' ? 'a' : 'div',
            activeClassName,
            disabled,
            disableListeners,
            tabIndex = 0,
            type = 'button',
            ...rest
        } = props;

        const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {};
        const buttonLikeProps: TargetProps = {};

        if (Component === 'button') {
            buttonProps.disabled = disabled;
            buttonProps.type = type;
        }

        if (Component !== 'a' && Component !== 'button') {
            buttonLikeProps.onClick = this.handleClick;

            if (!disabled && !disableListeners) {
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
