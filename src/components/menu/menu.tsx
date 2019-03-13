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
import {getFirstFocusableElement, getLastFocusableElement} from '../../utils/focusable-elements';
import {Omit} from '../../utils/omit';
import {chainRefs} from '../../utils/set-ref';
import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {Overlay, OverlayProps} from '../overlay';

import {MenuPopover, Props as MenuPopoverProps} from './menu-popover';
import * as styles from './menu.module.css';
import {SubMenu, Props as ListProps} from './sub-menu';

type TargetProps = Omit<ListProps, 'classes'>;

type RestOverlayProps = Omit<OverlayProps, 'invisible' | 'open'>;
type RestPopoverProps = Omit<
    MenuPopoverProps,
    'referenceElement' | 'open' | 'withArrow' | 'positionFixed' | 'placement'
>;

/** Menu public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    open: boolean;
    onClose: OverlayProps['onClose'];
    referenceElement: MenuPopoverProps['referenceElement'];
    placement?: MenuPopoverProps['placement'];
    overlayProps?: RestOverlayProps;
    popoverProps?: RestPopoverProps;
}

/**
 * A Menu displays a list of choices on a temporary surface.
 * They appear when users interact with a button, action, or other control.
 */
export class Menu extends React.Component<Props> {
    private paperRef = React.createRef<HTMLElement>();

    public componentDidMount() {
        const paper = this.paperRef.current;

        if (this.props.open && paper) {
            paper.focus();
        }
    }

    public componentDidUpdate(props: Props) {
        const paper = this.paperRef.current;

        if (this.props.open && !props.open && paper) {
            paper.focus();
        }
    }

    private handleKeyDown: MenuPopoverProps['onKeyDown'] = (event) => {
        const paper = this.paperRef.current;

        if (event.target !== event.currentTarget || !paper) {
            return;
        }

        let itemToFocus: HTMLElement | null = null;

        if (event.key === 'ArrowDown') {
            itemToFocus = getFirstFocusableElement(paper);
        }

        if (event.key === 'ArrowUp') {
            itemToFocus = getLastFocusableElement(paper);
        }

        if (itemToFocus) {
            event.preventDefault();
            itemToFocus.focus();
        }
    };

    public render() {
        const {
            open,
            onClose,
            referenceElement,
            placement = 'bottom-start',
            popoverProps = {},
            // tslint:disable-next-line no-object-literal-type-assertion
            overlayProps = {} as RestOverlayProps,
            classes,
            ...rest
        } = mergeClassesProps(this.props, styles);

        return (
            <Overlay
                {...overlayProps}
                open={open}
                onClose={onClose}
                invisible
                className={classNames(overlayProps.className, classes.overlay)}
            >
                <MenuPopover
                    {...popoverProps}
                    referenceElement={referenceElement}
                    open={open}
                    placement={placement}
                    positionFixed
                    rootRef={chainRefs(this.paperRef, popoverProps.rootRef)}
                    onKeyDown={chain(popoverProps.onKeyDown, this.handleKeyDown)}
                >
                    <SubMenu {...rest} />
                </MenuPopover>
            </Overlay>
        );
    }
}
