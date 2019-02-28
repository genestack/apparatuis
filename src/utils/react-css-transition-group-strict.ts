/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import {CSSTransitionProps} from 'react-transition-group/CSSTransition';
import {TransitionProps} from 'react-transition-group/Transition';

import {OmitIndexSignature} from './omit-index-signature';

/** Strict version of CSSTransitionProps type from `react-transition-group` */
export type StrictCSSTransitionProps = OmitIndexSignature<CSSTransitionProps>;

/** Strict version of CSSTransitionProps type`react-transition-group` */
export type StrictTransitionProps = OmitIndexSignature<TransitionProps>;
