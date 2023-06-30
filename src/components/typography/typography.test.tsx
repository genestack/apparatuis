/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';
import '@testing-library/jest-dom';
import {fireEvent, render} from '@testing-library/react';

import {Typography} from './typography';

describe('Typography Component', () => {
    describe('by default', () => {
        const setup = () => render(<Typography data-testid="test">Test String</Typography>);

        test('should render single children', () => {
            expect(setup().queryByTestId('test')).toBeVisible();
        });

        test('should render p HTML element', () => {
            expect(setup().queryByTestId('test')).toBeInstanceOf(HTMLParagraphElement);
        });

        test('should render string children', () => {
            expect(setup().queryByTestId('test')).toHaveProperty('textContent', 'Test String');
        });
    });

    describe('when pass "button" string to `as` property', () => {
        const setup = () =>
            render(
                <Typography as="button" data-testid="test">
                    Test String
                </Typography>
            );

        test('should render the button element', () => {
            expect(setup().queryByTestId('test')).toBeInstanceOf(HTMLButtonElement);
        });

        test('should render valid children', () => {
            expect(setup().queryByTestId('test')).toHaveProperty('textContent', 'Test String');
        });
    });

    describe('when pass React.Component to `as` property', () => {
        function Paragraph(props: any) {
            return <span {...props} />;
        }

        const setup = () =>
            render(
                <Typography as={Paragraph} data-testid="test">
                    Test String
                </Typography>
            );

        test('should use the React.Component as root element', () => {
            expect(setup().queryByTestId('test')).toBeInstanceOf(HTMLSpanElement);
        });

        test('should render the React.Component children', () => {
            expect(setup().queryByTestId('test')).toHaveProperty('textContent', 'Test String');
        });
    });

    it('should spread all properties to the root element', () => {
        const handleClick = jest.fn();

        const screen = render(
            <Typography as="a" data-testid="test" onClick={handleClick}>
                Test String
            </Typography>
        );

        expect(screen.queryByTestId('test')).toBeInstanceOf(HTMLAnchorElement);
        fireEvent.click(screen.queryByTestId('test')!);
        expect(handleClick).toBeCalled();
    });

    it('should merge class name with own', () => {
        const screen = render(
            <Typography className="test-class-name" data-testid="test">
                Test String
            </Typography>
        );

        expect(screen.queryByTestId('test')).toHaveProperty(
            'className',
            expect.stringContaining('root')
        );
        expect(screen.queryByTestId('test')).toHaveProperty(
            'className',
            expect.stringContaining('body')
        );
        expect(screen.queryByTestId('test')).toHaveProperty(
            'className',
            expect.stringContaining('test-class-name')
        );
    });

    it('should merge classes names with own', () => {
        const screen = render(
            <Typography
                data-testid="test"
                variant="caption"
                classes={{
                    caption: 'test-caption'
                }}
            >
                Test String
            </Typography>
        );

        expect(screen.queryByTestId('test')).toHaveProperty(
            'className',
            expect.stringContaining('root')
        );
        expect(screen.queryByTestId('test')).toHaveProperty(
            'className',
            expect.stringContaining('caption')
        );
        expect(screen.queryByTestId('test')).toHaveProperty(
            'className',
            expect.stringContaining('test-caption')
        );
    });
});
