/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render} from '@testing-library/react';
import * as React from 'react';

import {Tab} from './tab';

describe('<Tab />', () => {
    it('should render children', () => {
        render(
            <Tab>
                <div id="test" />
            </Tab>
        );
        expect(document.getElementById('test')).toBeTruthy();
    });

    it('should render prepend', () => {
        render(<Tab prepend={<div id="prepend" />} />);
        expect(document.getElementById('prepend')).toBeTruthy();
    });

    it('should render append', () => {
        render(<Tab prepend={<div id="append" />} />);
        expect(document.getElementById('append')).toBeTruthy();
    });

    it('should show title', () => {
        render(<Tab>Some title</Tab>);
        expect(document.querySelector('button')).toHaveProperty('title', 'Some title');
    });

    it('should have empty title', () => {
        render(
            <Tab>
                <div>Some title</div>
            </Tab>
        );
        expect(document.querySelector('button')).toHaveProperty('title', '');
    });

    it('should render button element by default', () => {
        render(<Tab id="test" />);
        expect(document.getElementById('test')).toBeInstanceOf(HTMLButtonElement);
    });

    it('should render anchor element if href and component="a" are passed', () => {
        render(<Tab id="test" component="a" href="foo" />);
        expect(document.getElementById('test')).toBeInstanceOf(HTMLAnchorElement);
        expect(document.getElementById('test')).toHaveProperty('href', 'http://localhost/foo');
    });
});
