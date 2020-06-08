/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import * as React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import * as styles from './scroll-view.module.css';

/** Props of ScrollView component */
export type Props = React.ComponentPropsWithoutRef<'div'>;

/**
 * A wrapper component over [SimpleBar](https://github.com/Grsmto/simplebar/tree/master/packages/simplebar-react) that provides crossplatform experience for scrollable views.
 *
 * Note: native scrollbars will be used if they're displayed in "overlay" mode.
 */
export const ScrollView = (props: Props) => {
    const scrollbarsShown = Boolean(scrollbarSize());

    return scrollbarsShown ? (
        <SimpleBar {...props} className={classNames(styles.root, props.className)} />
    ) : (
        <div {...props} />
    );
};
