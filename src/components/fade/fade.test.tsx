/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';
import {create as render} from 'react-test-renderer';

import {Fade} from './fade';

describe('Fade Component', () => {
    test('should pass className to children', () => {
        const component = render(
            <Fade className="fade-test">
                <div className="div-test" />
            </Fade>
        );

        const {className} = component.root.findByType('div').props;
        expect(className).toContain('fade-test');
        expect(className).toContain('div-test');
    });
});
