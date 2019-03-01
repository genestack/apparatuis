/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {mount} from 'enzyme';
import * as React from 'react';

import {Grow} from './grow';

describe('<Grow />', () => {
    test('should pass className to children element', () => {
        const wrapper = mount(
            <Grow className="grow">
                <div className="div" />
            </Grow>
        );

        const props = wrapper.find('.div').props();

        expect(props.className).toContain('grow');
    });
});
