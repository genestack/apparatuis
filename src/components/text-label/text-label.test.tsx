/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render} from '@testing-library/react';
import * as React from 'react';

import {TextLabel} from './text-label';

describe('<TextLabel />', () => {
    it('should render caption with title variant if main variant is header', () => {
        render(
            <TextLabel variant="header" caption="title">
                Label
            </TextLabel>
        );
        expect(document.querySelector('[data-qa=typography]')).toHaveProperty(
            'className',
            expect.stringContaining('title')
        );
    });

    it('should render caption with body variant if main variant is title', () => {
        render(
            <TextLabel variant="title" caption="body">
                Label
            </TextLabel>
        );
        expect(document.querySelector('[data-qa=typography]')).toHaveProperty(
            'className',
            expect.stringContaining('body')
        );
    });

    it('should render caption with caption variant if main variant is default', () => {
        render(<TextLabel caption="caption">Label</TextLabel>);
        expect(document.querySelector('[data-qa=typography]')).toHaveProperty(
            'className',
            expect.stringContaining('caption')
        );
    });
});
