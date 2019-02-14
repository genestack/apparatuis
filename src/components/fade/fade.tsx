/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import {Omit} from '../../utils/omit';
import {StrictCSSTransitionProps} from '../../utils/react-css-transition-group-strict';
import {WithClasses, mergeClassesProps} from '../../utils/styles';

import * as styles from './fade.module.css';

const DURATION_TIMEOUT = 300;

type TargetProps = Omit<StrictCSSTransitionProps, 'classNames' | 'timeout' | 'children'>;

type Children = React.ReactElement<{className?: string}>;

/** Public Fade properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    children: Children;
}

/**
 * Fade transition component is used for smoothed showing and hiding elements through opacity.
 *
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */
export const Fade = (props: Props) => {
    const {className, classes, ...rest} = mergeClassesProps(props, styles);
    const child = React.Children.only(props.children) as Children;

    return (
        <CSSTransition
            {...rest}
            classNames={{
                appear: classes.appear,
                appearActive: classes.appearActive,
                enter: classes.enter,
                enterDone: classes.enterDone,
                exit: classes.exit,
                exitDone: classes.exitDone
            }}
            timeout={DURATION_TIMEOUT}
        >
            {React.cloneElement(child, {
                className: classNames(className, child.props.className, classes.root)
            })}
        </CSSTransition>
    );
};
