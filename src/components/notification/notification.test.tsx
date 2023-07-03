/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-unbound-method
import {fireEvent, render} from '@testing-library/react';
import * as React from 'react';

import {Notification} from './notification';

jest.useFakeTimers();

describe('<Notification />', () => {
    it('should render children', () => {
        render(
            <Notification>
                <div id="test" />
            </Notification>
        );
        expect(document.getElementById('test')).toBeTruthy();
    });

    it('should call onClose callback with reason after timeout', () => {
        const onClose = jest.fn();

        render(
            <Notification onClose={onClose}>
                <div id="test" />
            </Notification>
        );

        jest.runAllTimers();
        expect(onClose).toBeCalledWith('countdown-timeout');
    });

    it('should call onClose callback with reason on close button click', () => {
        const onClose = jest.fn();

        render(
            <Notification onClose={onClose} closeButtonProps={{id: 'button'}}>
                <div id="test" />
            </Notification>
        );

        fireEvent.click(document.getElementById('button')!);
        expect(onClose).toBeCalledWith('close-button-click');
    });

    it('should not call onClose callback if countdown is disabled', () => {
        const onClose = jest.fn();

        render(
            <Notification onClose={onClose} countdown="none">
                <div id="test" />
            </Notification>
        );

        jest.runAllTimers();
        expect(onClose).not.toBeCalled();
    });

    it('should not call onClose callback if countdown is stopped', () => {
        const onClose = jest.fn();

        render(
            <Notification onClose={onClose} countdown="stopped">
                <div id="test" />
            </Notification>
        );

        jest.runAllTimers();
        expect(onClose).not.toBeCalled();
    });
});
