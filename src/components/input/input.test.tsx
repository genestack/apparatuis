/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {fireEvent, render, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as React from 'react';

import {Input} from './input';

describe('<Input />', () => {
    it('should render input element', () => {
        render(<Input id="input" />);
        expect(document.getElementById('input')!).toBeInstanceOf(HTMLInputElement);
    });

    it('should call onValueChange on input change', async () => {
        const onValueChange = jest.fn();
        render(<Input id="input" value="" onValueChange={onValueChange} />);
        const input = document.getElementById('input')! as HTMLInputElement;

        fireEvent.change(input, {target: {value: 'foo'}});

        await waitFor(() => {
            expect(onValueChange).toHaveBeenCalledWith('foo');
        });
    });

    it('should render div element as root', () => {
        const screen = render(<Input rootProps={{'data-testid': 'test'}} />);
        expect(screen.queryByTestId('test')).toBeInstanceOf(HTMLDivElement);
    });

    it('should have behavior like native label element', () => {
        const screen = render(<Input rootProps={{'data-testid': 'test'}} />);
        fireEvent.focus(screen.queryByTestId('test')!);
        expect(document.activeElement).toBeInstanceOf(HTMLInputElement);
    });

    describe('when "clearable" prop is passed', () => {
        it('should not render clear button when input value is empty', () => {
            render(<Input id="input" clearable clearButtonProps={{id: 'clear-button'}} />);
            const input = document.getElementById('input')! as HTMLInputElement;
            fireEvent.change(input, {target: {value: ''}});
            expect(document.getElementById('clear-button')).toBeFalsy();
        });

        it('should not render clear button when empty "value" prop is passed', () => {
            render(
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
            render(
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
            render(
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

            render(
                <Input
                    clearable
                    id="input"
                    value="foo"
                    onValueChange={handleValueChange}
                    clearButtonProps={{id: 'clear-button'}}
                    onClearButtonClick={handleClearButtonClick}
                />
            );

            fireEvent.click(document.getElementById('clear-button')!);

            expect(handleClearButtonClick).toHaveBeenCalledTimes(1);
            expect(handleValueChange).not.toHaveBeenCalled();
        });
    });

    it('should render spinner when "loading" prop is passed', () => {
        const screen = render(<Input loading spinnerProps={{'data-testid': 'test'}} />);
        expect(screen.queryByTestId('test')).toBeVisible();
    });

    describe('when "required" prop is passed', () => {
        it('should have "invalid" class name when input is empty', () => {
            render(<Input rootProps={{id: 'test', classes: {invalid: 'invalid-test'}}} required />);
            expect(document.getElementById('test')!.classList.contains('invalid-test')).toBe(true);
        });

        it('should remove invalid className when input is not empty', () => {
            render(
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
        const screen = render(
            <Input rootProps={{id: 'test', classes: {focused: 'focused-test'}}} />
        );

        const classList = document.getElementById('test')?.classList;

        fireEvent.focus(document.getElementById('test')!);

        expect(classList?.contains('focused-test')).toStrictEqual(true);

        screen.rerender(
            <Input disabled rootProps={{id: 'test', classes: {focused: 'focused-test'}}} />
        );

        expect(classList?.contains('focused-test')).toStrictEqual(false);
    });
});
