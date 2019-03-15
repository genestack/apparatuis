/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';
import Transition, {TransitionProps} from 'react-transition-group/Transition';

import {chain} from '../../utils/chain';
import {Omit} from '../../utils/omit';
import {OmitIndexSignature} from '../../utils/omit-index-signature';
import {reflow} from '../../utils/reflow';
import {WithClasses, mergeClassesProps} from '../../utils/styles';

import * as styles from './slide.module.css';

const DURATION_TIMEOUT = 300;

type StrictCSSTransitionProps = OmitIndexSignature<TransitionProps>;
type TargetProps = Omit<StrictCSSTransitionProps, 'timeout' | 'children'>;
type Children = React.ReactElement<{className?: string}>;

/** Public Slide properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    children: Children;
}

/**
 * Slide transition component is used for smoothed showing and hiding elements through moving.
 *
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
export class Slide extends React.Component<Props> {
    private requestId: number | null = null;

    public componentWillUnmount() {
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
        }
    }

    private requestAnimationFrame(callback: () => void) {
        if (this.requestId) {
            cancelAnimationFrame(this.requestId);
        }
        this.requestId = requestAnimationFrame(callback);
    }

    private handleEnter: Props['onEnter'] = (node) => {
        const {classes} = mergeClassesProps(this.props, styles);

        node.classList.remove(classes.enter);
        node.classList.add(classes.exit);

        this.requestAnimationFrame(() => {
            node.classList.remove(classes.exiting);
            node.classList.add(classes.entering);
            reflow(node);
            node.classList.remove(classes.exit);
            node.classList.add(classes.enter);
        });
    };

    private handleExit: Props['onExit'] = (node) => {
        const {classes} = mergeClassesProps(this.props, styles);

        node.classList.remove(classes.exit);
        node.classList.add(classes.enter);

        this.requestAnimationFrame(() => {
            node.classList.remove(classes.entering);
            node.classList.add(classes.exiting);
            reflow(node);
            node.classList.remove(classes.enter);
            node.classList.add(classes.exit);
        });
    };

    public render() {
        const {className, classes, children, ...rest} = mergeClassesProps(this.props, styles);
        const child = React.Children.only(children) as Children;

        return (
            <Transition
                {...rest}
                timeout={DURATION_TIMEOUT}
                onEnter={chain(rest.onEnter, this.handleEnter)}
                onExit={chain(rest.onExit, this.handleExit)}
            >
                {React.cloneElement(child, {
                    className: classNames(className, child.props.className, {
                        [classes.enter]: rest.in,
                        [classes.exit]: !rest.in
                    })
                })}
            </Transition>
        );
    }
}
