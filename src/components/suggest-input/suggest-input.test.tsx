/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable: no-non-null-assertion
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';

import {SuggestInput} from './suggest-input';
import {SuggestInputItem} from './suggest-input-item';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<SuggestInput />', () => {
    describe('on base setup', () => {
        const setup = () =>
            app.mount(
                <SuggestInput id="input">
                    <div id="title" />
                    <SuggestInputItem id="item" value="bar" />
                </SuggestInput>
            );

        it('should render input', () => {
            setup();
            expect(document.getElementById('input')).toBeInstanceOf(HTMLInputElement);
        });

        it('should not render children items by default', () => {
            setup();
            expect(document.getElementById('item')).toBeFalsy();
        });

        it('should render suggest items when value has been changed', () => {
            const wrapper = setup();
            (document.getElementById('input')! as HTMLInputElement).value = 'foo';
            wrapper.find('input').simulate('change');
            expect(document.getElementById('item')).toBeTruthy();
        });

        it('should render other children when value has been changed', () => {
            const wrapper = setup();
            (document.getElementById('input')! as HTMLInputElement).value = 'foo';
            wrapper.find('input').simulate('change');
            expect(document.getElementById('title')).toBeTruthy();
        });
    });

    it('should call onOpenChange when suggest has been opened', () => {
        const onOpenChange = jest.fn();
        const wrapper = app.mount(
            <SuggestInput id="input" onOpenChange={onOpenChange}>
                <SuggestInputItem id="item" value="bar" />
            </SuggestInput>
        );

        expect(onOpenChange).not.toBeCalled();

        (document.getElementById('input')! as HTMLInputElement).value = 'foo';
        wrapper.find('input').simulate('change');
        expect(onOpenChange).toHaveBeenCalledTimes(1);
        expect(onOpenChange).toBeCalledWith(true);
    });

    it('should open suggest on focus', () => {
        const onOpenChange = jest.fn();
        const wrapper = app.mount(
            <SuggestInput id="input" onOpenChange={onOpenChange} openOnFocus>
                <SuggestInputItem id="item" value="bar" />
            </SuggestInput>
        );

        wrapper.find('input').simulate('focus');
        expect(onOpenChange).toHaveBeenCalledTimes(1);
        expect(onOpenChange).toBeCalledWith(true);
    });

    describe('when item has been selected', () => {
        const setup = () => {
            const onComplete = jest.fn();
            const onOpenChange = jest.fn();
            const wrapper = app.mount(
                <SuggestInput
                    id="input"
                    onComplete={onComplete}
                    openOnFocus
                    onOpenChange={onOpenChange}
                >
                    <SuggestInputItem id="item" value="bar" />
                </SuggestInput>
            );

            wrapper.find('input').simulate('focus');
            wrapper
                .find('#item')
                .hostNodes()
                .simulate('click');

            return {wrapper, onComplete, onOpenChange};
        };

        it('should call onComplete', () => {
            const {onComplete} = setup();
            expect(onComplete).toHaveBeenCalledTimes(1);
            expect(onComplete).toBeCalledWith('bar');
        });

        it('should close suggest', () => {
            const {wrapper} = setup();

            expect(wrapper.find('#item')).toHaveLength(0);
        });

        it('should onOpenChange with false', () => {
            const {onOpenChange} = setup();
            expect(onOpenChange).toHaveBeenCalledTimes(2);
            expect(onOpenChange.mock.calls[1][0]).toBe(false);
        });
    });

    it('should use children as function', () => {
        const render = jest.fn();
        render.mockImplementation(() => {
            return [<SuggestInputItem key="item" id="item" />];
        });
        const wrapper = app.mount(<SuggestInput id="input">{render}</SuggestInput>);

        expect(render).toHaveBeenCalledTimes(0);
        (document.getElementById('input')! as HTMLInputElement).value = 'foo';
        wrapper.find('input').simulate('change');
        expect(render).toHaveBeenCalledTimes(1);
        expect(render).toBeCalledWith('foo');
    });
});
