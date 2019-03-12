/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import classNames from 'classnames';
import * as React from 'react';

import {chain} from '../../utils/chain';
import {Omit} from '../../utils/omit';
import {Ref, chainRefs} from '../../utils/set-ref';
import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {createIcon} from '../icon';

import * as styles from './hidden-scrollbar.module.css';

const DEFAULT_SCROLL_STEP = 26;
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
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
    /** Reference to scrollable container */
    containerRef?: Ref<HTMLDivElement>;
    /** Properties of start scroll control */
    startControlProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;
    /** Reference to start scroll control */
    startControlRef?: Ref<HTMLDivElement>;
    /** Properties of end scroll control */
    endControlProps?: Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>;
    /** Reference to end scroll control */
    endControlRef?: Ref<HTMLDivElement>;
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
 * This component is using flexbox model. If you will use `max-height` to limit
 * height of container wrap it by element with `display: flex; flex-direction: row`
 * styles. @see https://git.io/fhjPt
 */

export class HiddenScrollbar extends React.Component<Props> {
    /** This timer starts when user hover on the edge scroll controls */
    private scrollIntervalId: number | null = null;
    /** Container that have scroll */
    private containerRef = React.createRef<HTMLDivElement>();
    /** Scroll controls that initiate scrolling on hover */
    private startControlRef = React.createRef<HTMLDivElement>();
    private endControlRef = React.createRef<HTMLDivElement>();
    private animationRequestId: number | null = null;

    public componentDidMount() {
        this.updateContainer();
    }

    public componentDidUpdate() {
        this.updateContainer();
    }

    public componentWillUnmount() {
        this.cancelAnimationFrame();
        this.clearScrollInterval();
    }

    private cancelAnimationFrame() {
        if (this.animationRequestId) {
            window.cancelAnimationFrame(this.animationRequestId);
            this.animationRequestId = null;
        }
    }

    private requestAnimationFrame(callback: () => void) {
        this.cancelAnimationFrame();
        this.animationRequestId = window.requestAnimationFrame(callback);
    }

    private clearScrollInterval() {
        if (this.scrollIntervalId) {
            window.clearInterval(this.scrollIntervalId);
            this.scrollIntervalId = null;
        }
    }

    private setScrollInterval(callback: () => void) {
        this.clearScrollInterval();
        const {scrollStepTimeout = DEFAULT_SCROLL_STEP_TIMEOUT} = this.props;
        this.scrollIntervalId = window.setInterval(callback, scrollStepTimeout);
        callback();
    }

    /**
     * We should hide scroll controls when they are not necessary:
     * - in edge positions (the top or the bottom)
     * - when scroll container does not have scroll
     */
    private updateContainer() {
        this.requestAnimationFrame(() => {
            const container = this.containerRef.current;
            const startControl = this.startControlRef.current;
            const endControl = this.endControlRef.current;

            if (!container || !startControl || !endControl) {
                return;
            }

            const {scrollTop, scrollHeight, clientHeight} = container;

            startControl.style.display = scrollTop === 0 ? 'none' : 'flex';

            /**
             * @HACK
             * Sometimes in EDGE `scrollHeight` is grater than `clientHeight` with 1 pixel.
             */
            endControl.style.display =
                scrollTop >= scrollHeight - clientHeight - 1 ? 'none' : 'flex';
        });
    }

    private handleScroll = () => {
        this.updateContainer();
    };

    /**
     * To prevent partial hiding focused elements below the scroll controls
     * we should move the focused element to visible area in the scroll container.
     */
    private handleFocus: React.HTMLAttributes<HTMLDivElement>['onFocus'] = (event) => {
        const container = this.containerRef.current;
        const startControl = this.startControlRef.current;
        const endControl = this.endControlRef.current;

        if (!container || !startControl || !endControl) {
            return;
        }

        const focusedElement = event.target;

        if (!focusedElement.previousElementSibling) {
            container.scrollTop = 0;

            return;
        }

        if (!focusedElement.nextElementSibling) {
            container.scrollTop = container.scrollHeight - container.clientHeight;

            return;
        }

        const viewportTop = startControl.getBoundingClientRect().bottom;
        const viewportBottom = endControl.getBoundingClientRect().top;

        const elementRect = event.target.getBoundingClientRect();

        const {scrollTop} = container;

        if (elementRect.top < viewportTop) {
            container.scrollTop = scrollTop + elementRect.top - viewportTop;

            return;
        }

        if (elementRect.bottom > viewportBottom) {
            container.scrollTop = scrollTop + elementRect.bottom - viewportBottom;

            return;
        }
    };

    /** Starts scroll changing interval whe user hovers to the scroll controls */
    private handleStartScrollElementMouseEnter = () => {
        this.setScrollInterval(() => {
            const container = this.containerRef.current;

            if (!container) {
                return;
            }

            const {scrollStep = DEFAULT_SCROLL_STEP} = this.props;
            const {scrollTop} = container;
            container.scrollTop = Math.max(scrollTop - scrollStep, 0);
        });
    };

    private handleEndControlMouseEnter = () => {
        this.setScrollInterval(() => {
            const container = this.containerRef.current;

            if (!container) {
                return;
            }

            const {scrollStep = DEFAULT_SCROLL_STEP} = this.props;
            const {scrollTop, scrollHeight, clientHeight} = container;
            const maxScrollTop = scrollHeight - clientHeight;
            container.scrollTop = Math.min(scrollTop + scrollStep, maxScrollTop);
        });
    };

    /** Stop scroll changing interval when mouse leaves scroll controls */
    private handleStartScrollElementMouseLeave = () => {
        this.clearScrollInterval();
    };

    private handleEndControlMouseLeave = () => {
        this.clearScrollInterval();
    };

    public render() {
        const {
            scrollStep,
            scrollStepTimeout,
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
        } = mergeClassesProps(this.props, styles);

        return (
            <div
                {...rest}
                className={classNames(className, classes.root)}
                onFocus={chain(rest.onFocus, this.handleFocus)}
            >
                <div
                    {...containerProps}
                    ref={chainRefs(containerRef, this.containerRef)}
                    onScroll={chain(containerProps.onScroll, this.handleScroll)}
                    className={classNames(containerProps.className, classes.container)}
                >
                    {children}
                </div>
                <div
                    {...startControlProps}
                    ref={chainRefs(startControlRef, this.startControlRef)}
                    onMouseEnter={chain(
                        startControlProps.onMouseEnter,
                        this.handleStartScrollElementMouseEnter
                    )}
                    onMouseLeave={chain(
                        startControlProps.onMouseLeave,
                        this.handleStartScrollElementMouseLeave
                    )}
                    className={classNames(startControlProps.className, classes.startControl)}
                >
                    <ScrollDirectionIcon className={classes.startControlIcon} />
                </div>
                <div
                    {...endControlProps}
                    ref={chainRefs(endControlRef, this.endControlRef)}
                    className={classNames(endControlProps.className, classes.endControl)}
                    onMouseEnter={chain(
                        endControlProps.onMouseEnter,
                        this.handleEndControlMouseEnter
                    )}
                    onMouseLeave={chain(
                        endControlProps.onMouseLeave,
                        this.handleEndControlMouseLeave
                    )}
                >
                    <ScrollDirectionIcon className={classes.endControlIcon} />
                </div>
            </div>
        );
    }
}
