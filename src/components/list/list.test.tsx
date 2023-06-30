/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';

import * as React from 'react';

import {List} from './list';

describe('<List />', () => {
    test('should render div HTML element', () => {
        render(<List />);
        expect(document.querySelector('ul')).toBeVisible();
    });
});
