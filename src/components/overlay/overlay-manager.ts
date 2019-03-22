/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import ReactDOM from 'react-dom';

import {getFirstReachableElement, getLastReachableElement} from '../../utils/focusable-elements';
import {hasVerticalScrollbar} from '../../utils/has-vertical-scrollbar';

/** ClassName to find all fixed element on the page */
export const FIXED_BLOCKS_CLASS_NAME = 'gs-fixed';

/**
 * Base interface for overlays are used in manager
 */
export type OverlayComponent = React.ReactInstance;

interface ContainerState {
    startFocusButton: HTMLButtonElement;
    endFocusButton: HTMLButtonElement;
    containerOverflow: string | null;
    containerPaddingRight: string | null;
    fixedBlocksPaddingsRight: Map<HTMLElement, string | null>;
}

function createHiddenFocusButton() {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.style.opacity = '0';
    button.style.position = 'fixed';

    return button;
}

const getPaddingRight = (element: HTMLElement) =>
    parseInt(window.getComputedStyle(element).paddingRight || '0', 10);

const remove = (element: HTMLElement) =>
    element.parentElement && element.parentElement.removeChild(element);

/**
 * Object that knows about opened overlays (dialogs, popovers) on the page.
 * Any Overlay is modal that blocks page content and scroll.
 *
 * OverlayManager removes scrollbar from container when any overlay is opened.
 * Also it adds paddings to fixed elements to prevent it chattering.
 *
 * Also to prevent scrolling below the overlays when user changes focus
 * from browser address (aka. URL) bar `OverlayManager` adds two fixed
 * buttons at the top and at the bottom of body element. So when user focuses
 * to the page these buttons are always in viewport and scroll is not affected.
 *
 * At the moment we should use a singleton of this class.
 */
export class OverlayManager {
    private overlays: OverlayComponent[] = [];
    private container: HTMLElement;
    private containerState: ContainerState | null = null;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    private applyContainerStyles() {
        const {container} = this;

        if (this.containerState) {
            return;
        }

        const startFocusButton = createHiddenFocusButton();
        startFocusButton.addEventListener('focus', this.handleStartButtonFocus);

        const endFocusButton = createHiddenFocusButton();
        endFocusButton.addEventListener('focus', this.handleEndButtonFocus);

        document.body.appendChild(endFocusButton);
        document.body.insertBefore(startFocusButton, document.body.firstChild);

        const fixedBlocksPaddingsRight = new Map<HTMLElement, string | null>();

        this.containerState = {
            containerOverflow: container.style.overflow,
            containerPaddingRight: container.style.paddingRight,
            startFocusButton,
            endFocusButton,
            fixedBlocksPaddingsRight
        };

        const containerOverflow = 'hidden';
        let containerPaddingRight = '0px';

        const appliedFixedBlocksPaddings = new Map<HTMLElement, string | null>();

        if (hasVerticalScrollbar(container)) {
            const size = scrollbarSize();
            containerPaddingRight = `${getPaddingRight(container) + size}px`;

            Array.from(
                document.querySelectorAll<HTMLElement>(`.${FIXED_BLOCKS_CLASS_NAME}`)
            ).forEach((fixedElement) => {
                appliedFixedBlocksPaddings.set(
                    fixedElement,
                    `${getPaddingRight(fixedElement) + size}px`
                );
            });
        }

        container.style.overflow = containerOverflow;
        container.style.paddingRight = containerPaddingRight;

        Array.from(appliedFixedBlocksPaddings).forEach(([fixedElement, paddingRight]) => {
            fixedBlocksPaddingsRight.set(fixedElement, fixedElement.style.paddingRight);
            fixedElement.style.paddingRight = paddingRight;
        });
    }

    private resetContainerStyles() {
        const {container, containerState} = this;

        if (!containerState) {
            return;
        }

        container.style.overflow = containerState.containerOverflow || '';
        container.style.paddingRight = containerState.containerPaddingRight || '';
        containerState.startFocusButton.removeEventListener('focus', this.handleStartButtonFocus);
        remove(containerState.startFocusButton);
        containerState.endFocusButton.removeEventListener('focus', this.handleEndButtonFocus);
        remove(containerState.endFocusButton);

        Array.from(containerState.fixedBlocksPaddingsRight).forEach(
            ([fixedElement, paddingRight]) => {
                fixedElement.style.paddingRight = paddingRight;
            }
        );

        this.containerState = null;
    }

    private getLastOverlayNode() {
        const lastOverlay = this.overlays[this.overlays.length - 1];
        if (lastOverlay) {
            const overlay = ReactDOM.findDOMNode(lastOverlay);
            if (overlay instanceof HTMLElement) {
                return overlay;
            }
        }
    }

    private handleStartButtonFocus = () => {
        const overlay = this.getLastOverlayNode();
        const element = overlay && getFirstReachableElement(overlay);
        if (element) {
            element.focus();
        }
    };

    private handleEndButtonFocus = () => {
        const overlay = this.getLastOverlayNode();
        const element = overlay && getLastReachableElement(overlay);
        if (element) {
            element.focus();
        }
    };

    public isTopOverlay(overlay: OverlayComponent) {
        const index = this.overlays.findIndex((item) => item === overlay);

        if (index === -1) {
            return null;
        }

        return index + 1 === this.overlays.length;
    }

    public mount(overlay: OverlayComponent) {
        if (this.overlays.includes(overlay)) {
            return;
        }

        this.overlays.push(overlay);

        this.applyContainerStyles();
    }

    public unmount(overlay: OverlayComponent) {
        if (!this.overlays.includes(overlay)) {
            return;
        }

        this.overlays.splice(this.overlays.indexOf(overlay), 1);

        if (!this.overlays.length) {
            this.resetContainerStyles();
        }
    }

    public destroy() {
        this.resetContainerStyles();
    }
}
