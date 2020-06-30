/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-non-null-assertion
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';

import {InteractiveElement} from './interactive-element';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<InteractiveElement/>', () => {
    it('should render div by default', () => {
        app.mount(<InteractiveElement id="test" />);
        expect(document.getElementById('test')).toHaveProperty('tagName', 'DIV');
    });

    it('should call onClick callback', () => {
        const onClick = jest.fn();
        const wrapper = app.mount(<InteractiveElement id="test" onClick={onClick} />);
        wrapper.simulate('click');
        expect(onClick).toBeCalled();
    });

    it('should call onClick callback on buttons', () => {
        const onClick = jest.fn();
        const wrapper = app.mount(<InteractiveElement id="test" as="button" onClick={onClick} />);
        wrapper.simulate('click');
        expect(onClick).toBeCalled();
    });

    it('should not call onClick when disabled', () => {
        const onClick = jest.fn();
        const wrapper = app.mount(<InteractiveElement id="test" onClick={onClick} disabled />);
        wrapper.simulate('click');
        expect(onClick).not.toBeCalled();
    });

    describe('when as="button" and disabled passed', () => {
        beforeEach(() => app.mount(<InteractiveElement id="test" as="button" disabled />));

        it('should render button element', () => {
            expect(document.getElementById('test')).toHaveProperty('tagName', 'BUTTON');
        });

        it('should set type attribute to "button"', () => {
            expect(document.getElementById('test')!.getAttribute('type')).toBe('button');
        });

        it('should set disabled attribute to true', () => {
            expect(document.getElementById('test')!.getAttribute('type')).toBe('button');
        });
    });

    describe('on keyboard events', () => {
        it('should call onClick on "Space" key press', () => {
            const onClick = jest.fn();
            const wrapper = app.mount(<InteractiveElement id="test" onClick={onClick} />);
            wrapper.simulate('keydown', {key: ' '});
            wrapper.simulate('keyup', {key: ' '});
            expect(onClick).toHaveBeenCalledTimes(1);
        });

        it('should not call onClick on "Enter" key press', () => {
            const onClick = jest.fn();
            const wrapper = app.mount(<InteractiveElement id="test" onClick={onClick} />);
            wrapper.simulate('keydown', {key: 'Enter'});
            wrapper.simulate('keyup', {key: 'Enter'});
            expect(onClick).toHaveBeenCalledTimes(0);
        });

        it('should not call onClick on "Space" key press when listeners are disabled', () => {
            const onClick = jest.fn();
            const wrapper = app.mount(
                <InteractiveElement id="test" onClick={onClick} disableListeners />
            );
            wrapper.simulate('keydown', {key: ' '});
            wrapper.simulate('keyup', {key: ' '});
            expect(onClick).not.toBeCalled();
        });

        it('should not call onClick on "Space" key press when it is native button', () => {
            const onClick = jest.fn();
            const wrapper = app.mount(
                <InteractiveElement id="test" as="button" onClick={onClick} />
            );
            wrapper.simulate('keydown', {key: ' '});
            wrapper.simulate('keyup', {key: ' '});
            expect(onClick).toHaveBeenCalledTimes(0);
        });

        it('should add activeClassName on "Space" keydown', () => {
            const onClick = jest.fn();
            const wrapper = app.mount(
                <InteractiveElement id="test" onClick={onClick} activeClassName="activeClassName" />
            );
            wrapper.simulate('keydown', {key: ' '});
            expect(document.getElementById('test')!.className).toContain('activeClassName');
        });

        it('should remove activeClassName on "Space" keydup', () => {
            const onClick = jest.fn();
            const wrapper = app.mount(
                <InteractiveElement id="test" onClick={onClick} activeClassName="activeClassName" />
            );
            wrapper.simulate('keydown', {key: ' '});
            wrapper.simulate('keyup', {key: ' '});
            expect(document.getElementById('test')!.className).not.toContain('activeClassName');
        });

        it('should remove activeClassName on click after "Space" keydown', () => {
            const onClick = jest.fn();
            const wrapper = app.mount(
                <InteractiveElement id="test" onClick={onClick} activeClassName="activeClassName" />
            );
            wrapper.simulate('keydown', {key: ' '});
            wrapper.simulate('click');
            expect(document.getElementById('test')!.className).not.toContain('activeClassName');
        });
    });
});
