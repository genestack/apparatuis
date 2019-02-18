/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {getScrollbarSize} from '../../utils/get-scrollbar-size';
import {hasVerticalScrollbar} from '../../utils/has-vertical-scrollbar';

type Style = Partial<CSSStyleDeclaration>;

/**
 * Base interface for overlays are used in manager
 */
export type OverlayComponent = React.ReactInstance;

interface OverlayState {
    overlay: OverlayComponent;
    lastActiveElement: HTMLElement | null;
    isModal: boolean;
}

interface MountOpts {
    isModal?: boolean;
}

interface UnmountOpts {
    restoreFocus?: boolean;
}

/**
 * Object that knows about opened overlays (dialogs, popovers) on the page.
 * Any overlay could be modal. Modal overlays block page content and scroll.
 *
 * It removes scrollbar from container when any modal overlay is opened.
 * Also it serves focus states of elements when any overlay is closing.
 * After overlay is closed we could restore focus on element that was in focus
 * when overlay was opened.
 *
 * At the moment we should use a singleton of this class.
 */
export class OverlayManager {
    private overlaysStack: OverlayState[] = [];
    private container: HTMLElement;
    private lastContainerStyle: Style | null = null;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    private isElementInContainer(element: HTMLElement) {
        return this.container.contains(element);
    }

    private applyContainerStyles() {
        const {container} = this;

        if (this.lastContainerStyle) {
            return;
        }

        this.lastContainerStyle = {
            overflow: container.style.overflow,
            paddingRight: container.style.paddingRight
        };

        const appliedStyle = {
            overflow: 'hidden',
            paddingRight: '0px'
        };

        type StyleKeys = keyof typeof appliedStyle;

        if (hasVerticalScrollbar(container)) {
            const scrollbarSize = getScrollbarSize();
            const computedStyle = window.getComputedStyle(container);
            const paddingRight = parseInt(computedStyle.paddingRight || '0', 10);
            appliedStyle.paddingRight = `${paddingRight + scrollbarSize}px`;
        }

        (Object.keys(appliedStyle) as StyleKeys[]).forEach((key) => {
            container.style[key] = appliedStyle[key];
        });
    }

    private resetContainerStyles() {
        const {container, lastContainerStyle} = this;

        if (!lastContainerStyle) {
            return;
        }

        container.style.overflow = lastContainerStyle.overflow || null;
        container.style.paddingRight = lastContainerStyle.paddingRight || null;

        this.lastContainerStyle = null;
    }

    private getFocusStateIndexByModal(overlay: OverlayComponent) {
        return this.overlaysStack.findIndex((state) => state.overlay === overlay);
    }

    private getStateByOverlay(overlay: OverlayComponent) {
        return this.overlaysStack.find((state) => state.overlay === overlay) || null;
    }

    private moveLastFocusToNextOverlay(overlay: OverlayComponent) {
        const currentIndex = this.getFocusStateIndexByModal(overlay);

        const nextIndex = currentIndex + 1;

        const {lastActiveElement} = this.overlaysStack[currentIndex];

        if (lastActiveElement && this.isElementInContainer(lastActiveElement)) {
            this.overlaysStack[nextIndex].lastActiveElement = lastActiveElement;
        }
    }

    private removeStateByOverlay(overlay: OverlayComponent) {
        this.overlaysStack.splice(this.getFocusStateIndexByModal(overlay), 1);

        if (!this.hasModalsInStack()) {
            this.resetContainerStyles();
        }
    }

    private hasModalsInStack() {
        return this.overlaysStack.some((item) => item.isModal);
    }

    public isTopOverlay(overlay: OverlayComponent) {
        const index = this.getFocusStateIndexByModal(overlay);

        if (index === -1) {
            return null;
        }

        return index + 1 === this.overlaysStack.length;
    }

    public mount(overlay: OverlayComponent, opts: MountOpts = {}) {
        if (this.getStateByOverlay(overlay)) {
            return;
        }

        const lastActiveElement =
            this.container.ownerDocument &&
            (this.container.ownerDocument.activeElement as HTMLElement);

        this.overlaysStack.push({
            overlay,
            lastActiveElement,
            isModal: !!opts.isModal
        });

        if (this.hasModalsInStack()) {
            this.applyContainerStyles();
        }
    }

    public unmount(overlay: OverlayComponent, opts: UnmountOpts = {}) {
        const focusState = this.getStateByOverlay(overlay);

        if (!focusState) {
            return;
        }

        if (this.isTopOverlay(overlay)) {
            if (
                opts.restoreFocus &&
                focusState.lastActiveElement &&
                this.isElementInContainer(focusState.lastActiveElement)
            ) {
                focusState.lastActiveElement.focus();
            }
        } else {
            this.moveLastFocusToNextOverlay(overlay);
        }

        this.removeStateByOverlay(overlay);
    }
}
