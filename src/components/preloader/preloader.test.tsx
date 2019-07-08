/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';
import {create} from 'react-test-renderer';

import {DarkContext} from '../../utils/dark-context';

import {Preloader} from './preloader';

// tslint:disable no-magic-numbers
describe('Preloader component', () => {
    it('renders correctly with count', () => {
        const tree = create(<Preloader count={5} show />);
        expect(tree).toMatchSnapshot();
    });

    it('renders children when show === false', () => {
        const tree = create(<Preloader count={5}>Foo</Preloader>);
        expect(tree).toMatchSnapshot();
    });

    it('works with DarkContext', () => {
        const tree = create(
            <DarkContext.Provider value>
                <Preloader show count={6}>
                    Foo
                </Preloader>
            </DarkContext.Provider>
        );
        expect(tree).toMatchSnapshot();
    });

    it('works with inverted without DarkContext', () => {
        const tree = create(
            <Preloader show count={6} inverted>
                Foo
            </Preloader>
        );
        expect(tree).toMatchSnapshot();
    });

    it('works with custom classnames', () => {
        const tree = create(<Preloader show count={5} iterateClassnames={['foo', 'bar', 'baz']} />);
        expect(tree).toMatchSnapshot();
    });

    it('works with wrapAll and wrapEach as IntrinsicElements', () => {
        const tree = create(<Preloader show count={5} wrapAll="div" wrapEach="span" />);
        expect(tree).toMatchSnapshot();
    });

    it('works with wrapAll and wrapEach as fucntional components', () => {
        const tree = create(
            <Preloader
                show
                count={5}
                wrapAll={({children}: any) => <div>{children}</div>}
                wrapEach={({children}: any) => <span>{children}</span>}
            />
        );
        expect(tree).toMatchSnapshot();
    });
});
