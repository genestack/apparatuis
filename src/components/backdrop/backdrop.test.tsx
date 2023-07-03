/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as React from 'react';

import {Backdrop} from './backdrop';

describe('Backdrop Component', () => {
    test('should unmount children after close and end transition', async () => {
        const screen = render(
            <Backdrop open>
                <div data-testid="test" />
            </Backdrop>
        );

        expect(screen.queryByTestId('test')).toBeVisible();

        screen.rerender(
            <Backdrop>
                <div data-testid="test" />
            </Backdrop>
        );

        await waitFor(() => {
            expect(screen.queryByTestId('test')).toBeNull();
        });
    });

    test('should pass onExited callback to Fade element', async () => {
        const onExited = jest.fn();

        const screen = render(<Backdrop open onExited={onExited} />);
        screen.rerender(<Backdrop onExited={onExited} />);

        await waitFor(() => {
            expect(onExited).toHaveBeenCalled();
        });
    });
});
