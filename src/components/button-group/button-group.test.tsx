/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render} from '@testing-library/react';
import * as React from 'react';

import {Button} from '../button';

import {ButtonGroup} from './button-group';

describe('<ButtonGroup />', () => {
    it('should pass variant to containing buttons', () => {
        const screen = render(
            <ButtonGroup ghost intent="accent">
                <Button data-testid="button-1" />
            </ButtonGroup>
        );

        const button = screen.queryByTestId('button-1');

        expect(button).toBeTruthy();
        expect(button).toHaveProperty('className', expect.stringContaining('ghost'));
        expect(button).toHaveProperty('className', expect.stringContaining('accent'));
        expect(button).toHaveProperty('className', expect.stringContaining('ghostAccent'));
    });
});
