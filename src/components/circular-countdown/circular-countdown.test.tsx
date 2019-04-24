/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
// tslint:disable no-non-null-assertion
import * as React from 'react';

import {createTestApp} from '../../../test-utils/create-test-app';

import {CircularCountdown} from './circular-countdown';

const app = createTestApp();

beforeEach(app.beforeEach);
afterEach(app.afterEach);

jest.useFakeTimers();

describe('<CircularCountdown />', () => {
    it('should render <circle /> element', () => {
        app.mount(<CircularCountdown circleProps={{id: 'test'}} />);
        expect(document.getElementById('test')!.tagName).toBe('circle');
    });

    it('should call onComplete callback', () => {
        const onComplete = jest.fn();
        const wrapper = app.mount(<CircularCountdown onComplete={onComplete} />);
        expect(onComplete).not.toBeCalled();
        wrapper.setProps({in: true});
        expect(onComplete).not.toBeCalled();
        jest.runAllTimers();
        expect(onComplete).toBeCalled();
    });
});
