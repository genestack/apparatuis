/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {mount} from 'enzyme';
import * as React from 'react';

import {Drawer} from './drawer';
import {DrawerContent} from './drawer-content';

describe('<Drawer />', () => {
    it('should be focused on mount', () => {
        mount(
            <Drawer open onClose={jest.fn()} id="test">
                <DrawerContent />
            </Drawer>
        );

        expect(document.activeElement).toBe(document.getElementById('test'));
    });
});
