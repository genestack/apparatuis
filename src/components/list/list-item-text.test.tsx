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

import {Typography} from '../typography';

import {ListItemCell} from './list-item-cell';
import {ListItemText} from './list-item-text';

configure({adapter: new ReactSixteenAdapter()});

describe('<ListItemText />', () => {
    test('should use ListItemCell as root element', () => {
        expect(
            mount(<ListItemText />)
                .children()
                .is(ListItemCell)
        ).toBe(true);
    });

    test('should use ListItemText element as Typography', () => {
        expect(
            mount(<ListItemText />)
                .children()
                .props().as
        ).toBe(Typography);
    });

    test('should use title from children if it is string', () => {
        expect(
            mount(<ListItemText>Test</ListItemText>)
                .children()
                .props().title
        ).toBe('Test');
    });

    test('should use title from `title` prop', () => {
        expect(
            mount(<ListItemText title="Override">Test</ListItemText>)
                .children()
                .props().title
        ).toBe('Override');
    });
});
