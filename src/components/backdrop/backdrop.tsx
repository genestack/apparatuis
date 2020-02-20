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
import {Omit} from '../../utils/omit';
import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {FadeProps, Fade} from '../fade';

import * as styles from './backdrop.module.css';

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** Public Backdrop properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    open?: boolean;
    /** If `true` the backdrop will have transparent background */
    invisible?: boolean;
    /** Properties of the `<Fade />` element */
    fadeProps?: Omit<FadeProps, 'in' | 'appear' | 'children' | 'unmountOnExit'>;
    /** Calls when <Fade /> transition exited. */
    onExited?: () => void;
}

/**
 * Backdrop component is used for blocking page content when a modal is shown.
 * Container that uses Backdrop should have its own z-index and focus state,
 * because popovers or menus have greater `z-index` than dialog has.
 *
 * Can be transparent when rendering a popover or a menu.
 */
export class Backdrop extends React.Component<Props> {
    public render() {
        const {
            open,
            invisible,
            className,
            fadeProps = {},
            classes,
            onExited,
            ...rest
        } = mergeClassesProps(this.props, styles);

        return (
            <Fade
                {...fadeProps}
                in={open}
                appear
                unmountOnExit
                onExited={chain(fadeProps.onExited, onExited)}
            >
                <div
                    data-qa="backdrop"
                    {...rest}
                    className={classNames(className, classes.root, {
                        [classes.invisible]: invisible
                    })}
                />
            </Fade>
        );
    }
}
