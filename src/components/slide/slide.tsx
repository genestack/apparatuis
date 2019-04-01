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
const FAST_DURATION_TIMEOUT = 160;

type StrictCSSTransitionProps = OmitIndexSignature<TransitionProps>;
type TargetProps = Omit<StrictCSSTransitionProps, 'timeout' | 'children'>;
type Children = React.ReactElement<{className?: string}>;

/** Public Slide properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /** Slide transition direction */
    direction?: 'left' | 'right' | 'top' | 'bottom';
    children: Children;
    /** If `true` transition will be faster. */
    fast?: boolean;
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
        const {classes, direction = 'left'} = mergeClassesProps(this.props, styles);

        node.classList.remove(classes.enter);
        node.classList.add(
            classNames({
                [classes.exitLeft]: direction === 'left',
                [classes.exitRight]: direction === 'right',
                [classes.exitTop]: direction === 'top',
                [classes.exitBottom]: direction === 'bottom'
            })
        );

        this.requestAnimationFrame(() => {
            node.classList.remove(classes.exiting);
            node.classList.add(classes.entering);
            reflow(node);
            node.classList.remove(classes.exitLeft);
            node.classList.remove(classes.exitRight);
            node.classList.remove(classes.exitTop);
            node.classList.remove(classes.exitBottom);
            node.classList.add(classes.enter);
        });
    };

    private handleExit: Props['onExit'] = (node) => {
        const {classes} = mergeClassesProps(this.props, styles);

        node.classList.remove(classes.exitLeft);
        node.classList.remove(classes.exitRight);
        node.classList.remove(classes.exitTop);
        node.classList.remove(classes.exitBottom);

        node.classList.add(classes.enter);

        this.requestAnimationFrame(() => {
            const {direction = 'left'} = this.props;
            node.classList.remove(classes.entering);
            node.classList.add(classes.exiting);
            reflow(node);
            node.classList.remove(classes.enter);
            node.classList.add(
                classNames({
                    [classes.exitLeft]: direction === 'left',
                    [classes.exitRight]: direction === 'right',
                    [classes.exitTop]: direction === 'top',
                    [classes.exitBottom]: direction === 'bottom'
                })
            );
        });
    };

    public render() {
        const {className, classes, children, direction = 'left', fast, ...rest} = mergeClassesProps(
            this.props,
            styles
        );
        const child = React.Children.only(children) as Children;

        return (
            <Transition
                {...rest}
                timeout={fast ? FAST_DURATION_TIMEOUT : DURATION_TIMEOUT}
                onEnter={chain(rest.onEnter, this.handleEnter)}
                onExit={chain(rest.onExit, this.handleExit)}
            >
                {React.cloneElement(child, {
                    className: classNames(className, child.props.className, {
                        [classes.enter]: rest.in,
                        [classes.fast]: fast,
                        [classes.exitLeft]: !rest.in && direction === 'left',
                        [classes.exitRight]: !rest.in && direction === 'right',
                        [classes.exitTop]: !rest.in && direction === 'top',
                        [classes.exitBottom]: !rest.in && direction === 'bottom'
                    })
                })}
            </Transition>
        );
    }
}
