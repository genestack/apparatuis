/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {Omit} from './omit';

/**
 * A component whose root component can be controlled via a `component` prop.
 *
 * Adjusts valid props based on the type of `component`.
 */
export interface OverridableComponent<M extends OverridableTypeMap> {
    <C extends React.ElementType>(props: {component: C} & OverrideProps<M, C>): JSX.Element | null;
    (props: DefaultComponentProps<M>): JSX.Element | null;
}

/**
 * Interface for using for private props
 */
export type OverridableProps<M extends OverridableTypeMap> = DefaultComponentProps<M> & {
    component?: M['defaultType'];
};

/**
 * Props of the component if `component={Component}` is used.
 */
export type OverrideProps<M extends OverridableTypeMap, C extends React.ElementType> = BaseProps<
    M
> &
    Omit<React.ComponentPropsWithRef<C>, keyof CommonProps>;

/**
 * Props if `component={Component}` is NOT used.
 */
export type DefaultComponentProps<M extends OverridableTypeMap> = BaseProps<M> &
    Omit<React.ComponentPropsWithRef<M['defaultType']>, keyof BaseProps<M>>;

/**
 * Props defined on the component (+ common ui-kit props).
 */
type BaseProps<M extends OverridableTypeMap> = M['props'] & CommonProps;

/**
 * Props that are valid for ui-kit components.
 */
export interface CommonProps {
    className?: string;
    style?: React.CSSProperties;
}

/**
 * Type map to configure overridable components
 */
export interface OverridableTypeMap {
    props: {};
    defaultType: React.ElementType;
}
