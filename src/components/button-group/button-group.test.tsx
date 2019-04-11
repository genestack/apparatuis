/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-non-null-assertion
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';
import {Button} from '../button';

import {ButtonGroup} from './button-group';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<ButtonGroup />', () => {
    it('should pass variant to containing buttons', () => {
        app.mount(
            <ButtonGroup variant="ghost">
                <Button id="button-1" />
            </ButtonGroup>
        );

        expect(document.getElementById('button-1')!.className).toContain('ghost');
    });
});
