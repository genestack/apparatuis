/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {fireEvent, render} from '@testing-library/react';
import * as React from 'react';

import {Textarea} from './textarea';

describe('<Textarea />', () => {
    it('should render textarea element', () => {
        render(<Textarea id="textarea" />);
        expect(document.getElementById('textarea')!.tagName).toBe('TEXTAREA');
    });

    it('should call onValueChange on textarea change', () => {
        const onValueChange = jest.fn();
        render(<Textarea id="textarea" onValueChange={onValueChange} />);
        fireEvent.change(document.getElementById('textarea')!, {target: {value: 'foo'}});
        expect(onValueChange).toHaveBeenCalledWith('foo');
    });
});
