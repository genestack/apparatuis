/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable: no-non-null-assertion
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';

import {Link} from './link';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<Link/>', () => {
    it('should render anchor element', () => {
        app.mount(<Link id="link" />);

        expect(document.getElementById('link')).toBeInstanceOf(HTMLAnchorElement);
    });

    it('should call onClick by default', () => {
        const onClick = jest.fn();
        const wrapper = app.mount(<Link id="link" onClick={onClick} />);
        wrapper.find('a').simulate('click');
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
        const onClick = jest.fn();
        const wrapper = app.mount(<Link id="link" onClick={onClick} disabled />);
        wrapper.find('a').simulate('click');
        expect(onClick).not.toBeCalled();
    });

    it('should pass href to anchor', () => {
        app.mount(<Link id="link" href="foo" />);
        expect(document.getElementById('link')).toHaveProperty('href', 'http://localhost/foo');
    });

    it('should not pass href if disabled', () => {
        app.mount(<Link id="link" href="foo" disabled />);
        expect(document.getElementById('link')).toHaveProperty('href', '');
    });

    it('should pass tabIndex to anchor', () => {
        app.mount(<Link id="link" tabIndex={0} />);
        expect(document.getElementById('link')!.getAttribute('tabindex')).toBe('0');
    });

    it('should not pass tabIndex to anchor if disabled', () => {
        app.mount(<Link id="link" tabIndex={0} disabled />);
        expect(document.getElementById('link')!.getAttribute('tabindex')).toBe(null);
    });
});
