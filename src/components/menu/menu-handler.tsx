/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {chain} from '../../utils/chain';
import {RootRef} from '../root-ref';

import {Props as MenuProps} from './menu';

type MenuProp = (() => React.ReactElement<MenuProps>) | React.ReactElement<MenuProps>;

interface ChildProps {
    onClick?: React.EventHandler<React.SyntheticEvent>;
}

type ChildrenProp =
    | ((state: {open: boolean}) => React.ReactElement<ChildProps>)
    | React.ReactElement<ChildProps>;

/** MenuHandler public properties */
export interface Props {
    menu: MenuProp;
    children: ChildrenProp;
}

interface State {
    open: boolean;
    exited: boolean;
}

/**
 * UI Kit provides common menu handler that manages menu open state.
 * It opens menu by children click event and closes menu on a item click
 * that does not have subMenu.
 */
export class MenuHandler extends React.Component<Props, State> {
    private childRef = React.createRef<HTMLElement>();

    public state: State = {
        open: false,
        exited: true
    };

    public close() {
        this.setState({open: false});
    }

    public open() {
        this.setState({open: true, exited: false});
    }

    private handleMenuValueSelect: MenuProps['onValueSelect'] = (value, event, menuItem) => {
        if (!event.defaultPrevented && !menuItem.props.subMenu) {
            this.close();
        }
    };

    private handleReferenceClick: React.EventHandler<React.SyntheticEvent> = (event) => {
        if (!event.defaultPrevented) {
            this.open();
        }
    };

    private handleMenuClose = () => {
        this.close();
    };

    private handleMenuClosed = () => {
        this.setState({exited: true});
    };

    private renderChild() {
        const child = (typeof this.props.children === 'function'
            ? this.props.children({open: !this.state.exited})
            : this.props.children) as React.ReactElement<ChildProps>;

        const childProps: ChildProps = {
            onClick: chain(child.props.onClick, this.handleReferenceClick)
        };

        return React.cloneElement(child, childProps);
    }

    private renderMenu() {
        const {open} = this.state;
        const referenceElement = this.childRef.current;

        const menu = referenceElement
            ? typeof this.props.menu === 'function'
                ? this.props.menu()
                : this.props.menu
            : null;

        const menuProps: MenuProps | null =
            menu && referenceElement
                ? {
                      open,
                      referenceElement,
                      onClose: chain(menu.props.onClose, this.handleMenuClose),
                      onClosed: chain(menu.props.onClosed, this.handleMenuClosed),
                      onValueSelect: chain(menu.props.onValueSelect, this.handleMenuValueSelect)
                  }
                : null;

        return menu && menuProps ? React.cloneElement(menu, menuProps) : null;
    }

    public render() {
        return (
            <React.Fragment>
                <RootRef rootRef={this.childRef}>{this.renderChild()}</RootRef>
                {this.renderMenu()}
            </React.Fragment>
        );
    }
}
