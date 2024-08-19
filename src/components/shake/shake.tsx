/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';
import CSSTransition, {CSSTransitionProps} from 'react-transition-group/CSSTransition';

import {OmitIndexSignature} from '../../utils/omit-index-signature';
import {mergeClassesProps, WithClasses} from '../../utils/styles';

import * as styles from './shake.module.css';

type StrictCSSTransitionProps = OmitIndexSignature<CSSTransitionProps>;

const TRANSITION_TIMEOUT: StrictCSSTransitionProps['timeout'] = {
    enter: 350,
    exit: 0
};

type TargetProps = Omit<StrictCSSTransitionProps, 'classNames' | 'timeout' | 'children'>;

/** Public Shake properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    children: React.ReactElement<{className?: string; ref?: React.Ref<unknown>}>;
}

/**
 * Shake transition is used to shake elements.
 * Useful for indicating to user about wrong values of inputs or impossible actions.
 *
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 *
 * This transition does not have exit stage. So pass `onEntered` callback
 * to subscribe shake transition complete.
 */
export const Shake = React.forwardRef<HTMLElement, Props>(function Shake(props, ref) {
    const {className, classes, ...rest} = mergeClassesProps(props, styles);
    const child = React.Children.only(props.children);

    return (
        <CSSTransition
            {...rest}
            classNames={{
                enter: classes.enter,
                enterDone: classes.enterDone
            }}
            timeout={TRANSITION_TIMEOUT}
        >
            {React.cloneElement(child, {
                className: classNames(className, child.props.className, classes.root),
                ref
            })}
        </CSSTransition>
    );
});
