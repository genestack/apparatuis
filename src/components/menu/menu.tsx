/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {Omit} from '../../utils/omit';
import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {wrapPureComponent} from '../../utils/wrap-pure-component';
import {FocusTrap} from '../focus-trap';
import {List, ListProps} from '../list';
import {Overlay, OverlayProps} from '../overlay';
import {Popover, PopoverProps} from '../popover';

import {MenuFocusTrap} from './menu-focus-trap';
import * as styles from './menu.module.css';

const PureList = wrapPureComponent(List);

type TargetProps = Omit<ListProps, 'classes'>;

type RestOverlayProps = Omit<OverlayProps, 'invisible' | 'open'>;
type RestPopoverProps = Omit<
    PopoverProps,
    'referenceElement' | 'open' | 'withArrow' | 'positionFixed' | 'placement'
>;

/** Menu public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    open: boolean;
    onClose: OverlayProps['onClose'];
    referenceElement: PopoverProps['referenceElement'];
    placement?: PopoverProps['placement'];

    overlayProps?: RestOverlayProps;
    popoverProps?: RestPopoverProps;
    popoverRef?: React.Ref<Popover>;
}

const popperProps: PopoverProps['popperProps'] = {
    modifiers: {
        preventOverflow: {
            boundariesElement: 'viewport'
        }
    }
};

/**
 * A Menu displays a list of choices on a temporary surface.
 * They appear when users interact with a button, action, or other control.
 */
export class Menu extends React.Component<Props> {
    private focusTrapRef = React.createRef<FocusTrap>();

    public componentDidMount() {
        const focusTrap = this.focusTrapRef.current;

        if (this.props.open && focusTrap) {
            focusTrap.focus();
        }
    }

    public componentDidUpdate(props: Props) {
        const focusTrap = this.focusTrapRef.current;

        if (this.props.open && !props.open && focusTrap) {
            focusTrap.focus();
        }
    }

    public render() {
        const {
            open,
            onClose,
            referenceElement,
            placement = 'bottom-start',
            popoverProps = {},
            popoverRef,
            // tslint:disable-next-line no-object-literal-type-assertion
            overlayProps = {} as RestOverlayProps,
            className,
            classes,
            ...listProps
        } = mergeClassesProps(this.props, styles);

        return (
            <Overlay
                {...overlayProps}
                open={open}
                onClose={onClose}
                invisible
                className={classNames(overlayProps.className, classes.overlay)}
            >
                <Popover
                    {...popoverProps}
                    referenceElement={referenceElement}
                    open={open}
                    placement={placement}
                    positionFixed
                    className={classNames(className, classes.root)}
                    classes={{root: classes.popover}}
                    ref={popoverRef}
                    popperProps={popperProps}
                >
                    <MenuFocusTrap focusTrapRef={this.focusTrapRef}>
                        <PureList {...listProps} />
                    </MenuFocusTrap>
                </Popover>
            </Overlay>
        );
    }
}
