/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as React from 'react';

import {Badge} from './badge';

describe('<Badge />', () => {
    it('should render span HTML element by default', () => {
        const screen = render(<Badge data-testid="test">Foo</Badge>);
        expect(screen.queryByTestId('test')).toBeInstanceOf(HTMLSpanElement);
    });

    it('should render children', () => {
        const screen = render(<Badge data-testid="test">Foo</Badge>);
        expect(screen.queryByTestId('test')).toHaveTextContent('Foo');
    });
});
