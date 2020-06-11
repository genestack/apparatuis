/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-non-null-assertion
import * as React from 'react';

import {awaitTimeout} from '../../../test-utils/await-timeout';
import {createTestApp} from '../../../test-utils/create-test-app';
import {Spinner} from '../spinner';

import {Input} from './input';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<Input />', () => {
    it('should render input element', () => {
        app.mount(<Input id="input" />);
        expect(document.getElementById('input')!.tagName).toBe('INPUT');
    });

    it('should call onValueChange on input change', () => {
        const onValueChange = jest.fn();
        const wrapper = app.mount(<Input id="input" value="" onValueChange={onValueChange} />);
        (document.getElementById('input')! as HTMLInputElement).value = 'foo';
        wrapper.find('input').simulate('change');
        expect(onValueChange).toBeCalledWith('foo');
    });

    it('should render div element as root', () => {
        const wrapper = app.mount(<Input />);
        expect(wrapper.getDOMNode()).toBeInstanceOf(HTMLDivElement);
    });

    it('should have behaviour like native label element', () => {
        const wrapper = app.mount(<Input />);
        wrapper.simulate('focus');
        expect(document.activeElement).toBeInstanceOf(HTMLInputElement);
    });

    describe('when "clearable" prop is passed', () => {
        it('should not render clear button when input value is empty', () => {
            const wrapper = app.mount(<Input clearable clearButtonProps={{id: 'clear-button'}} />);
            wrapper.find('input').simulate('change', {target: {value: ''}});
            expect(document.getElementById('clear-button')).toBeFalsy();
        });

        it('should not render clear button when empty "value" prop is passed', () => {
            app.mount(
                <Input
                    clearable
                    value=""
                    onValueChange={jest.fn()}
                    clearButtonProps={{id: 'clear-button'}}
                />
            );
            expect(document.getElementById('clear-button')).toBeFalsy();
        });

        it('should render clear button when input value is not empty', () => {
            app.mount(
                <Input
                    clearable
                    value="test"
                    onValueChange={jest.fn()}
                    clearButtonProps={{id: 'clear-button'}}
                />
            );

            expect(document.getElementById('clear-button')).toBeTruthy();
        });

        it('should render clear button when "value" prop is passed', () => {
            app.mount(
                <Input
                    clearable
                    value="foo"
                    clearButtonProps={{id: 'clear-button'}}
                    onValueChange={jest.fn()}
                />
            );
            expect(document.getElementById('clear-button')).toBeTruthy();
        });

        it('should call onClearButtonClick on "clear" button click', () => {
            const handleClearButtonClick = jest.fn();
            const handleValueChange = jest.fn();

            const wrapper = app.mount(
                <Input
                    clearable
                    id="input"
                    value="foo"
                    onValueChange={handleValueChange}
                    clearButtonProps={{id: 'clear-button'}}
                    onClearButtonClick={handleClearButtonClick}
                />
            );

            wrapper
                .find('#clear-button')
                .hostNodes()
                .simulate('click');

            expect(handleClearButtonClick).toHaveBeenCalledTimes(1);
            expect(handleValueChange).not.toBeCalled();
        });
    });

    it('should render spinner when "loading" prop is passed', () => {
        const wrapper = app.mount(<Input loading />);
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });

    describe('when "required" prop is passed', () => {
        it('should have "invalid" class name when input is empty', () => {
            app.mount(
                <Input rootProps={{id: 'test', classes: {invalid: 'invalid-test'}}} required />
            );
            expect(document.getElementById('test')!.classList.contains('invalid-test')).toBe(true);
        });

        it('should remove invalid className when input is not empty', () => {
            app.mount(
                <Input
                    rootProps={{id: 'test', classes: {invalid: 'invalid-test'}}}
                    required
                    value="foo"
                    onValueChange={jest.fn()}
                />
            );
            expect(document.getElementById('test')!.classList.contains('invalid-test')).toBe(false);
        });
    });

    it('should be blurred after disabling', async () => {
        const wrapper = app.mount(
            <Input rootProps={{id: 'test', classes: {focused: 'focused-test'}}} />
        );

        const classList = document.getElementById('test')?.classList;

        wrapper.simulate('focus');

        expect(classList?.contains('focused-test')).toStrictEqual(true);

        wrapper.setProps({disabled: true});

        // apply effects
        await awaitTimeout();

        expect(classList?.contains('focused-test')).toStrictEqual(false);
    });
});
