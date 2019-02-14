/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {sortClassNames} from '../test-utils/sort-class-names';

import {mergeClassesProps, WithClasses} from './styles';

describe('result of calling mergeClassesProps', () => {
    describe('in common case', () => {
        interface Props extends WithClasses<'root' | 'comp'> {
            someProp: boolean;
        }

        const mergeClassesSample = () => {
            const props = {
                someProp: true,
                className: '__className',
                classes: {
                    root: '__root',
                    comp: '__comp',
                    any: '__any'
                }
            };

            return mergeClassesProps(props as Props, {
                root: '_root',
                comp: '_comp'
            });
        };

        it('should have valid keys', () => {
            const props = mergeClassesSample();
            expect(props).toHaveProperty('someProp');
            expect(props).toHaveProperty('className');
            expect(props).toHaveProperty('classes');
        });

        it('should have classes property with valid keys', () => {
            const props = mergeClassesSample();
            expect(props.classes).toHaveProperty('root');
            expect(props.classes).toHaveProperty('comp');
            expect(props.classes).not.toHaveProperty('any');
        });

        it('should have classes property with valid values', () => {
            const props = mergeClassesSample();
            expect(sortClassNames(props.classes.root)).toEqual(sortClassNames('_root __root'));
            expect(sortClassNames(props.classes.comp)).toEqual(sortClassNames('_comp __comp'));
        });
    });
});
