/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';
import {create as render} from 'react-test-renderer';

import {sortClassNames} from '../../test-utils/sort-class-names';

import {Typography} from '.';

describe('Typography Component', () => {
    describe('by default', () => {
        const getComponent = () => render(<Typography>Test String</Typography>);

        test('should match snapshot', () => {
            expect(getComponent().toJSON()).toMatchSnapshot();
        });

        test('should render single children', () => {
            expect(getComponent().root.children).toHaveLength(1);
        });

        test('should render div HTML element', () => {
            expect(getComponent().root.findAllByType('div')).toHaveLength(1);
        });

        test('should render string children', () => {
            expect(getComponent().root.findByType('div').children).toEqual(['Test String']);
        });
    });

    describe('when pass "button" string to `as` property', () => {
        const getComponent = () => render(<Typography as="button">Test String</Typography>);

        test('should match snapshot', () => {
            expect(getComponent().toJSON()).toMatchSnapshot();
        });

        test('should render the button element', () => {
            expect(getComponent().root.findAllByType('button')).toHaveLength(1);
        });

        test('should render valid children', () => {
            expect(getComponent().root.findByType('button').children).toEqual(['Test String']);
        });
    });

    describe('when pass React.Component to `as` property', () => {
        class Paragraph extends React.Component {
            public render() {
                return <p {...this.props} />;
            }
        }

        const getComponent = () => render(<Typography as={Paragraph}>Test String</Typography>);

        test('should match snapshot', () => {
            expect(getComponent().toJSON()).toMatchSnapshot();
        });

        test('should use the React.Component as root element', () => {
            expect(getComponent().root.findAllByType(Paragraph)).toHaveLength(1);
        });

        test('should render the React.Component children', () => {
            expect(getComponent().root.findByType('p').children).toEqual(['Test String']);
        });
    });

    it('should spread all properties to the root element', () => {
        const handleClick = jest.fn();

        const component = render(
            <Typography as="a" id="test-id" onClick={handleClick}>
                Test String
            </Typography>
        );

        const root = component.root.findByType('a');

        expect(root.props.id).toEqual('test-id');
        expect(root.props.onClick).toEqual(handleClick);
    });

    it('should merge class name with own', () => {
        const component = render(<Typography className="test-class-name">Test String</Typography>);

        const root = component.root.findByType('div');

        expect(sortClassNames(root.props.className)).toEqual(
            sortClassNames('root body test-class-name')
        );
    });

    it('should merge classes names with own', () => {
        const component = render(
            <Typography
                variant="caption"
                classes={{
                    caption: 'test-caption'
                }}
            >
                Test String
            </Typography>
        );

        const root = component.root.findByType('div');

        expect(sortClassNames(root.props.className)).toEqual(
            sortClassNames('root caption test-caption')
        );
    });
});
