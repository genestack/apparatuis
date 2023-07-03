/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render} from '@testing-library/react';
import * as React from 'react';

import {Grow} from './grow';

describe('<Grow />', () => {
    test('should pass className to children element', () => {
        const screen = render(
            <Grow className="grow">
                <div data-testid="div" />
            </Grow>
        );

        expect(screen.queryByTestId('div')).toHaveProperty(
            'className',
            expect.stringContaining('grow')
        );
    });
});
