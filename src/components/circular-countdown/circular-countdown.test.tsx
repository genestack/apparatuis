/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {act, render} from '@testing-library/react';
import * as React from 'react';

import {CircularCountdown} from './circular-countdown';

jest.useFakeTimers();

describe('<CircularCountdown />', () => {
    it('should render <circle /> element', () => {
        const screen = render(<CircularCountdown circleProps={{'data-testid': 'test'}} />);
        expect(screen.queryByTestId('test')).toHaveProperty('tagName', 'circle');
    });

    it('should call onComplete callback', () => {
        const onComplete = jest.fn();
        const screen = render(<CircularCountdown onComplete={onComplete} />);
        expect(onComplete).not.toHaveBeenCalled();
        screen.rerender(<CircularCountdown in onComplete={onComplete} />);
        expect(onComplete).not.toHaveBeenCalled();
        act(() => {
            jest.runAllTimers();
        });
        expect(onComplete).toHaveBeenCalled();
    });
});
