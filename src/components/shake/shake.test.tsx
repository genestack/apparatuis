/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';
import {render} from '@testing-library/react';

import {Shake} from './shake';

describe('Shake Component', () => {
    test('should pass className to children', () => {
        const screen = render(
            <Shake className="shake-test">
                <div className="div-test" data-testid="test" />
            </Shake>
        );

        expect(screen.queryByTestId('test')).toHaveProperty(
            'className',
            expect.stringContaining('shake-test')
        );
        expect(screen.queryByTestId('test')).toHaveProperty(
            'className',
            expect.stringContaining('div-test')
        );
    });
});
