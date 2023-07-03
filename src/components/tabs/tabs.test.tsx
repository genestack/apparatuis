/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {fireEvent, render, waitFor} from '@testing-library/react';
import * as React from 'react';

import {Tab} from '../tab';

import {Tabs} from './tabs';

// tslint:disable no-magic-numbers
describe('<Tabs />', () => {
    it('should set values for size and variant from tabs to children', () => {
        render(
            <Tabs value={1} size="small" variant="solid">
                <Tab />
            </Tabs>
        );

        expect(document.querySelector('[data-qa="tab"]')).toHaveProperty(
            'className',
            expect.stringContaining('small')
        );
        expect(document.querySelector('[data-qa="tab"]')).toHaveProperty(
            'className',
            expect.stringContaining('solid')
        );
    });

    it('should render <Indicator>', async () => {
        render(
            <Tabs value={0}>
                <Tab />
            </Tabs>
        );

        await waitFor(() => {
            expect(document.querySelector('[data-qa="indicator"]')).toBeTruthy();
        });
    });

    it('should set selected value for tab', () => {
        const screen = render(
            <Tabs value={1} size="small" variant="solid">
                <Tab />
            </Tabs>
        );

        expect(document.querySelector('[data-qa="tab"]')).not.toHaveProperty(
            'className',
            expect.stringContaining('selected')
        );

        screen.rerender(
            <Tabs value={0} size="small" variant="solid">
                <Tab />
            </Tabs>
        );

        expect(document.querySelector('[data-qa="tab"]')).toHaveProperty(
            'className',
            expect.stringContaining('selected')
        );
    });

    it('should execute onValueChange with tabIndex', () => {
        const onValueChange = jest.fn();

        render(
            <Tabs value={0} onValueChange={onValueChange}>
                <Tab />
                <Tab />
                <Tab id="tab" />
            </Tabs>
        );

        expect(onValueChange).toHaveBeenCalledTimes(0);

        fireEvent.click(document.getElementById('tab')!);

        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toBeCalledWith(2);
    });

    it('should execute onValueChange with 30', () => {
        const onValueChange = jest.fn();

        render(
            <Tabs value={20} onValueChange={onValueChange}>
                <Tab value={10} />
                <Tab value={20} />
                <Tab value={30} id="tab" />
            </Tabs>
        );

        expect(onValueChange).toHaveBeenCalledTimes(0);

        fireEvent.click(document.getElementById('tab')!);

        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toBeCalledWith(30);
    });
});
