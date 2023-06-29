/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render} from '@testing-library/react';
import * as React from 'react';

import {Button} from './button';

describe('<Button />', () => {
    it('should render children', () => {
        const screen = render(
            <Button>
                <div data-testid="test" />
            </Button>
        );

        expect(screen.queryByTestId('test')).toBeTruthy();
    });

    it('should render icon', () => {
        const screen = render(<Button iconStart={<div data-testid="icon" />} />);
        expect(screen.queryByTestId('icon')).toBeTruthy();
    });

    it('should render button element by default', () => {
        const screen = render(<Button data-testid="test" />);
        expect(screen.queryByTestId('test')).toBeInstanceOf(HTMLButtonElement);
    });

    it('should render anchor element if href and component="a" are passed', () => {
        const screen = render(<Button data-testid="test" component="a" href="foo" />);
        expect(screen.queryByTestId('test')).toBeInstanceOf(HTMLAnchorElement);
        expect(screen.queryByTestId('test')).toHaveProperty('href', 'http://localhost/foo');
    });
});
