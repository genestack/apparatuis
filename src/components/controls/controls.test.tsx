/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';

import {Controls} from './controls';
import {ControlsItem} from './controls-item';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<Controls />', () => {
    it('should render children', () => {
        app.mount(
            <Controls>
                <ControlsItem>
                    <div id="test" />
                </ControlsItem>
            </Controls>
        );
        expect(document.getElementById('test')).toBeTruthy();
    });
});
