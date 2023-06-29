/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {chain} from '../../utils/chain';
import {getReachableElements, getSiblingElement} from '../../utils/focusable-elements';
import {SlotProps} from '../../utils/slot-props';
import {mergeClassesProps, WithClasses} from '../../utils/styles';
import {InteractiveElement, InteractiveElementProps} from '../interactive-element';

import {HeaderBlock, Props as HeaderBlockProps} from './header-block';
import {HeaderItemText} from './header-item-text';
import * as styles from './header-item.module.css';

type TargetProps = React.AnchorHTMLAttributes<HTMLElement> &
    React.ButtonHTMLAttributes<HTMLElement> &
    HeaderBlockProps;

/** HeaderItem public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /** Element has pressed styles if `true` is passed */
    active?: boolean;
    /**
     * Properties of `fakeHover` helper element.
     * @see ./header-button.module.css
     */
    fakeHoverProps?: SlotProps<'div'>;
}

/**
 * `HeaderItem` is interactive element of `Header`.
 * By default it is not a native button because it could have nested buttons.
 * For add nested buttons use `HeaderItemSecondaryActions`.
 */
export class HeaderItem extends React.Component<Props> {
    private handleKeyDown: Props['onKeyDown'] = (event) => {
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
        const {
            active,
            disabled,
            classes,
            fakeHoverProps = {},
            ...rest
        } = mergeClassesProps(this.props, styles);

        const interactiveElementProps: Omit<InteractiveElementProps, 'inclusiveDisabled'> = {
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
            <HeaderBlock
                data-qa="header-item"
                {...rest}
                as={InteractiveElement}
                {...interactiveElementProps}
                onKeyDown={chain(rest.onKeyDown, this.handleKeyDown)}
                className={classNames(rest.className, classes.root, {
                    [classes.active]: active,
                    [classes.disabled]: disabled
                })}
            >
                {children}
                {fakeHoverElement}
            </HeaderBlock>
        );
    }
}
