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

import {chainRefs} from '../../utils';
import {chain} from '../../utils/chain';
import {reflow} from '../../utils/reflow';
import {mergeClassesProps, WithClasses} from '../../utils/styles';

import * as styles from './slide.module.css';

const DURATION_TIMEOUT = 300;
const FAST_DURATION_TIMEOUT = 160;

type TargetProps = Omit<TransitionProps<HTMLElement>, 'timeout' | 'children'>;
type Children = React.ReactElement<{className?: string; ref?: React.Ref<unknown>}>;

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
export const Slide = React.forwardRef<HTMLElement, Props>(function Slide(props, ref) {
    const {
        className,
        classes,
        children,
        direction = 'left',
        fast,
        ...rest
    } = mergeClassesProps(props, styles);
    const child = React.Children.only(children) as Children;

    const requestId = React.useRef<number | null>(null);
    const nodeRef = React.useRef<HTMLElement>(null);

    function cancelAnimationFrame() {
        if (requestId.current) {
            window.cancelAnimationFrame(requestId.current);
        }
    }

    function requestAnimationFrame(callback: () => void) {
        cancelAnimationFrame();
        requestId.current = window.requestAnimationFrame(callback);
    }

    React.useEffect(() => cancelAnimationFrame, []);

    const handleEnter: Props['onEnter'] = () => {
        const node = nodeRef.current;

        if (!node) {
            return;
        }

        node.classList.remove(classes.enter);
        node.classList.add(
            classNames({
                [classes.exitLeft]: direction === 'left',
                [classes.exitRight]: direction === 'right',
                [classes.exitTop]: direction === 'top',
                [classes.exitBottom]: direction === 'bottom'
            })
        );

        requestAnimationFrame(() => {
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

    const handleExit: Props['onExit'] = () => {
        const node = nodeRef.current;

        if (!node) {
            return;
        }

        node.classList.remove(classes.exitLeft);
        node.classList.remove(classes.exitRight);
        node.classList.remove(classes.exitTop);
        node.classList.remove(classes.exitBottom);

        node.classList.add(classes.enter);

        requestAnimationFrame(() => {
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

    return (
        <Transition
            {...rest}
            timeout={fast ? FAST_DURATION_TIMEOUT : DURATION_TIMEOUT}
            onEnter={chain(rest.onEnter, handleEnter)}
            onExit={chain(rest.onExit, handleExit)}
            nodeRef={nodeRef}
        >
            {React.cloneElement(child, {
                className: classNames(className, child.props.className, {
                    [classes.enter]: rest.in,
                    [classes.fast]: fast,
                    [classes.exitLeft]: !rest.in && direction === 'left',
                    [classes.exitRight]: !rest.in && direction === 'right',
                    [classes.exitTop]: !rest.in && direction === 'top',
                    [classes.exitBottom]: !rest.in && direction === 'bottom'
                }),
                ref: chainRefs(nodeRef, ref)
            })}
        </Transition>
    );
});
