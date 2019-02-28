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

import {List} from './list';

configure({adapter: new ReactSixteenAdapter()});

describe('<List />', () => {
    test('should render div HTML element', () => {
        const wrapper = mount(<List />);
        expect(wrapper.children().is('div')).toBe(true);
    });
});
