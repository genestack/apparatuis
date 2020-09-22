/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';

import {Badge} from './badge';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<Badge />', () => {
    it('should render div HTML element by default', () => {
        app.mount(<Badge id="test">Foo</Badge>);
        expect(document.getElementById('test')).toBeInstanceOf(HTMLDivElement);
    });

    it('should render children', () => {
        app.mount(<Badge id="test">Foo</Badge>);
        expect(document.getElementById('test')!.textContent).toBe('Foo');
    });
});
