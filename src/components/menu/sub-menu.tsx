/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {wrapPureComponent} from '../../utils/wrap-pure-component';
import {List, ListProps} from '../list';

import * as styles from './menu.module.css';

/** SubMenu public properties */
export type Props = ListProps;

/**
 * SubMenu is stylized `<List />` component.
 * It uses pure component to prevent unnecessary updates
 * caused by transition components.
 */
export const SubMenu = wrapPureComponent((props: Props) => {
    return (
        <List
            data-qa="sub-menu"
            {...props}
            className={classNames(props.className, styles.subMenu)}
        />
    );
});
