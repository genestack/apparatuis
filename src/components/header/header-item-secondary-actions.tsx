/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
/* eslint-disable react/prop-types */
import classNames from 'classnames';
import * as React from 'react';

import {chain} from '../../utils/chain';

import * as styles from './header-item-secondary-actions.module.css';

/** HeaderItemSecondaryActions public properties */
export type Props = React.HTMLAttributes<HTMLElement>;

/**
 * Header item could include other buttons.
 * Wrap this buttons with HeaderItemSecondaryActions to avoid click conflicts.
 */
export class HeaderItemSecondaryActions extends React.Component<Props> {
    private handleClick: Props['onClick'] = (event) => {
        event.stopPropagation();
        event.preventDefault();
    };

    public render() {
        return (
            <div
                data-qa="header-item-secondary-actions"
                {...this.props}
                onClick={chain(this.props.onClick, this.handleClick)}
                className={classNames(this.props.className, styles.root)}
            />
        );
    }
}
