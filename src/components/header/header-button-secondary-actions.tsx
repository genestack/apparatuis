/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {chain} from '../../utils/chain';

import * as styles from './header-button-secondary-actions.module.css';

/** HeaderButtonSecondaryActions public properties */
export type Props = React.HTMLAttributes<HTMLElement>;

/**
 * Header button could include other buttons.
 * Wrap this buttons with HeaderButtonSecondaryActions to avoid click conflicts.
 */
export class HeaderButtonSecondaryActions extends React.Component<Props> {
    private handleClick: Props['onClick'] = (event) => {
        event.stopPropagation();
    };

    public render() {
        return (
            <div
                {...this.props}
                onClick={chain(this.props.onClick, this.handleClick)}
                className={classNames(this.props.className, styles.root)}
            />
        );
    }
}
