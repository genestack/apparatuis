/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable max-file-line-count
import classNames from 'classnames';
import * as React from 'react';

import {chain} from '../../utils/chain';
import {Omit} from '../../utils/omit';
import {Ref, chainRefs} from '../../utils/set-ref';
import {mergeClassesProps} from '../../utils/styles';
import {FocusTrap, FocusTrapProps} from '../focus-trap';
import {createIcon} from '../icon';

import * as styles from './menu-focus-trap.module.css';

const SCROLL_STEP = 26;
const SCROLL_STEP_TIMEOUT = 100;

const ScrollDirectionIcon = createIcon(
    <svg viewBox="0 0 16 16" fill="none">
        <path d="M8 6l4 4H4l4-4z" fill="#818181" />
    </svg>
);

type TargetProps = Omit<FocusTrapProps, 'enableSelfFocus'>;

/** MenuFocusTrap Public properties */
export interface Props extends TargetProps {
    focusTrapRef?: Ref<FocusTrap>;
}

/**
 * Menu help wrapper for FocusTrap.
 * It is in accountable to focusing menu items with keyboard control.
 * Also it regulates inner scroll position by focused items.
 *
 * Menu has two scroll controls on the top and the bottom edges.
 * When use hover to this controls the component start to scroll inner container
 * to certain direction.
 *
 * The component customize native scrollbars to fancy look (just hide it)
 * but leaves native scroll functions.
 */
export class MenuFocusTrap extends React.Component<Props> {
    /** This timer starts when user hover on the edge scroll controls */
    private scrollIntervalId: number | null = null;
    private focusTrapRef = React.createRef<FocusTrap>();
    /** Container that have scroll */
    private scrollContainerRef = React.createRef<HTMLDivElement>();
    /** Scroll controls that initiate scrolling on hover */
    private startScrollElementRef = React.createRef<HTMLDivElement>();
    private endScrollElementRef = React.createRef<HTMLDivElement>();
    private animationRequestId: number | null = null;

    public componentDidMount() {
        this.updateScrollContainer();
    }

    public componentDidUpdate() {
        this.updateScrollContainer();
    }

    public componentWillUnmount() {
        this.cancelAnimationFrame();
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
        this.scrollIntervalId = window.setInterval(callback, SCROLL_STEP_TIMEOUT);
        callback();
    }

    /**
     * We should hide scroll controls when they are not necessary:
     * - in edge positions (the top or the bottom)
     * - when scroll container does not have scroll
     */
    private updateScrollContainer() {
        this.requestAnimationFrame(() => {
            const scrollContainer = this.scrollContainerRef.current;
            const startScrollElement = this.startScrollElementRef.current;
            const endScrollElement = this.endScrollElementRef.current;

            if (!scrollContainer || !startScrollElement || !endScrollElement) {
                return;
            }

            const {scrollTop, scrollHeight, clientHeight} = scrollContainer;

            /**
             * Hide scroll controls by `height = 0` because we need to save
             * focus function on it for <FocusTrap />.
             * `display: none` prevents focusing.
             */
            startScrollElement.style.height = scrollTop === 0 ? '0' : '';
            /**
             * @HACK
             * Sometimes in EDGE `scrollHeight` is grater than `clientHeight` with 1 pixel.
             */
            endScrollElement.style.height = scrollTop >= scrollHeight - clientHeight - 1 ? '0' : '';
        });
    }

    private handleScroll = () => {
        this.updateScrollContainer();
    };

    /**
     * To prevent partial hiding focused elements below the scroll controls
     * we should move the focused element to visible area in the scroll container.
     */
    private handleFocus: React.HTMLAttributes<HTMLDivElement>['onFocus'] = (event) => {
        const scrollContainer = this.scrollContainerRef.current;
        const startScrollElement = this.startScrollElementRef.current;
        const endScrollElement = this.endScrollElementRef.current;

        if (!scrollContainer || !startScrollElement || !endScrollElement) {
            return;
        }

        const focusedElement = event.target;

        if (!focusedElement.previousElementSibling) {
            scrollContainer.scrollTop = 0;

            return;
        }

        if (!focusedElement.nextElementSibling) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight - scrollContainer.clientHeight;

            return;
        }

        const viewportTop = startScrollElement.getBoundingClientRect().bottom;
        const viewportBottom = endScrollElement.getBoundingClientRect().top;

        const elementRect = event.target.getBoundingClientRect();

        const {scrollTop} = scrollContainer;

        if (elementRect.top < viewportTop) {
            scrollContainer.scrollTop = scrollTop + elementRect.top - viewportTop;

            return;
        }

        if (elementRect.bottom > viewportBottom) {
            scrollContainer.scrollTop = scrollTop + elementRect.bottom - viewportBottom;

            return;
        }
    };

    /** Starts scroll changing interval whe user hovers to the scroll controls */
    private handleStartScrollElementMouseEnter = () => {
        this.setScrollInterval(() => {
            const scrollContainer = this.scrollContainerRef.current;

            if (!scrollContainer) {
                return;
            }

            const {scrollTop} = scrollContainer;
            scrollContainer.scrollTop = Math.max(scrollTop - SCROLL_STEP, 0);
        });
    };

    private handleEndScrollElementMouseEnter = () => {
        this.setScrollInterval(() => {
            const scrollContainer = this.scrollContainerRef.current;

            if (!scrollContainer) {
                return;
            }

            const {scrollTop, scrollHeight, clientHeight} = scrollContainer;
            const maxScrollTop = scrollHeight - clientHeight;
            scrollContainer.scrollTop = Math.min(scrollTop + SCROLL_STEP, maxScrollTop);
        });
    };

    /** Stop scroll changing interval when mouse leaves scroll controls */
    private handleStartScrollElementMouseLeave = () => {
        this.clearScrollInterval();
    };

    private handleEndScrollElementMouseLeave = () => {
        this.clearScrollInterval();
    };

    /**
     * We focus any item under the cursor for following comfortable navigation
     * through keyboard.
     */
    private handleMouseMove: FocusTrapProps['onMouseMove'] = (event) => {
        const {target} = event;

        if (!(target instanceof HTMLElement)) {
            return;
        }

        /**
         * We know that any menu item is button
         * @see MenuItem
         */
        const menuItemNode = target.closest('button');
        if (menuItemNode && document.activeElement !== menuItemNode) {
            menuItemNode.focus();
        }
    };

    /**
     * Keyboard focus navigation,
     * Prevent default event to stop affecting native scroll.
     */
    private handleKeyDown: TargetProps['onKeyDown'] = (event) => {
        const focusTrap = this.focusTrapRef.current;

        if (!focusTrap || event.defaultPrevented) {
            return;
        }

        if (event.key === 'ArrowDown') {
            focusTrap.focusSibling('next');
            event.preventDefault();
        }

        if (event.key === 'ArrowUp') {
            focusTrap.focusSibling('prev');
            event.preventDefault();
        }
    };

    public render() {
        const {
            rootRef,
            focusTrapRef,
            startSentinelProps = {},
            endSentinelProps = {},
            className,
            classes,
            ...rest
        } = mergeClassesProps(this.props, styles);

        return (
            <FocusTrap
                {...rest}
                ref={chainRefs(focusTrapRef, this.focusTrapRef)}
                enableSelfFocus
                className={classNames(className, classes.root)}
                onScroll={chain(rest.onScroll, this.handleScroll)}
                onFocus={chain(rest.onFocus, this.handleFocus)}
                onMouseMove={chain(rest.onMouseMove, this.handleMouseMove)}
                onKeyDown={chain(rest.onKeyDown, this.handleKeyDown)}
                rootRef={chainRefs(rootRef, this.scrollContainerRef)}
                startSentinelRef={chainRefs(rest.startSentinelRef, this.startScrollElementRef)}
                startSentinelProps={{
                    ...startSentinelProps,
                    className: classNames(startSentinelProps.className, classes.startScrollElement),
                    onMouseEnter: chain(
                        startSentinelProps.onMouseEnter,
                        this.handleStartScrollElementMouseEnter
                    ),
                    onMouseLeave: chain(
                        startSentinelProps.onMouseLeave,
                        this.handleStartScrollElementMouseLeave
                    ),
                    children: <ScrollDirectionIcon className={classes.startScrollIcon} />
                }}
                endSentinelRef={chainRefs(rest.endSentinelRef, this.endScrollElementRef)}
                endSentinelProps={{
                    ...endSentinelProps,
                    className: classNames(endSentinelProps.className, classes.endScrollElement),
                    onMouseEnter: chain(
                        endSentinelProps.onMouseEnter,
                        this.handleEndScrollElementMouseEnter
                    ),
                    onMouseLeave: chain(
                        endSentinelProps.onMouseLeave,
                        this.handleEndScrollElementMouseLeave
                    ),
                    children: <ScrollDirectionIcon className={classes.endScrollIcon} />
                }}
            />
        );
    }
}
