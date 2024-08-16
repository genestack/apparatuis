/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import contains from 'dom-helpers/contains';
import * as React from 'react';

import {chain} from '../../utils/chain';
import {chainRefs} from '../../utils/set-ref';
import {SlotProps} from '../../utils/slot-props';
import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {createIcon} from '../icon';

import * as styles from './hidden-scrollbar.module.css';
import {scrollIntoContainerView} from './scroll-into-container-view';

const DEFAULT_SCROLL_STEP = 32;
const DEFAULT_SCROLL_STEP_TIMEOUT = 100;

const ScrollDirectionIcon = createIcon(
    <svg viewBox="0 0 16 16" fill="none">
        <path d="M8 6l4 4H4l4-4z" fill="#818181" />
    </svg>
);

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** HiddenScrollbar public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    /**
     * How many pixels should be added to or removed from
     * scroll position when user hovers to scroll controls
     */
    scrollStep?: number;
    /** How often scrollStep should be applied */
    scrollStepTimeout?: number;
    /** Properties of scrollable container */
    containerProps?: SlotProps<'div'>;
    /** Reference to scrollable container */
    containerRef?: React.Ref<HTMLDivElement>;
    /** Properties of start scroll control */
    startControlProps?: Omit<SlotProps<'div'>, 'children'>;
    /** Reference to start scroll control */
    startControlRef?: React.Ref<HTMLDivElement>;
    /** Properties of end scroll control */
    endControlProps?: Omit<SlotProps<'div'>, 'children'>;
    /** Reference to end scroll control */
    endControlRef?: React.Ref<HTMLDivElement>;
}

/**
 * The component customize native scrollbars to fancy look (just hide it)
 * but leaves native scroll functions.
 *
 * It regulates inner scroll position by focused items.
 * It has two scroll controls on the top and the bottom edges.
 * When user hovers to this controls the component start to scroll inner container
 * to certain direction.
 *
 * @WARNING
 * This component is using flexbox model. If you use `max-height` to limit height of container
 * you should wrap it by element with `display: flex; flex-direction: row`
 * styles. @see https://git.io/fhjPt
 */
export const HiddenScrollbar = React.forwardRef<HTMLDivElement, Props>(function HiddenScrollbar(
    props,
    ref
) {
    const {
        scrollStep = DEFAULT_SCROLL_STEP,
        scrollStepTimeout = DEFAULT_SCROLL_STEP_TIMEOUT,
        children,
        className,
        classes,
        containerProps = {},
        containerRef,
        startControlProps = {},
        startControlRef,
        endControlProps = {},
        endControlRef,
        ...rest
    } = mergeClassesProps(props, styles);

    const thisContainerRef = React.useRef<HTMLElement>(null);
    const thisStartControlRef = React.useRef<HTMLElement>(null);
    const thisEndControlRef = React.useRef<HTMLElement>(null);

    const requestId = React.useRef<number | null>(null);

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

    const scrollIntervalId = React.useRef<number | null>(null);

    function clearScrollInterval() {
        if (scrollIntervalId.current) {
            window.clearInterval(scrollIntervalId.current);
            scrollIntervalId.current = null;
        }
    }

    function setScrollInterval(callback: () => void) {
        clearScrollInterval();
        scrollIntervalId.current = window.setInterval(callback, scrollStepTimeout);
        callback();
    }

    React.useEffect(() => {
        updateContainer();
    });

    React.useEffect(
        () => () => {
            cancelAnimationFrame();
            clearScrollInterval();
        },
        []
    );

    /**
     * We should hide scroll controls when they are not necessary:
     * - in edge positions (the top or the bottom)
     * - when scroll container does not have scroll
     */
    function updateContainer() {
        requestAnimationFrame(() => {
            const container = thisContainerRef.current;
            const startControl = thisStartControlRef.current;
            const endControl = thisEndControlRef.current;

            if (!container || !startControl || !endControl) {
                return;
            }

            const {scrollTop, scrollHeight, clientHeight} = container;

            startControl.style.display = scrollTop === 0 ? 'none' : 'flex';

            /**
             * @HACK
             * Sometimes in EDGE `scrollHeight` is greater than `clientHeight` with 1 pixel.
             */
            endControl.style.display =
                scrollTop >= scrollHeight - clientHeight - 1 ? 'none' : 'flex';
        });
    }

    const handleScroll = () => {
        updateContainer();
    };

    /**
     * To prevent partial hiding focused elements below the scroll controls
     * we should move the focused element to visible area in the scroll container.
     */
    const handleFocus: React.HTMLAttributes<HTMLDivElement>['onFocus'] = (event) => {
        const container = thisContainerRef.current;
        const startControl = thisStartControlRef.current;
        const endControl = thisEndControlRef.current;
        const target = event.target;

        if (container && startControl && endControl && contains(container, target)) {
            scrollIntoContainerView({
                container,
                startControl,
                endControl,
                target
            });
        }
    };

    /** Starts scroll changing interval whe user hovers to the scroll controls */
    const handleStartScrollElementMouseEnter = () => {
        setScrollInterval(() => {
            const container = thisContainerRef.current;

            if (!container) {
                return;
            }

            const {scrollTop} = container;
            container.scrollTop = Math.max(scrollTop - scrollStep, 0);
        });
    };

    const handleEndControlMouseEnter = () => {
        setScrollInterval(() => {
            const container = thisContainerRef.current;

            if (!container) {
                return;
            }

            const {scrollTop, scrollHeight, clientHeight} = container;
            const maxScrollTop = scrollHeight - clientHeight;
            container.scrollTop = Math.min(scrollTop + scrollStep, maxScrollTop);
        });
    };

    /** Stop scroll changing interval when mouse leaves scroll controls */
    const handleStartScrollElementMouseLeave = () => {
        clearScrollInterval();
    };

    const handleEndControlMouseLeave = () => {
        clearScrollInterval();
    };

    return (
        <div
            {...rest}
            ref={ref}
            className={classNames(className, classes.root)}
            onFocus={chain(rest.onFocus, handleFocus)}
        >
            <div
                {...containerProps}
                ref={chainRefs(containerRef, thisContainerRef)}
                onScroll={chain(containerProps.onScroll, handleScroll)}
                className={classNames(containerProps.className, classes.container)}
            >
                {children}
            </div>
            <div
                {...startControlProps}
                ref={chainRefs(startControlRef, thisStartControlRef)}
                onMouseEnter={chain(
                    startControlProps.onMouseEnter,
                    handleStartScrollElementMouseEnter
                )}
                onMouseLeave={chain(
                    startControlProps.onMouseLeave,
                    handleStartScrollElementMouseLeave
                )}
                className={classNames(startControlProps.className, classes.startControl)}
            >
                <ScrollDirectionIcon className={classes.startControlIcon} />
            </div>
            <div
                {...endControlProps}
                ref={chainRefs(endControlRef, thisEndControlRef)}
                className={classNames(endControlProps.className, classes.endControl)}
                onMouseEnter={chain(endControlProps.onMouseEnter, handleEndControlMouseEnter)}
                onMouseLeave={chain(endControlProps.onMouseLeave, handleEndControlMouseLeave)}
            >
                <ScrollDirectionIcon className={classes.endControlIcon} />
            </div>
        </div>
    );
});
