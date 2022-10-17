/*
 * Copyright (c) 2011-2022 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {shallow} from 'enzyme';
import * as React from 'react';

import {Avatar} from './avatar';

describe('<Avatar />', () => {
    describe('"initials" property has length 1', () => {
        const getComponent = () => shallow(<Avatar initials="A" />);
        it('should render div HTML element', () => {
            expect(getComponent().find('div')).toHaveLength(1);
        });

        it('should render child with text of one letter', () => {
            expect(getComponent().find('div').text()).toBe('A');
        });
    });

    describe('"initials" property has length 2', () => {
        const getComponent = () => shallow(<Avatar initials="AB" />);
        it('it should render two div HTML elements', () => {
            expect(getComponent().find('div')).toHaveLength(2);
        });
    });

    describe('"initials" property has length 3', () => {
        test('it should render two div HTML elements', () => {
            const getComponent = () => shallow(<Avatar initials="ABC" />);

            expect(getComponent().find('div')).toHaveLength(2);
        });
    });

    describe('icon avatars', () => {
        test('should render icon', () => {
            const getComponent = () => shallow(<Avatar icon={<div id="icon" />} />);

            expect(getComponent().find('#icon')).toBeTruthy();
        });
    });
});
