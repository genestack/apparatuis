/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';
import CSSTransition, {CSSTransitionProps} from 'react-transition-group/CSSTransition';

import {Omit} from '../../utils/omit';
import {OmitIndexSignature} from '../../utils/omit-index-signature';

import * as styles from './fade.module.css';

const DURATION_TIMEOUT = 200;

type TargetProps = Omit<OmitIndexSignature<CSSTransitionProps>, 'classNames' | 'timeout'> & {
    className?: string;
};

interface ChildrenProps {
    className?: string;
}

/** Public Fade properties */
export interface Props extends TargetProps {
    children: React.ReactElement<ChildrenProps>;
}

const classNames: CSSTransitionProps['classNames'] = {
    enter: styles.enter,
    enterDone: styles.enterDone,
    exit: styles.exit,
    exitDone: styles.exitDone
};

/**
 * Fade transition component is used for smoothed showing and hiding elements through opacity.
 *
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
export const Fade = (props: Props) => (
    <CSSTransition
        {...props}
        className={styles.root}
        classNames={classNames}
        timeout={DURATION_TIMEOUT}
    />
);
