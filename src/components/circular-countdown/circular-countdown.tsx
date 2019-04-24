/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';
import Transition, {TransitionProps, TransitionStatus} from 'react-transition-group/Transition';

import {chain} from '../../utils/chain';
import {Omit} from '../../utils/omit';
import {OmitIndexSignature} from '../../utils/omit-index-signature';
import {reflow} from '../../utils/reflow';
import {WithClasses, mergeClassesProps} from '../../utils/styles';

import * as styles from './circular-countdown.module.css';

const DEFAULT_ENTER_DURATION = 6000;
const EXIT_DURATION = 120;

const DIAMETER = 24;
const STROKE_WIDTH = 1.5;
const CIRCLE_RADIUS = (DIAMETER - STROKE_WIDTH) / 2;
// tslint:disable-next-line: no-magic-numbers
const CIRCLE_PERIMETER = (CIRCLE_RADIUS * 2 * Math.PI).toFixed(3);

type StrictTransitionProps = OmitIndexSignature<TransitionProps>;
type TargetProps = Omit<React.SVGAttributes<SVGSVGElement>, 'in'>;

/** CircularCountdown public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /**
     * It `true` time is counting down.
     * `ReactTransition.in` alias.
     */
    in?: boolean;
    /** Counting down duration */
    duration?: number;
    /** Is called when counting down has completed */
    onComplete?: () => void;
    /** Transition component properties */
    transitionProps?: Omit<StrictTransitionProps, 'timeout' | 'children' | 'in'>;
    /** SVG Circle element properties that is used for countdown indicator */
    circleProps?: React.SVGAttributes<SVGCircleElement>;
}

/**
 * Circular Countdown is a SVG element which uses
 * [Transition Component](https://github.com/reactjs/react-transition-group)
 * and indicates how much time is left by contrast circle.
 */
export class CircularCountdown extends React.Component<Props> {
    private getCircleStyles(status: TransitionStatus): React.CSSProperties {
        const {duration = DEFAULT_ENTER_DURATION} = this.props;

        const defaultStyle: React.CSSProperties = {
            strokeDasharray: CIRCLE_PERIMETER,
            strokeDashoffset: 0,
            transition: `stroke-dashoffset ${duration}ms linear`
        };

        const enteringStyle: React.CSSProperties = {
            strokeDashoffset: `-${CIRCLE_PERIMETER}px`
        };

        const enteredStyle: React.CSSProperties = {
            strokeDashoffset: `-${CIRCLE_PERIMETER}px`
        };

        const exitingStyle: React.CSSProperties = {
            strokeDashoffset: 0,
            transition: `stroke-dashoffset ${EXIT_DURATION}ms linear`
        };

        const exitedStyle: React.CSSProperties = {
            strokeDashoffset: 0
        };

        return {
            ...defaultStyle,
            ...(status === 'entering' && enteringStyle),
            ...(status === 'entered' && enteredStyle),
            ...(status === 'exiting' && exitingStyle),
            ...(status === 'exited' && exitedStyle)
        };
    }
    public render() {
        const {
            in: transitionIn,
            onComplete,
            transitionProps = {},
            circleProps = {},
            duration = DEFAULT_ENTER_DURATION,
            classes,
            ...rest
        } = mergeClassesProps(this.props, styles);

        const timeout: TransitionProps['timeout'] = {
            enter: duration,
            exit: EXIT_DURATION
        };

        return (
            <svg
                viewBox={`0 0 ${DIAMETER} ${DIAMETER}`}
                {...rest}
                className={classNames(rest.className, classes.root)}
            >
                <Transition
                    {...transitionProps}
                    timeout={timeout}
                    in={transitionIn}
                    onEnter={chain(transitionProps.onEnter, reflow)}
                    onEntered={chain(transitionProps.onEntered, onComplete)}
                >
                    {(status) => (
                        <circle
                            style={this.getCircleStyles(status)}
                            cx={DIAMETER / 2}
                            cy={DIAMETER / 2}
                            r={CIRCLE_RADIUS}
                            fill="none"
                            strokeWidth={STROKE_WIDTH}
                            {...circleProps}
                            className={classNames(circleProps.className, classes.progressCircle)}
                        />
                    )}
                </Transition>
            </svg>
        );
    }
}
