/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {shallow} from 'enzyme';
import * as React from 'react';

import {sortClassNames} from '../../../test-utils/sort-class-names';

import {Paper} from './paper';

describe('<Paper />', () => {
    describe('by default', () => {
        const getComponent = () => shallow(<Paper>Test String</Paper>);

        test('should render string children', () => {
            expect(getComponent().text()).toBe('Test String');
        });

        test('should render div HTML element', () => {
            expect(getComponent().find('div')).toHaveLength(1);
        });
    });

    it('should merge class name with own', () => {
        const component = shallow(<Paper className="test-class-name">Test String</Paper>);

        const props = component.find('div').props() as any;

        expect(sortClassNames(props.className)).toEqual(sortClassNames('root test-class-name'));
    });
});
