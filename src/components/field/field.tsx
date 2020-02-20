/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {OverridableComponent, OverridableProps} from '../../utils/overridable-component';
import {mergeClassesProps, WithClasses} from '../../utils/styles';

import * as styles from './field.module.css';

/** Field public properties */
export interface Props extends WithClasses<keyof typeof styles> {
    fullWidth?: boolean;
    invalid?: boolean;
    focused?: boolean;
    disabled?: boolean;
}

interface TypeMap {
    props: Props;
    defaultType: 'div';
}

/**
 * Field is base component that used to set common styles for input-like components
 * like `select`, `input`, `textarea` etc.
 * Using of this component should be avoided in common cases.
 */
export const Field: OverridableComponent<TypeMap> = React.forwardRef<
    HTMLDivElement,
    OverridableProps<TypeMap>
    // tslint:disable-next-line: no-shadowed-variable
>(function Field(props, ref) {
    const {
        component: Component = 'div',
        fullWidth,
        focused,
        invalid,
        classes,
        ...rest
    } = mergeClassesProps(props, styles);

    return (
        <Component
            data-qa="field"
            {...rest}
            ref={ref}
            className={classNames(rest.className, classes.root, {
                [classes.invalid]: invalid,
                [classes.disabled]: rest.disabled,
                [classes.focused]: focused,
                [classes.fullWidth]: fullWidth
            })}
        />
    );
});
