/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render} from '@testing-library/react';
import * as React from 'react';

import {Paper} from './paper';

describe('<Paper />', () => {
    describe('by default', () => {
        const setup = () => render(<Paper id="test">Test String</Paper>);

        test('should render string children', () => {
            setup();
            expect(document.getElementById('test')).toHaveProperty('textContent', 'Test String');
        });

        test('should render div HTML element', () => {
            setup();
            expect(document.getElementById('test')).toBeInstanceOf(HTMLDivElement);
        });
    });

    it('should merge class name with own', () => {
        render(
            <Paper id="test" className="test-class-name">
                Test String
            </Paper>
        );

        expect(document.getElementById('test')).toHaveProperty(
            'className',
            expect.stringContaining('root')
        );
        expect(document.getElementById('test')).toHaveProperty(
            'className',
            expect.stringContaining('test-class-name')
        );
    });
});
