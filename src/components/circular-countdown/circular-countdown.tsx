/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import style from 'dom-helpers/css';
import * as React from 'react';
import Transition, {
    TransitionActions,
    TransitionProps,
    TransitionStatus
} from 'react-transition-group/Transition';

import {chain} from '../../utils/chain';
import {OmitIndexSignature} from '../../utils/omit-index-signature';
import {reflow} from '../../utils/reflow';
import {SlotProps} from '../../utils/slot-props';
import {WithClasses, mergeClassesProps} from '../../utils/styles';

import * as styles from './circular-countdown.module.css';

const DEFAULT_ENTER_DURATION = 6000;
const EXIT_DURATION = 120;

const DIAMETER = 24;
const STROKE_WIDTH = 1.5;
const CIRCLE_RADIUS = (DIAMETER - STROKE_WIDTH) / 2;
const CIRCLE_PERIMETER = (CIRCLE_RADIUS * 2 * Math.PI).toFixed(3);

type StrictTransitionProps = OmitIndexSignature<TransitionProps> & TransitionActions;
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
    circleProps?: SlotProps<'circle'>;
}

/**
 * Circular Countdown is a SVG element which uses
 * [Transition Component](https://github.com/reactjs/react-transition-group)
 * and indicates how much time is left by contrast circle.
 */
export const CircularCountdown = React.forwardRef<HTMLElement, Props>(function CircularCountdown(
    props,
    ref
) {
    const {
        in: transitionIn,
        onComplete,
        transitionProps = {},
        circleProps = {},
        duration = DEFAULT_ENTER_DURATION,
        classes,
        ...rest
    } = mergeClassesProps(props, styles);

    const requestIdRef = React.useRef<number | null>(null);

    function cancelAnimationFrame() {
        if (requestIdRef.current) {
            window.cancelAnimationFrame(requestIdRef.current);
        }
    }

    function requestAnimationFrame(callback: () => void) {
        cancelAnimationFrame();
        requestIdRef.current = window.requestAnimationFrame(callback);
    }

    React.useEffect(() => cancelAnimationFrame, []);

    const timeout: TransitionProps['timeout'] = {
        enter: duration,
        exit: EXIT_DURATION
    };

    function getCircleStyles(status: TransitionStatus): React.CSSProperties {
        const defaultStyle: React.CSSProperties = {
            strokeDasharray: CIRCLE_PERIMETER,
            strokeDashoffset: '0',
            transition: `stroke-dashoffset ${duration}ms linear`
        };

        const enteringStyle: React.CSSProperties = {
            strokeDashoffset: `-${CIRCLE_PERIMETER}px`
        };

        const enteredStyle: React.CSSProperties = {
            strokeDashoffset: `-${CIRCLE_PERIMETER}px`
        };

        const exitingStyle: React.CSSProperties = {
            strokeDashoffset: '0',
            transition: `stroke-dashoffset ${EXIT_DURATION}ms linear`
        };

        const exitedStyle: React.CSSProperties = {
            strokeDashoffset: '0'
        };

        return {
            ...defaultStyle,
            ...(status === 'entering' && enteringStyle),
            ...(status === 'entered' && enteredStyle),
            ...(status === 'exiting' && exitingStyle),
            ...(status === 'exited' && exitedStyle)
        };
    }

    function setCircleStyles(node: Element, status: TransitionStatus) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (style as any)(node, getCircleStyles(status));
    }

    const handleEnter: TransitionProps['onEnter'] = (node) => {
        setCircleStyles(node, 'exited');

        requestAnimationFrame(() => {
            reflow(node);
            setCircleStyles(node, 'entering');

            requestAnimationFrame(() => {
                setCircleStyles(node, 'entered');
            });
        });
    };

    const handleExit: TransitionProps['onExit'] = (node) => {
        setCircleStyles(node, 'entered');

        requestAnimationFrame(() => {
            reflow(node);
            setCircleStyles(node, 'exiting');

            requestAnimationFrame(() => {
                setCircleStyles(node, 'exited');
            });
        });
    };

    return (
        <svg
            data-qa="circular-countdown"
            viewBox={`0 0 ${DIAMETER} ${DIAMETER}`}
            {...rest}
            className={classNames(rest.className, classes.root)}
            ref={ref as React.Ref<SVGSVGElement>}
        >
            <Transition
                {...transitionProps}
                timeout={timeout}
                in={transitionIn}
                onEnter={chain(transitionProps.onEnter, handleEnter)}
                onEntered={chain(transitionProps.onEntered, onComplete)}
                onExit={chain(transitionProps.onExit, handleExit)}
            >
                <circle
                    style={getCircleStyles(transitionIn ? 'entered' : 'exited')}
                    cx={DIAMETER / 2}
                    cy={DIAMETER / 2}
                    r={CIRCLE_RADIUS}
                    fill="none"
                    strokeWidth={STROKE_WIDTH}
                    {...circleProps}
                    className={classNames(circleProps.className, classes.progressCircle)}
                />
            </Transition>
        </svg>
    );
});
