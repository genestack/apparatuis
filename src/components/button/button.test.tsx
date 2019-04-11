/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';

import {Button} from './button';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<Button />', () => {
    it('should render children', () => {
        app.mount(
            <Button>
                <div id="test" />
            </Button>
        );
        expect(document.getElementById('test')).toBeTruthy();
    });

    it('should render icon', () => {
        app.mount(<Button icon={<div id="icon" />} />);
        expect(document.getElementById('icon')).toBeTruthy();
    });
});
