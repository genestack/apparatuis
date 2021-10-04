/*
 * Copyright (c) 2011-2021 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {chain} from '../../utils/chain';

import * as styles from './interactive-element.module.css';

type TargetProps = React.AnchorHTMLAttributes<HTMLElement> &
    React.ButtonHTMLAttributes<HTMLElement>;

interface InteractiveElementProps {
    /** It `true` button does not react on clicks */
    disabled?: boolean;
    /**
     * If `true`, the component is disabled but allows cursor interactions such as mouse hover (for tooltips) and focus.
     * @default false
     */
    inclusiveDisabled?: boolean;
    /** Class name which is added when user activates button by "Space" key */
    activeClassName?: string;
    /** Disable all listeners which could make button to be active */
    disableListeners?: boolean;
    /** Target React element. "div" by default */
    as?: React.ElementType;
}

/** InteractiveElement public properties */
export type Props = TargetProps & InteractiveElementProps;

interface State {
    active?: boolean;
}

/**
 * Internal component that simulates native button behaviour.
 * It is used for placing button elements into other "button" elements.
 */

export const InteractiveElement = React.forwardRef((props: Props, ref) => {
    const [state, setState] = React.useState<State>({active: false});

    const {
        as: Component = typeof props.href === 'string' ? 'a' : 'div',
        activeClassName,
        disabled,
        inclusiveDisabled = false,
        disableListeners,
        tabIndex = 0,
        type = 'button',
        ...rest
    } = props;

    const handleClick: TargetProps['onClick'] = (event) => {
        setState({active: false});

        if (inclusiveDisabled) {
            event.preventDefault();

            return;
        }

        if (!disabled) {
            props.onClick?.(event);
        }
    };

    const handleKeyDown: Props['onKeyDown'] = (event) => {
        if (event.target === event.currentTarget && event.key === ' ') {
            event.preventDefault();
            setState({active: true});
        }
    };

    const handleKeyUp: Props['onKeyUp'] = (event) => {
        if (event.target === event.currentTarget && event.key === ' ') {
            event.preventDefault();
            setState({active: false});

            // keyboard accessibility for non interactive elements hack
            props.onClick?.(event as any);
        }
    };

    const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {};
    const buttonLikeProps: Props = {};

    if (Component === 'button') {
        buttonProps.disabled = disabled;
        buttonProps.type = type;
    }

    if (Component !== 'a' && Component !== 'button') {
        buttonLikeProps.onClick = handleClick;

        if (!disabled && !disableListeners) {
            buttonLikeProps.onKeyDown = chain(props.onKeyDown, handleKeyDown);
            buttonLikeProps.onKeyUp = chain(props.onKeyUp, handleKeyUp);
        }
    }

    return React.useMemo(
        () => (
            <Component
                {...rest}
                {...buttonProps}
                {...buttonLikeProps}
                tabIndex={disabled ? -1 : tabIndex}
                className={classNames(rest.className, styles.root, state.active && activeClassName)}
                ref={ref}
            />
        ),
        [props, state.active]
    );
});
