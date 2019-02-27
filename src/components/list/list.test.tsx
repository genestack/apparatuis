/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {mount} from 'enzyme';
import * as React from 'react';

import {List} from './list';

describe('<List />', () => {
    test('should render div HTML element', () => {
        const wrapper = mount(<List />);
        expect(wrapper.children().is('div')).toBe(true);
    });
});
