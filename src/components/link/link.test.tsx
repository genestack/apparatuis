/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {fireEvent, render} from '@testing-library/react';
import * as React from 'react';

import {Link} from './link';

describe('<Link/>', () => {
    it('should render anchor element', () => {
        render(<Link id="link" />);

        expect(document.getElementById('link')).toBeInstanceOf(HTMLAnchorElement);
    });

    it('should call onClick by default', () => {
        const onClick = jest.fn();
        render(<Link id="link" onClick={onClick} />);
        fireEvent.click(document.getElementById('link')!);
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
        const onClick = jest.fn();
        render(<Link id="link" onClick={onClick} disabled />);
        fireEvent.click(document.getElementById('link')!);
        expect(onClick).not.toHaveBeenCalled();
    });

    it('should pass href to anchor', () => {
        render(<Link id="link" href="foo" />);
        expect(document.getElementById('link')).toHaveProperty('href', 'http://localhost/foo');
    });

    it('should not pass href if disabled', () => {
        render(<Link id="link" href="foo" disabled />);
        expect(document.getElementById('link')).toHaveProperty('href', '');
    });

    it('should pass tabIndex to anchor', () => {
        render(<Link id="link" tabIndex={0} />);
        expect(document.getElementById('link')?.getAttribute('tabindex')).toBe('0');
    });

    it('should not pass tabIndex to anchor if disabled', () => {
        render(<Link id="link" tabIndex={0} disabled />);
        expect(document.getElementById('link')?.getAttribute('tabindex')).toBe(null);
    });

    it('should render div when use "as" property', () => {
        render(<Link id="link" as="div" />);

        expect(document.getElementById('link')).toBeInstanceOf(HTMLDivElement);
    });
});
