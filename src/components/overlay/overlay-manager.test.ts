/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-non-null-assertion no-unbound-method max-file-line-count
// tslint:disable match-default-export-name
jest.mock('../../utils/has-vertical-scrollbar');
jest.mock('dom-helpers/util/scrollbarSize');

import _scrollbarSize from 'dom-helpers/util/scrollbarSize';

import {hasVerticalScrollbar as _hasVerticalScrollbar} from '../../utils/has-vertical-scrollbar';

import {OverlayManager, OverlayComponent, FIXED_BLOCKS_CLASS_NAME} from './overlay-manager';

const getScrollbarSize = _scrollbarSize as typeof _scrollbarSize & jest.MockInstance<any, any[]>;
const hasVerticalScrollbar = _hasVerticalScrollbar as typeof _hasVerticalScrollbar &
    jest.MockInstance<any, any[]>;

function createOverlayMock(): OverlayComponent {
    return {} as any;
}

function createElementWithId(tag: string, id: string) {
    const element = document.createElement(tag);
    element.id = id;

    document.body.appendChild(element);

    return element;
}

let commonManager: OverlayManager | null = null;

const createManager = () => {
    commonManager = new OverlayManager(document.body);

    return commonManager;
};

afterEach(() => {
    if (commonManager) {
        commonManager.destroy();
    }
});

describe('Overlay Manager', () => {
    describe('isTopOverlay method', () => {
        describe('when overlay is single', () => {
            const setup = () => {
                const manager = createManager();
                const overlay = createOverlayMock();

                manager.mount(overlay);

                return {overlay, manager};
            };

            it('should return `true` after mount', () => {
                const {overlay, manager} = setup();
                expect(manager.isTopOverlay(overlay)).toBe(true);
            });

            it('should return `null` after unmount', () => {
                const {overlay, manager} = setup();
                manager.unmount(overlay);
                expect(manager.isTopOverlay(overlay)).toBe(null);
            });

            it('should create hidden buttons in body', () => {
                expect(document.querySelectorAll('button')).toHaveLength(0);
                const {overlay, manager} = setup();
                expect(document.querySelectorAll('button')).toHaveLength(2);
                manager.unmount(overlay);
                expect(document.querySelectorAll('button')).toHaveLength(0);
            });
        });

        describe('when there are few mounted overlays', () => {
            const setup = () => {
                const manager = createManager();
                const firstOverlay = createOverlayMock();
                const centralOverlay = createOverlayMock();
                const lastOverlay = createOverlayMock();

                manager.mount(firstOverlay);
                manager.mount(centralOverlay);
                manager.mount(lastOverlay);

                return {
                    manager,
                    firstOverlay,
                    centralOverlay,
                    lastOverlay
                };
            };

            it('should return `true` for the last overlay', () => {
                const {manager, lastOverlay} = setup();
                expect(manager.isTopOverlay(lastOverlay)).toBe(true);
            });

            it('should return `false` for other mounted overlays', () => {
                const {manager, firstOverlay, centralOverlay} = setup();
                expect(manager.isTopOverlay(firstOverlay)).toBe(false);
                expect(manager.isTopOverlay(centralOverlay)).toBe(false);
            });

            it('should return `null` after unmounted overlays', () => {
                const {manager, firstOverlay, centralOverlay, lastOverlay} = setup();
                manager.unmount(lastOverlay);
                manager.unmount(centralOverlay);
                expect(manager.isTopOverlay(firstOverlay)).toBe(true);
                expect(manager.isTopOverlay(centralOverlay)).toBe(null);
                expect(manager.isTopOverlay(lastOverlay)).toBe(null);
            });
        });
    });

    describe('when body has scrollbar', () => {
        beforeEach(() => {
            const SCROLLBAR_WIDTH = 30;
            getScrollbarSize.mockReturnValue(SCROLLBAR_WIDTH);
            hasVerticalScrollbar.mockReturnValue(true);
        });

        afterEach(() => {
            getScrollbarSize.mockClear();
            hasVerticalScrollbar.mockClear();
        });

        describe('mount method', () => {
            it('should add exists padding to body styles', () => {
                document.body.style.paddingRight = '10px';

                const manager = createManager();
                const overlay = createOverlayMock();
                manager.mount(overlay);

                expect(document.body.style.overflow).toBe('hidden');
                expect(document.body.style.paddingRight).toBe('40px');

                manager.unmount(overlay);

                document.body.style.paddingRight = '0px';
            });

            it('should set right styles to body', () => {
                const manager = createManager();
                const overlay = createOverlayMock();
                manager.mount(overlay);

                expect(document.body.style.overflow).toBe('hidden');
                expect(document.body.style.paddingRight).toBe('30px');
            });

            it('should set padding right to fixed element', () => {
                const fixedElement = document.createElement('div');
                fixedElement.style.paddingRight = '12px';
                fixedElement.classList.add(FIXED_BLOCKS_CLASS_NAME);
                document.body.appendChild(fixedElement);

                const manager = createManager();
                const overlay = createOverlayMock();
                manager.mount(overlay);

                expect(fixedElement.style.paddingRight).toBe('42px');

                fixedElement.remove();
            });
        });

        describe('unmount method', () => {
            it('should not reset body styles when there is at least one overlay', () => {
                const manager = createManager();
                const firstOverlay = createOverlayMock();
                const secondOverlay = createOverlayMock();

                manager.mount(firstOverlay);
                manager.mount(secondOverlay);

                expect(document.body.style.overflow).toBe('hidden');
                expect(document.body.style.paddingRight).toBe('30px');

                manager.unmount(firstOverlay);

                expect(document.body.style.overflow).toBe('hidden');
                expect(document.body.style.paddingRight).toBe('30px');
            });
        });
    });

    describe('when document has active element', () => {
        beforeEach(() => {
            createElementWithId('input', 'active');
            createElementWithId('input', 'other');
        });

        afterEach(() => {
            const activeElement = document.getElementById('active');
            if (activeElement) {
                activeElement.remove();
            }
            document.getElementById('other')!.remove();
        });

        const setup = () => {
            const activeElement = document.getElementById('active')!;
            jest.spyOn(activeElement, 'focus');

            const otherElement = document.getElementById('other')!;

            const manager = createManager();
            const overlay = createOverlayMock();

            return {activeElement, manager, overlay, otherElement};
        };

        it(
            'when unmount is called without focus restoring ' + 'active element should not change',
            () => {
                const {activeElement, manager, overlay, otherElement} = setup();

                activeElement.focus();

                manager.mount(overlay);
                expect(document.activeElement).toBe(activeElement);
                otherElement.focus();
                expect(document.activeElement).toBe(otherElement);
                manager.unmount(overlay);
                expect(document.activeElement).toBe(otherElement);
                expect(activeElement.focus).toHaveBeenCalledTimes(1);
            }
        );
    });

    it('should not throw error on double mount', () => {
        const manager = createManager();
        const overlay = createOverlayMock();
        manager.mount(overlay);
        manager.mount(overlay);
    });

    it('should not throw error on double unmount', () => {
        const manager = createManager();
        const overlay = createOverlayMock();
        manager.mount(overlay);
        manager.unmount(overlay);
        manager.unmount(overlay);
    });
});
