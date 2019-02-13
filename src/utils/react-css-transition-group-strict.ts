/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import {CSSTransitionProps} from 'react-transition-group/CSSTransition';
import {
    TransitionProps,
    UNMOUNTED,
    EXITED,
    ENTERING,
    ENTERED,
    EXITING
} from 'react-transition-group/Transition';

import {OmitIndexSignature} from './omit-index-signature';

type TransitionStatus =
    | typeof UNMOUNTED
    | typeof EXITED
    | typeof ENTERING
    | typeof ENTERED
    | typeof EXITING;

interface ChildrenProps {
    className?: string;
}

/** This type could be removed after update `@types/react-transition-group` to `v2.0.15` */
type TransitionChildren =
    | React.ReactElement<ChildrenProps>
    | ((status: TransitionStatus) => React.ReactElement<ChildrenProps>);

interface FixType {
    children: TransitionChildren;
}

/** Strict version of CSSTransitionProps type from `react-transition-group` */
export type StrictCSSTransitionProps = OmitIndexSignature<CSSTransitionProps> & FixType;

/** Strict version of CSSTransitionProps type`react-transition-group` */
export type StrictTransitionProps = OmitIndexSignature<TransitionProps> & FixType;
