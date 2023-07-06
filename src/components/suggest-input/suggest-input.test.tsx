/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {act, fireEvent, render, waitFor} from '@testing-library/react';
import * as React from 'react';

import {SuggestInput} from './suggest-input';
import {SuggestInputItem} from './suggest-input-item';

describe('<SuggestInput />', () => {
    describe('on base setup', () => {
        const setup = () =>
            render(
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

        it('should render suggest items when value has been changed', async () => {
            setup();
            fireEvent.change(document.getElementById('input')!, {target: {value: 'foo'}});
            await waitFor(() => expect(document.getElementById('item')).toBeTruthy());
        });

        it('should render other children when value has been changed', async () => {
            setup();
            fireEvent.change(document.getElementById('input')!, {target: {value: 'foo'}});
            await waitFor(() => expect(document.getElementById('title')).toBeTruthy());
        });
    });

    it('should call onOpenChange when suggest has been opened', async () => {
        const onOpenChange = jest.fn();
        render(
            <SuggestInput id="input" onOpenChange={onOpenChange}>
                <SuggestInputItem id="item" value="bar" />
            </SuggestInput>
        );

        expect(onOpenChange).not.toHaveBeenCalled();

        fireEvent.change(document.getElementById('input')!, {target: {value: 'foo'}});
        await waitFor(() => {
            expect(onOpenChange).toHaveBeenCalledTimes(1);
            expect(onOpenChange).toHaveBeenCalledWith(true);
        });
    });

    it('should open suggest on focus', async () => {
        const onOpenChange = jest.fn();
        render(
            <SuggestInput id="input" onOpenChange={onOpenChange} openOnFocus>
                <SuggestInputItem id="item" value="bar" />
            </SuggestInput>
        );

        act(() => {
            document.getElementById('input')!.focus();
        });

        await waitFor(() => {
            expect(onOpenChange).toHaveBeenCalledTimes(1);
            expect(onOpenChange).toHaveBeenCalledWith(true);
        });
    });

    it('should accept any component with value property', async () => {
        const onComplete = jest.fn();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function AnyComponent(props: any) {
            const {value, focused, ...rest} = props;

            return <div {...rest} />;
        }

        render(
            <SuggestInput id="input" onComplete={onComplete} openOnFocus>
                <AnyComponent id="any-component" value="bar" />
            </SuggestInput>
        );

        fireEvent.focus(document.getElementById('input')!);
        fireEvent.click(document.getElementById('any-component')!);
        fireEvent.focus(document.getElementById('input')!);

        await waitFor(() => expect(onComplete).toHaveBeenCalledWith('bar'));
    });

    describe('when item has been selected', () => {
        const setup = () => {
            const onComplete = jest.fn();
            const onOpenChange = jest.fn();
            const screen = render(
                <SuggestInput
                    id="input"
                    onComplete={onComplete}
                    openOnFocus
                    onOpenChange={onOpenChange}
                >
                    <SuggestInputItem id="item" value="bar" />
                </SuggestInput>
            );

            fireEvent.focus(document.getElementById('input')!);
            fireEvent.click(document.getElementById('item')!);

            return {screen, onComplete, onOpenChange};
        };

        it('should call onComplete', async () => {
            const {onComplete} = setup();
            await waitFor(() => {
                expect(onComplete).toHaveBeenCalledTimes(1);
                expect(onComplete).toHaveBeenCalledWith('bar');
            });
        });

        it('should close suggest', async () => {
            setup();

            await waitFor(() => expect(document.querySelectorAll('#item')).toHaveLength(0));
        });

        it('should onOpenChange with false', async () => {
            const {onOpenChange} = setup();
            await waitFor(() => {
                expect(onOpenChange).toHaveBeenCalledTimes(2);
                expect(onOpenChange.mock.calls[1][0]).toBe(false);
            });
        });
    });

    it('should use children as function', async () => {
        const renderComponent = jest.fn();
        renderComponent.mockImplementation(() => {
            return [<SuggestInputItem key="item" id="item" />];
        });
        render(<SuggestInput id="input">{renderComponent}</SuggestInput>);

        expect(renderComponent).toHaveBeenCalledTimes(0);
        fireEvent.change(document.getElementById('input')!, {target: {value: 'foo'}});
        await waitFor(() => {
            expect(renderComponent).toHaveBeenCalledTimes(1);
            expect(renderComponent).toHaveBeenCalledWith('foo');
        });
    });
});
