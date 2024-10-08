/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import * as styles from './header-block.module.css';
import {HeaderItemText, Props as HeaderItemTextProps} from './header-item-text';

type TargetProps = React.HTMLAttributes<HTMLElement>;

/** HeaderBlock public properties */
export interface Props extends TargetProps {
    /** If `true` flex item will grow */
    grow?: boolean;
    /** If `true` flex item will shrink */
    shrink?: boolean;
    /**
     * Target element that will be rendered.
     * `div` by default
     */
    as?: React.ElementType;
    headerItemTextProps?: HeaderItemTextProps;
}

/**
 * Use HeaderBlock if you want to show some non-interactive information
 * in the Header.
 */
export const HeaderBlock = React.forwardRef<HTMLElement, Props>(function HeaderBlock(props, ref) {
    const {as: Component = 'div', grow, shrink, headerItemTextProps, ...rest} = props;

    const children =
        typeof props.children === 'string' ? (
            <HeaderItemText {...headerItemTextProps}>{props.children}</HeaderItemText>
        ) : (
            props.children
        );

    return (
        <Component
            data-qa="header-block"
            {...rest}
            className={classNames(rest.className, styles.root, {
                [styles.grow]: grow,
                [styles.shrink]: shrink
            })}
            ref={ref}
        >
            {children}
        </Component>
    );
});
