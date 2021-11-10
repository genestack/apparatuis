/*
 * Copyright (c) 2011-2021 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import * as React from 'react';
import {createTestApp} from '../../../test-utils/create-test-app';

import {FormControlLabel} from './form-control-label';
import {Switch} from '../switch';
import {Typography} from '../typography';
import {Controls} from '../controls';

import {disabled, typographyDisabled} from './form-control-label.module.css';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<FormControlLabel />', () => {
    describe('prop: disabled', () => {
        it('should disable everything 1', () => {
            const wrapper = app.mount(
                <FormControlLabel
                    control={<Switch disabled />}
                    label={
                        <Typography intent="quiet" id="disabledLabel">
                            Disabled
                        </Typography>
                    }
                />
            );

            const root = wrapper.find(Controls);
            const label = wrapper.find(Typography);

            expect(root.hasClass(disabled)).toEqual(true);
            expect(label.hasClass(typographyDisabled)).toEqual(true);
        });

        it('should disable everything 2', () => {
            const wrapper = app.mount(
                <FormControlLabel
                    disabled
                    control={<Switch />}
                    label={
                        <Typography intent="quiet" id="disabledLabel">
                            Disabled
                        </Typography>
                    }
                />
            );

            const root = wrapper.find(Controls);
            const label = wrapper.find(Typography);

            expect(root.hasClass(disabled)).toEqual(true);
            expect(label.hasClass(typographyDisabled)).toEqual(true);
        });
    });
});
