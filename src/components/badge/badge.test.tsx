/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {shallow} from 'enzyme';
import * as React from 'react';

import {Badge} from './badge';

describe('<Badge />', () => {
    const getComponent = () => shallow(<Badge>Foo</Badge>);
    it('should render div HTML element by default', () => {
        expect(getComponent().find('div')).toHaveLength(1);
    });

    it('should render children', () => {
        expect(
            getComponent()
                .find('div')
                .text()
        ).toBe('Foo');
    });
});
