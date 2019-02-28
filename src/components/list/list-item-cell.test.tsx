/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {mount} from 'enzyme';
import * as React from 'react';

import {ListItemCell} from './list-item-cell';

describe('<ListItemCell />', () => {
    test('should render div HTML element', () => {
        expect(
            mount(<ListItemCell />)
                .children()
                .is('div')
        ).toBe(true);
    });
});
