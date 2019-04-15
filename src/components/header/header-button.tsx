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
import {getReachableElements, getSiblingElement} from '../../utils/focusable-elements';
import {Omit} from '../../utils/omit';
import {mergeClassesProps, WithClasses} from '../../utils/styles';
import {ButtonBase, ButtonBaseProps} from '../button-base';

import * as styles from './header-button.module.css';
import {HeaderItem, Props as HeaderItemProps} from './header-item';
import {HeaderItemText} from './header-item-text';

type TargetProps = Omit<ButtonBaseProps<HeaderItemProps>, 'activeClassName'>;

/** HeaderButton public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /** Element has pressed styles if `true` is passed */
    active?: boolean;
    /**
     * Properties of `fakeHover` helper element.
     * @see ./header-button.module.css
     */
    fakeHoverProps?: React.HTMLAttributes<HTMLDivElement>;
}

/**
 * `HeaderButton` is interactive element of `Header`.
 * By default it is not a native button because it could have nested buttons.
 * For add nested buttons use `HeaderButtonSecondaryActions`.
 */
export class HeaderButton extends React.Component<Props> {
    private handleKeyDown: Props['onKeyDown'] = (event) => {
        if (event.defaultPrevented) {
            return;
        }

        const item = event.currentTarget;

        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            const direction = event.key === 'ArrowRight' ? 'next' : 'prev';

            event.preventDefault();

            const reachableElements =
                item.parentElement && Array.from(getReachableElements(item.parentElement));
            const nextItem =
                reachableElements && getSiblingElement(reachableElements, item, direction);

            if (nextItem) {
                nextItem.focus();
            }
        }
    };

    public render() {
        const {active, disabled, classes, fakeHoverProps = {}, ...rest} = mergeClassesProps(
            this.props,
            styles
        );

        const buttonBaseProps: ButtonBaseProps = {
            disabled,
            activeClassName: classes.active
        };

        const children =
            typeof rest.children === 'string' ? (
                <HeaderItemText>{rest.children}</HeaderItemText>
            ) : (
                rest.children
            );

        const fakeHoverElement = (
            <div
                {...fakeHoverProps}
                className={classNames(fakeHoverProps.className, classes.fakeHover)}
            />
        );

        return (
            <HeaderItem
                {...rest}
                as={ButtonBase}
                {...buttonBaseProps}
                onKeyDown={chain(rest.onKeyDown, this.handleKeyDown)}
                className={classNames(rest.className, classes.root, {
                    [classes.active]: active,
                    [classes.disabled]: disabled
                })}
            >
                {children}
                {fakeHoverElement}
            </HeaderItem>
        );
    }
}
