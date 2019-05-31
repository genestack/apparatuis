/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';

import {Spinner} from './spinner';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

describe('<Spinner/>', () => {
    it('should render SVG element', () => {
        app.mount(<Spinner id="spinner" />);
        expect(document.getElementById('spinner')).toBeInstanceOf(SVGSVGElement);
    });

    it('should render background circle by default', () => {
        app.mount(<Spinner backgroundCircleProps={{id: 'bg-circle'}} />);
        expect(document.getElementById('bg-circle')).toBeInstanceOf(SVGElement);
    });

    it('should not render background circle when hideBackgroundCircle is passed', () => {
        app.mount(<Spinner backgroundCircleProps={{id: 'bg-circle'}} hideBackgroundCircle />);
        expect(document.getElementById('bg-circle')).toBeFalsy();
    });
});
