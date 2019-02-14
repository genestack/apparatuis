/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';
import {create as render} from 'react-test-renderer';

import {Backdrop} from '.';

jest.mock('react-dom');
jest.useFakeTimers();

describe('Backdrop Component', () => {
    test('should unmount children after close and end transition', () => {
        const component = render(<Backdrop open />);
        expect(component.root.findAllByType('div')).toHaveLength(1);

        component.update(<Backdrop open={false} />);
        expect(component.root.findAllByType('div')).toHaveLength(1);

        jest.runAllTimers();
        expect(component.root.findAllByType('div')).toHaveLength(0);
    });

    test('should pass onExited callback to Fade element', () => {
        const onExited = jest.fn();

        const component = render(<Backdrop open fadeProps={{onExited}} />);
        component.update(<Backdrop open={false} fadeProps={{onExited}} />);
        jest.runAllTimers();
        expect(onExited).toBeCalled();
    });
});
