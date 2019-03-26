/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-empty
import {mount} from 'enzyme';
import * as React from 'react';

import {Typography} from '../typography';

import {ListItemText} from './list-item-text';

describe('<ListItemText />', () => {
    test('should use ListItemText element as Typography', () => {
        const wrapper = mount(<ListItemText>Test</ListItemText>);
        expect(wrapper.find(Typography)).toHaveLength(1);
    });
});
