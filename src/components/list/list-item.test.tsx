/*
 * Copyright (c) 2011-2021 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as React from 'react';

import {ListItem} from './list-item';

describe('<ListItem />', () => {
    it('should render div HTML element', () => {
        render(<ListItem />);
        expect(document.querySelectorAll('li')).toHaveLength(1);
    });

    it('should not be focusable by default', () => {
        render(<ListItem />);
        expect(document.querySelector('li')).toHaveProperty('tabIndex', -1);
    });

    it('should be focusable when interactive', () => {
        render(<ListItem interactive />);
        expect(document.querySelector('li')).toHaveProperty('tabIndex', 0);
    });

    it('should be not focusable if disabled', () => {
        render(<ListItem disabled interactive />);
        expect(document.querySelector('li')).toHaveProperty('tabIndex', -1);
    });

    it('should accept tabIndex', () => {
        render(<ListItem tabIndex={2} />);
        expect(document.querySelector('li')).toHaveProperty('tabIndex', 2);
    });

    it('should render custom elements', () => {
        render(<ListItem as="button" />);
        expect(document.querySelector('button')).toBeVisible();
    });

    it('should render anchor if href property passed', () => {
        render(<ListItem id="test" href="foo" />);
        expect(document.getElementById('test')).toBeInstanceOf(HTMLAnchorElement);
        expect(document.getElementById('test')).toHaveProperty('href', 'http://localhost/foo');
    });

    it('should render prepend element', () => {
        render(<ListItem prepend={<div id="prepend" />} />);
        expect(document.getElementById('prepend')).toBeInstanceOf(HTMLElement);
    });

    it('should render append element', () => {
        render(<ListItem append={<div id="append" />} />);
        expect(document.getElementById('append')).toBeInstanceOf(HTMLElement);
    });

    it('should render subtitle', () => {
        render(<ListItem subtitle="subtitle" subtitleProps={{id: 'subtitle'}} />);
        expect(document.getElementById('subtitle')).toHaveProperty('textContent', 'subtitle');
    });

    it('should pass ref with non-interactive component', () => {
        const ref = React.createRef();

        render(
            <div>
                <ListItem subtitle="subtitle" ref={ref} />
            </div>
        );

        expect(document.querySelector('li')).toBe(ref.current);
    });

    it('should pass ref with interactive component', () => {
        const ref = React.createRef();

        render(
            <div>
                <ListItem subtitle="subtitle" ref={ref} interactive />
            </div>
        );

        expect(document.querySelector('li')).toBe(ref.current);
    });
});
