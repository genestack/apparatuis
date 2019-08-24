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
import {DarkContext} from '../../utils/dark-context';
import {OverridableComponent, OverridableProps} from '../../utils/overridable-component';
import {WithClasses, mergeClassesProps} from '../../utils/styles';

import * as styles from './button-base.module.css';
import {useButtonActiveState} from './use-button-active-state';

/** ButtonBase public properties */
export interface Props extends WithClasses<keyof typeof styles> {
    /** Light button variant without background */
    ghost?: boolean;
    /** Intent of button */
    intent?: 'default' | 'accent' | 'alarm';
    /**
     * If `true` element has `hover` style.
     * It is used only for examples. Avoid using this property.
     */
    hovered?: boolean;
    /**
     * If `true` element has `focus` style.
     * It is used only for examples. Avoid using this property.
     */
    focused?: boolean;
    /** If `true` element has `pressed` style. */
    active?: boolean;
    /**
     * `onClick` handler is generic because button could call it
     * on keyboard space event. @see useButtonActiveState
     */
    onClick?: React.ReactEventHandler;
    inverted?: boolean;
}

interface TypeMap {
    props: Props;
    defaultType: 'button';
}

/** Base component for any elements that look and live like buttons */
export const ButtonBase: OverridableComponent<TypeMap> = React.forwardRef<
    HTMLButtonElement,
    OverridableProps<TypeMap>
    // tslint:disable-next-line: no-shadowed-variable
>(function ButtonBase(props, ref) {
    const darkContext = React.useContext(DarkContext);

    const {
        ghost,
        intent = 'default',
        hovered,
        focused,
        // use default tabIndex to enable focusing
        tabIndex = 0,
        active,
        classes,
        component: Component = 'button',
        disabled,
        onClick,
        inverted,
        ...rest
    } = mergeClassesProps(props, styles);

    const isNativeButton = Component === 'button';

    const handleClick = React.useCallback<React.ReactEventHandler>(
        (event) => {
            if (!disabled && onClick) {
                onClick(event);
            }
        },
        [onClick, disabled]
    );

    const activeState = useButtonActiveState({
        onClick: handleClick,
        disableHook: isNativeButton
    });

    return (
        <Component
            type={isNativeButton ? 'button' : undefined}
            {...rest}
            disabled={isNativeButton ? disabled : undefined}
            ref={ref}
            tabIndex={!disabled ? tabIndex : undefined}
            className={classNames(rest.className, classes.root, {
                [classes.active]: active || activeState.active,
                [classes.hovered]: hovered,
                [classes.focused]: focused,
                [classes.disabled]: disabled,
                [classes.ghost]: ghost,
                [classes.normal]: !ghost,
                [classes.intentDefault]: intent === 'default',
                [classes.accent]: intent === 'accent',
                [classes.alarm]: intent === 'alarm',
                [classes.inverted]: inverted || darkContext
            })}
            onClick={handleClick}
            onMouseDown={chain(rest.onMouseDown, activeState.onMouseDown)}
            onKeyDown={chain(rest.onKeyDown, activeState.onKeyDown)}
            onKeyUp={chain(rest.onKeyUp, activeState.onKeyUp)}
        />
    );
});
