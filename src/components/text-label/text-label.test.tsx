/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';
import {Typography} from '../typography';

import {TextLabel} from './text-label';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<TextLabel />', () => {
    it('should render caption with title variant if main variant is header', () => {
        const wrapper = app.mount(
            <TextLabel variant="header" caption="title">
                Label
            </TextLabel>
        );
        expect(
            wrapper.findWhere((node) => {
                return node.type() === Typography && node.props().variant === 'title';
            })
        ).toHaveLength(1);
    });

    it('should render caption with body variant if main variant is title', () => {
        const wrapper = app.mount(
            <TextLabel variant="title" caption="body">
                Label
            </TextLabel>
        );
        expect(
            wrapper.findWhere((node) => {
                return node.type() === Typography && node.props().variant === 'body';
            })
        ).toHaveLength(1);
    });

    it('should render caption with caption variant if main variant is default', () => {
        const wrapper = app.mount(<TextLabel caption="caption">Label</TextLabel>);
        expect(
            wrapper.findWhere((node) => {
                return node.type() === Typography && node.props().variant === 'caption';
            })
        ).toHaveLength(1);
    });
});
