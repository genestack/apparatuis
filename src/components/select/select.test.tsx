/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render} from '@testing-library/react';
import * as React from 'react';

import {Option} from './option';
import {Select} from './select';

const mockOnValueChange = jest.fn();

describe('<Select />', () => {
    // Menu select
    it('should render menu select', () => {
        render(<Select />);
        expect(document.querySelectorAll('select')).toHaveLength(0);
        expect(document.querySelectorAll('[data-qa="select"]')).toHaveLength(1);
    });

    it('should render emitter as button', () => {
        render(<Select />);
        expect(document.querySelectorAll('button')).toHaveLength(1);
    });

    // Native select
    it('should render native select', () => {
        render(<Select native />);
        expect(document.querySelectorAll('select')).toHaveLength(1);
        expect(document.querySelectorAll('[data-qa="select-menu"]')).toHaveLength(0);
    });

    it('should render emitter as div', () => {
        render(<Select native />);
        expect(document.querySelector('[data-qa="select"]')).toBeInstanceOf(HTMLDivElement);
    });

    it('should render Option as option', () => {
        render(
            <Select native>
                <Option value="1" />
            </Select>
        );
        expect(document.querySelectorAll('option')).toHaveLength(1);
    });

    it('should render emitter with placeholder', () => {
        render(
            <Select
                native
                value="0"
                placeholder="Some placeholder"
                onValueChange={mockOnValueChange}
            >
                <Option value="1" label="Some value" />
            </Select>
        );

        expect(document.querySelector('[data-qa="select"]')).toHaveProperty(
            'textContent',
            'Some placeholder'
        );
    });

    it('should render emitter with custom label', () => {
        render(
            <Select native value="1" onValueChange={mockOnValueChange}>
                <Option value="1" label="Some text" />
            </Select>
        );

        expect(document.querySelector('[data-qa="select"]')).toHaveProperty(
            'textContent',
            'Some text'
        );
    });
});
