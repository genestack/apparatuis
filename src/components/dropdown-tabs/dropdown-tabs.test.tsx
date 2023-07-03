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

import {DropdownTabs} from './dropdown-tabs';

describe('<DropdownTabs />', () => {
    it('should render <Button/> with icon', () => {
        const screen = render(
            <DropdownTabs value={1} buttonIconProps={{'data-testid': 'button'}} />
        );

        expect(screen.queryByTestId('button')).toBeVisible();
    });

    it('should set values for size and variant from tabs to dropdown control', () => {
        const screen = render(<DropdownTabs value={1} size="small" variant="solid" />);

        expect(screen.queryByRole('tab')).toHaveProperty(
            'className',
            expect.stringContaining('small')
        );
        expect(screen.queryByRole('tab')).toHaveProperty(
            'className',
            expect.stringContaining('solid')
        );
    });
});
