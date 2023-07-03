/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render} from '@testing-library/react';
import * as React from 'react';

import {Divider} from './divider';

describe('<Divider />', () => {
    test('should render hr HTML element', () => {
        expect(render(<Divider data-testid="test" />).queryByTestId('test')).toBeInstanceOf(
            HTMLHRElement
        );
    });
});
