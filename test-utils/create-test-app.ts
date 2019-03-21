/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {mount, ReactWrapper} from 'enzyme';
import * as React from 'react';

/** Create Application for tests */
export function createTestApp() {
    let appElement: HTMLElement | undefined;
    let wrapper: ReactWrapper<any, any> | null = null;

    const mountToBody = <P, S = any>(node: React.ReactElement<P>): ReactWrapper<P, S> => {
        wrapper = mount(node, {attachTo: appElement});

        return wrapper;
    };

    const unmount = () => {
        if (wrapper) {
            wrapper.detach();
        }
    };

    return {
        beforeEach: () => {
            appElement = document.createElement('div');
            document.body.appendChild(appElement);
        },

        afterEach: () => {
            if (appElement) {
                appElement.remove();
            }

            unmount();
        },

        mount: mountToBody,
        unmount
    };
}
