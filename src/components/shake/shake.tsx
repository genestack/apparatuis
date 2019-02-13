/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import {Omit} from '../../utils/omit';
import {StrictCSSTransitionProps} from '../../utils/react-css-transition-group-strict';

import * as styles from './shake.module.css';

const TRANSITION_TIMEOUT: StrictCSSTransitionProps['timeout'] = {
    enter: 350,
    exit: 0
};

type TargetProps = Omit<StrictCSSTransitionProps, 'className' | 'classNames' | 'timeout'>;

interface ChildrenProps {
    className?: string;
}

/** Public Shake properties */
export interface Props extends TargetProps {
    children: React.ReactElement<ChildrenProps>;
}

const classNames: StrictCSSTransitionProps['classNames'] = {
    enter: styles.enter,
    enterDone: styles.enterDone
};

/**
 * Shake transition is used to shake elements.
 * Useful for indicating to user about wrong values of inputs or impossible actions.
 *
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
export const Shake = (props: Props) => (
    <CSSTransition
        {...props}
        className={styles.root}
        classNames={classNames}
        timeout={TRANSITION_TIMEOUT}
    />
);
