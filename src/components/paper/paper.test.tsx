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

import {sortClassNames} from '../../test-utils/sort-class-names';

import {Paper} from './paper';

configure({adapter: new ReactSixteenAdapter()});

describe('<Paper />', () => {
    describe('by default', () => {
        const getComponent = () => shallow(<Paper>Test String</Paper>);

        test('should render string children', () => {
            expect(getComponent().text()).toBe('Test String');
        });

        test('should render div HTML element', () => {
            expect(getComponent().is('div')).toBe(true);
        });
    });

    describe('when pass "button" string to `as` property', () => {
        const getComponent = () => shallow(<Paper as="button">Test String</Paper>);

        test('should render string children', () => {
            expect(getComponent().text()).toBe('Test String');
        });

        test('should render div HTML element', () => {
            expect(getComponent().is('button')).toBe(true);
        });
    });

    describe('when pass React.Component to `as` property', () => {
        class MyComponent extends React.Component {
            public render() {
                return <p {...this.props} />;
            }
        }

        const getComponent = () => shallow(<Paper as={MyComponent}>Test String</Paper>);

        test('should use the React.Component as root element', () => {
            expect(getComponent().is(MyComponent)).toBe(true);
        });

        test('should render the custom component children', () => {
            expect(
                getComponent()
                    .children()
                    .text()
            ).toBe('Test String');
        });
    });

    it('should spread all properties to the root element', () => {
        const handleClick = jest.fn();

        const component = shallow(
            <Paper as="a" id="test-id" onClick={handleClick}>
                Test String
            </Paper>
        );

        const props = component.find('a').props();
        expect(props.id).toBe('test-id');
        expect(props.onClick).toBe(handleClick);
    });

    it('should merge class name with own', () => {
        const component = shallow(<Paper className="test-class-name">Test String</Paper>);

        const props = component.find('div').props() as any;

        expect(sortClassNames(props.className)).toEqual(sortClassNames('root test-class-name'));
    });
});
