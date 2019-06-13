/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';

import {Suggest} from './suggest';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<Suggest />', () => {
    it('should render input element', () => {
        app.mount(<Suggest id="test" />);
        expect(document.getElementById('test')).toBeInstanceOf(HTMLInputElement);
    });
});
