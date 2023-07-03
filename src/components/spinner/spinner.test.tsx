/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render} from '@testing-library/react';
import * as React from 'react';

import {Spinner} from './spinner';

describe('<Spinner/>', () => {
    it('should render SVG element', () => {
        render(<Spinner id="spinner" />);
        expect(document.getElementById('spinner')).toBeInstanceOf(SVGSVGElement);
    });

    it('should render background circle by default', () => {
        render(<Spinner backgroundCircleProps={{id: 'bg-circle'}} />);
        expect(document.getElementById('bg-circle')).toBeInstanceOf(SVGElement);
    });

    it('should not render background circle when hideBackgroundCircle is passed', () => {
        render(<Spinner backgroundCircleProps={{id: 'bg-circle'}} hideBackgroundCircle />);
        expect(document.getElementById('bg-circle')).toBeFalsy();
    });
});
