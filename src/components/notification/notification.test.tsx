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
        expect(onClose).toBeCalledWith('countdown-timeout');
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
        expect(onClose).toBeCalledWith('close-button-click');
    });

    it('should not call onClose callback if countdown is disabled', () => {
        const onClose = jest.fn();

        app.mount(
            <Notification onClose={onClose} countdown="none">
                <div id="test" />
            </Notification>
        );

        jest.runAllTimers();
        expect(onClose).not.toBeCalled();
    });

    it('should not call onClose callback if countdown is stopped', () => {
        const onClose = jest.fn();

        app.mount(
            <Notification onClose={onClose} countdown="stopped">
                <div id="test" />
            </Notification>
        );

        jest.runAllTimers();
        expect(onClose).not.toBeCalled();
    });
});
