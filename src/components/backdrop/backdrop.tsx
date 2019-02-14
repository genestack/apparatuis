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
import {WithClasses} from '../../utils/styles';
import {FadeProps, Fade} from '../fade';

import * as styles from './backdrop.module.css';

type TargetProps = React.HTMLAttributes<HTMLDivElement>;
type RootProps = Omit<FadeProps, 'in' | 'appear' | 'children'>;

/** Public Backdrop properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    open: boolean;
    /** If `true` the backdrop will have transparent background */
    invisible?: boolean;
    /** Properties of the `<Fade />` element */
    fadeProps?: RootProps;
}

interface State {
    mounted: boolean;
}

/**
 * Backdrop component is used for blocking page content when a modal is shown.
 * Container that uses Backdrop should have its own z-index and focus state,
 * because popovers or menus have greater `z-index` than dialog has.
 *
 * Can be transparent when rendering a popover or a menu.
 */
export class Backdrop extends React.Component<Props, State> {
    public state: State = {mounted: this.props.open};

    /** @HACK */
    /**
     * There is a bug in our version of `react-transition-group`.
     * https://git.io/fh7uq
     * `unmountOnExit: true` cause to disabled appear animation.
     * TODO: update `react-transition-group` package and remove the state.
     */
    public static getDerivedStateFromProps(props: Props, state: State): State {
        return {
            mounted: props.open || state.mounted
        };
    }

    private handleFadeExited = (node: HTMLElement) => {
        const {fadeProps} = this.props;
        if (fadeProps && fadeProps.onExited) {
            fadeProps.onExited(node);
        }

        this.setState({mounted: this.props.open});
    };

    public render() {
        const {open, invisible, className, fadeProps, ...rest} = this.props;
        const {mounted} = this.state;

        return mounted ? (
            <Fade in={open} {...fadeProps} appear onExited={this.handleFadeExited}>
                <div
                    {...rest}
                    className={classNames(className, styles.root, {[styles.invisible]: invisible})}
                />
            </Fade>
        ) : null;
    }
}
