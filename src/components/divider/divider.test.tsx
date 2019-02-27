/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {shallow, configure} from 'enzyme';
import ReactSixteenAdapter from 'enzyme-adapter-react-16';
import * as React from 'react';

import {Divider} from './divider';

configure({adapter: new ReactSixteenAdapter()});

describe('<Paper />', () => {
    test('should render hr HTML element', () => {
        expect(shallow(<Divider />).is('hr')).toBe(true);
    });
});
