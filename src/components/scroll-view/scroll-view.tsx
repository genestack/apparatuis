/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import * as styles from './scroll-view.module.css';

/** Props of ScrollView component */
export type Props = React.ComponentPropsWithoutRef<'div'> & {
    /**
     * Defines when and how to show scrollbars. Possible values:
     *
     * `auto` — scrollbars show up on hover or drag
     *
     * `always` — scrollbars are always shown
     */
    showScrollbars?: 'auto' | 'always';
};

const simplebarOptions = {
    autoHide: false
};

/**
 * A wrapper component over [SimpleBar](https://github.com/Grsmto/simplebar/tree/master/packages/simplebar-react) that provides crossplatform experience for scrollable views.
 */
export const ScrollView = ({className, showScrollbars = 'auto', ...rest}: Props) => (
    <SimpleBar
        {...rest}
        className={classNames(
            styles.root,
            {[styles.scrollbarsAlwaysShown]: showScrollbars === 'always'},
            className
        )}
        {...simplebarOptions}
    />
);
