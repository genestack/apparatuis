/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {render} from '@testing-library/react';
import '@testing-library/jest-dom';
import * as React from 'react';

import {Drawer} from './drawer';
import {DrawerFullWidth} from './drawer-full-width';

describe('<Drawer />', () => {
    it('should be focused on mount', () => {
        const screen = render(
            <Drawer open onClose={jest.fn()} data-testid="test">
                <DrawerFullWidth />
            </Drawer>
        );

        expect(screen.queryByTestId('test')).toHaveFocus();
    });
});
