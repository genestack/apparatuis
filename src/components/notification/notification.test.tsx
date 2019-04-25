/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-unbound-method
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';

import {Notification} from './notification';

jest.useFakeTimers();

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<Notification />', () => {
    it('should render children', () => {
        app.mount(
            <Notification>
                <div id="test" />
            </Notification>
        );
        expect(document.getElementById('test')).toBeTruthy();
    });

    it('should call onClose callback with reason after timeout', () => {
        const onClose = jest.fn();

        app.mount(
            <Notification onClose={onClose}>
                <div id="test" />
            </Notification>
        );

        jest.runAllTimers();
        expect(onClose).toBeCalledWith('auto_close_timeout');
    });

    it('should call onClose callback with reason on close button click', () => {
        const onClose = jest.fn();

        const wrapper = app.mount(
            <Notification onClose={onClose} closeButtonProps={{id: 'button'}}>
                <div id="test" />
            </Notification>
        );

        wrapper
            .find('#button')
            .hostNodes()
            .simulate('click');
        expect(onClose).toBeCalledWith('close_button_click');
    });

    it('should not call onClose callback if auto closing disabled', () => {
        const onClose = jest.fn();

        app.mount(
            <Notification onClose={onClose} disableAutoClose>
                <div id="test" />
            </Notification>
        );

        jest.runAllTimers();
        expect(onClose).not.toBeCalled();
    });

    describe('closing management', () => {
        const setup = () => {
            const onClose = jest.fn();

            const wrapper = app.mount(<Notification onClose={onClose} />);

            const instance = wrapper.instance() as Notification;

            return {onClose, wrapper, instance};
        };

        it('should expose startClosing method', () => {
            expect(setup().instance.startClosing).toBeInstanceOf(Function);
        });

        it('should expose stopClosing method', () => {
            expect(setup().instance.stopClosing).toBeInstanceOf(Function);
        });

        it('should stop closing after stopClosing method is called', () => {
            const {instance, onClose} = setup();
            jest.runOnlyPendingTimers();
            instance.stopClosing();
            jest.runAllTimers();
            expect(onClose).not.toBeCalled();
        });
    });
});
