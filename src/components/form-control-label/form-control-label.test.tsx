/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render} from '@testing-library/react';
import * as React from 'react';

import {Switch} from '../switch';
import {Typography} from '../typography';

import {FormControlLabel} from './form-control-label';
import {disabled, typographyDisabled} from './form-control-label.module.css';

describe('<FormControlLabel />', () => {
    describe('prop: disabled', () => {
        it('should disable everything 1', () => {
            const screen = render(
                <FormControlLabel
                    data-testid="root"
                    control={<Switch disabled />}
                    label={
                        <Typography intent="quiet" data-testid="label">
                            Disabled
                        </Typography>
                    }
                />
            );

            const root = screen.queryByTestId('root');
            const label = screen.queryByTestId('label');

            expect(root).toHaveProperty('className', expect.stringContaining(disabled));
            expect(label).toHaveProperty('className', expect.stringContaining(typographyDisabled));
        });

        it('should disable everything 2', () => {
            const screen = render(
                <FormControlLabel
                    disabled
                    data-testid="root"
                    control={<Switch />}
                    label={
                        <Typography intent="quiet" data-testid="label">
                            Disabled
                        </Typography>
                    }
                />
            );

            const root = screen.queryByTestId('root');
            const label = screen.queryByTestId('label');

            expect(root).toHaveProperty('className', expect.stringContaining(disabled));
            expect(label).toHaveProperty('className', expect.stringContaining(typographyDisabled));
        });
    });
});
