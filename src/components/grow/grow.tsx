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

import * as styles from './grow.module.css';

const DURATION_TIMEOUT = 300;

type TargetProps = Omit<TransitionProps<HTMLElement>, 'timeout' | 'children'>;
type Children = React.ReactElement<{className?: string; ref?: React.Ref<unknown>}>;

/** Transform origin of Grow transition */
export type GrowTransformOrigin =
    | 'center center'
    | 'center left'
    | 'center right'
    | 'top center'
    | 'top left'
    | 'top right'
    | 'bottom center'
    | 'bottom left'
    | 'bottom right';

const getTransformOriginClassName = (
    transformOrigin?: GrowTransformOrigin
): keyof typeof styles => {
    if (transformOrigin === 'center left') {
        return 'centerLeft';
    }
    if (transformOrigin === 'center right') {
        return 'centerRight';
    }
    if (transformOrigin === 'top center') {
        return 'topCenter';
    }
    if (transformOrigin === 'top left') {
        return 'topLeft';
    }
    if (transformOrigin === 'top right') {
        return 'topRight';
    }
    if (transformOrigin === 'bottom center') {
        return 'bottomCenter';
    }
    if (transformOrigin === 'bottom left') {
        return 'bottomLeft';
    }
    if (transformOrigin === 'bottom right') {
        return 'bottomRight';
    }

    return 'centerCenter';
};

/** Public Grow properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    children: Children;
    /** Defines which origin is used for transform */
    transformOrigin?: GrowTransformOrigin;
}

/**
 * Grow transition component.
 *
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
export const Grow = React.forwardRef<HTMLElement, Props>(function Grow(props, ref) {
    const {
        className,
        classes,
        transformOrigin = 'center center',
        children,
        ...rest
    } = mergeClassesProps(props, styles);
    const child = React.Children.only(children) as Children;

    const transformOriginClassName = classes[getTransformOriginClassName(transformOrigin)];

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
        node.classList.add(classes.exit);

        requestAnimationFrame(() => {
            node.classList.remove(classes.exiting);
            node.classList.add(classes.entering);
            reflow(node);
            node.classList.remove(classes.exit);
            node.classList.add(classes.enter);
        });
    };

    const handleExit: Props['onExit'] = () => {
        const node = nodeRef.current;

        if (!node) {
            return;
        }

        node.classList.remove(classes.exit);
        node.classList.add(classes.enter);

        requestAnimationFrame(() => {
            node.classList.remove(classes.entering);
            node.classList.add(classes.exiting);
            reflow(node);
            node.classList.remove(classes.enter);
            node.classList.add(classes.exit);
        });
    };

    return (
        <Transition
            {...rest}
            timeout={DURATION_TIMEOUT}
            onEnter={chain(rest.onEnter, handleEnter)}
            onExit={chain(rest.onExit, handleExit)}
            nodeRef={nodeRef}
        >
            {React.cloneElement(child, {
                className: classNames(className, child.props.className, transformOriginClassName, {
                    [classes.enter]: rest.in,
                    [classes.exit]: !rest.in
                }),
                ref: chainRefs(nodeRef, ref)
            })}
        </Transition>
    );
});
