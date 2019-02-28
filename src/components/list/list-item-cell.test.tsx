/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {mount, configure} from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import {ListItemCell} from './list-item-cell';

configure({adapter: new ReactSixteenAdapter()});

describe('<ListItemCell />', () => {
    test('should render div HTML element', () => {
        expect(
            mount(<ListItemCell />)
                .children()
                .is('div')
        ).toBe(true);
    });
});
