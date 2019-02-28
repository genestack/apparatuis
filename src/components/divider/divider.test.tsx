/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {shallow} from 'enzyme';
import * as React from 'react';

import {Divider} from './divider';

describe('<Divider />', () => {
    test('should render hr HTML element', () => {
        expect(shallow(<Divider />).is('hr')).toBe(true);
    });
});
