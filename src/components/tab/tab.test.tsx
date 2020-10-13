/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';

import {Tab} from './tab';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<Button />', () => {
    it('should render children', () => {
        app.mount(
            <Tab>
                <div id="test" />
            </Tab>
        );
        expect(document.getElementById('test')).toBeTruthy();
    });

    it('should render prepend', () => {
        app.mount(<Tab prepend={<div id="prepend" />} />);
        expect(document.getElementById('prepend')).toBeTruthy();
    });

    it('should render append', () => {
        app.mount(<Tab prepend={<div id="append" />} />);
        expect(document.getElementById('append')).toBeTruthy();
    });

    it('should show title', () => {
        const wrapper = app.mount(<Tab>Some title</Tab>);
        expect(wrapper.find('button').prop('title')).toBe('Some title');
    });

    it("shouldn't have title", () => {
        const wrapper = app.mount(
            <Tab>
                <div>Some title</div>
            </Tab>
        );
        expect(wrapper.find('button').prop('title')).toBeFalsy();
    });
});
