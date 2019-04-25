/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';
import {create as render} from 'react-test-renderer';

import {Shake} from './shake';

describe('Shake Component', () => {
    test('should pass className to children', () => {
        const component = render(
            <Shake className="shake-test">
                <div className="div-test" />
            </Shake>
        );

        const {className} = component.root.findByType('div').props;
        expect(className).toContain('shake-test');
        expect(className).toContain('div-test');
    });
});
