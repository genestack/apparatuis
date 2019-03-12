/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-unbound-method no-non-null-assertion max-file-line-count
// tslint:disable no-unnecessary-type-assertion
import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';

import {FocusTrap} from '../focus-trap';

import {Menu} from './menu';
import {MenuItem} from './menu-item';

function createTestApp() {
    let appElement: HTMLElement | undefined;
    let wrapper: ReactWrapper<any, any> | null = null;

    return {
        beforeEach: () => {
            appElement = document.createElement('div');
            document.body.appendChild(appElement);
        },

        afterEach: () => {
            if (wrapper) {
                wrapper.detach();
            }

            if (appElement) {
                appElement.remove();
            }
        },

        mount: <P, S = any>(node: React.ReactElement<P>): ReactWrapper<P, S> => {
            wrapper = mount(node, {attachTo: appElement});

            return wrapper;
        }
    };
}
describe.skip('<Menu />', () => {
    const app = createTestApp();
    beforeEach(app.beforeEach);
    afterEach(app.afterEach);

    it('should render <FocusTrap />', () => {
        const onClose = jest.fn();
        const referenceElement = document.createElement('button');
        referenceElement.focus();
        const wrapper = app.mount(
            <Menu open onClose={onClose} referenceElement={referenceElement} />
        );
        expect(wrapper.find(FocusTrap).exists()).toBe(true);
    });

    it('should focus to menu element on mount', () => {
        const onClose = jest.fn();
        const referenceElement = document.createElement('button');
        referenceElement.focus();
        app.mount(<Menu id="test" open onClose={onClose} referenceElement={referenceElement} />);
        expect(document.activeElement).toBe(document.getElementById('test')!.parentElement);
    });

    it('should focus to menu element on open', () => {
        const onClose = jest.fn();
        const referenceElement = document.createElement('button');
        referenceElement.focus();
        const wrapper = app.mount(
            <Menu id="test" open={false} onClose={onClose} referenceElement={referenceElement} />
        );

        expect(document.activeElement).toBe(referenceElement);
        wrapper.setProps({open: true});
        expect(document.activeElement).toBe(document.getElementById('test')!.parentElement);
    });

    it('should change focus on arrow up or down key press', () => {
        const onClose = jest.fn();
        const referenceElement = document.createElement('div');
        app.mount(
            <Menu id="test" open onClose={onClose} referenceElement={referenceElement}>
                <MenuItem id="first" />
                <MenuItem id="second" />
            </Menu>
        );

        const down = new KeyboardEvent('keydown', {
            key: 'ArrowDown',
            bubbles: true
        });

        const up = new KeyboardEvent('keydown', {
            key: 'ArrowUp',
            bubbles: true
        });

        document.activeElement!.dispatchEvent(down);
        expect(document.activeElement).toBe(document.getElementById('first'));
        document.activeElement!.dispatchEvent(down);
        expect(document.activeElement).toBe(document.getElementById('second'));
        document.activeElement!.dispatchEvent(down);
        expect(document.activeElement).toBe(document.getElementById('second'));
        document.activeElement!.dispatchEvent(up);
        expect(document.activeElement).toBe(document.getElementById('first'));
        document.activeElement!.dispatchEvent(up);
        expect(document.activeElement).toBe(document.getElementById('first'));
    });

    it('should change focus on mouse move over menu item', () => {
        const onClose = jest.fn();
        const referenceElement = document.createElement('div');
        app.mount(
            <Menu id="test" open onClose={onClose} referenceElement={referenceElement}>
                <MenuItem id="first" />
                <MenuItem id="second" />
            </Menu>
        );

        const mouseMoveEvent = new MouseEvent('mousemove', {
            bubbles: true
        });

        document.getElementById('second')!.dispatchEvent(mouseMoveEvent);
        expect(document.activeElement).toBe(document.getElementById('second'));
    });
});
