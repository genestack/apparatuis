/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

// tslint:disable no-non-null-assertion
import {render} from '@testing-library/react';
import * as React from 'react';

import {Switch} from './switch';

describe('<Switch />', () => {
    it('should render input element', () => {
        render(<Switch id="switch" />);
        expect(document.getElementById('switch')!.tagName).toBe('INPUT');
    });

    it('should call onCheckedChange on click on input', () => {
        const onCheckedChange = jest.fn();
        render(<Switch onCheckedChange={onCheckedChange} id="switch" />);
        document.getElementById('switch')!.dispatchEvent(new MouseEvent('click', {bubbles: true}));

        expect(onCheckedChange).toBeCalledWith(true);
    });

    it('should call onCheckedChange on click on label', () => {
        const onCheckedChange = jest.fn();
        render(
            <label id="label">
                <Switch onCheckedChange={onCheckedChange} />
            </label>
        );
        document.getElementById('label')!.dispatchEvent(new MouseEvent('click', {bubbles: true}));

        expect(onCheckedChange).toBeCalledWith(true);
    });
});
