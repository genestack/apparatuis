/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {Omit} from '../../utils/omit';
import {OverridableComponent, OverridableProps} from '../../utils/overridable-component';
import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {ButtonBaseProps, ButtonBase} from '../button-base';

import {ButtonContext} from './button-context';
import * as styles from './button.module.css';

type ButtonBaseClassNames = keyof Exclude<ButtonBaseProps['classes'], undefined>;
type ButtonClassNames = keyof typeof styles;

/** Button public properties */
export interface Props
    extends Omit<ButtonBaseProps, 'classes'>,
        WithClasses<ButtonBaseClassNames | ButtonClassNames> {
    /** Component that is inserted in the left side of the button. */
    icon?: React.ReactNode;
    /** If `true` text in the button is wrapped */
    wrap?: boolean;
    /** Size of button */
    size?: 'normal' | 'small' | 'tiny';
    /** If `true` button will have fully-rounded border */
    rounded?: boolean;
}

interface TypeMap {
    props: Props;
    defaultType: 'button';
}

/**
 * Button component
 *
 * @example ./all-button-combinations.md
 */
export const Button: OverridableComponent<TypeMap> = React.forwardRef<
    HTMLButtonElement,
    OverridableProps<TypeMap>
    // tslint:disable-next-line: no-shadowed-variable
>(function Button(props, ref) {
    const buttonContext = React.useContext(ButtonContext);

    const {
        ghost = buttonContext.ghost,
        intent = buttonContext.intent,
        size = buttonContext.size,
        icon,
        children,
        wrap,
        rounded,
        classes,
        ...rest
    } = mergeClassesProps(props, styles);

    return (
        <ButtonBase
            data-qa="button"
            ref={ref}
            // use default tabIndex to enable focusing
            tabIndex={0}
            {...rest}
            ghost={ghost}
            intent={intent}
            classes={classes}
            className={classNames(rest.className, classes.root, buttonContext.className, {
                [classes.small]: size === 'small',
                [classes.tiny]: size === 'tiny',
                [classes.rounded]: rounded
            })}
        >
            {icon ? (
                <span
                    className={classNames(classes.icon, {
                        [classes.singleIcon]: !children
                    })}
                >
                    {icon}
                </span>
            ) : null}
            <span
                className={classNames(classes.text, {
                    [classes.nowrap]: !wrap
                })}
            >
                {children}
            </span>
        </ButtonBase>
    );
});
