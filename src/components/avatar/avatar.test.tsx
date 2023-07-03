/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as React from 'react';

import {Avatar} from './avatar';

describe('<Avatar />', () => {
    describe('"initials" property has length 1', () => {
        beforeEach(() => {
            render(<Avatar data-testid="test" initials="A" />);
        });

        it('should render div HTML element', () => {
            expect(screen.getByTestId('test')).toBeVisible();
        });

        it('should render child with text of one letter', () => {
            expect(screen.getByTestId('test')).toHaveTextContent('A');
        });
    });

    describe('"initials" property has length 2', () => {
        it('should render two div HTML elements', () => {
            render(<Avatar data-testid="test" initials="AB" />);
            expect(screen.getByTestId('test').querySelectorAll('div')).toHaveLength(2);
        });
    });

    describe('"initials" property has length 3', () => {
        test('it should render two div HTML elements', () => {
            render(<Avatar data-testid="test" initials="ABC" />);
            expect(screen.getByTestId('test').querySelectorAll('div')).toHaveLength(2);
        });
    });

    describe('icon avatars', () => {
        test('should render icon', () => {
            render(<Avatar data-testid="test" icon={<div id="icon" />} />);
            expect(screen.getByTestId('test').querySelectorAll('#icon')).toHaveLength(1);
        });
    });
});
