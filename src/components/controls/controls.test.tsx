/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render} from '@testing-library/react';
import * as React from 'react';

import {Controls} from './controls';
import {ControlsItem} from './controls-item';

describe('<Controls />', () => {
    it('should render children', () => {
        const screen = render(
            <Controls>
                <ControlsItem>
                    <div data-testid="test" />
                </ControlsItem>
            </Controls>
        );
        expect(screen.queryByTestId('test')).toBeTruthy();
    });
});
