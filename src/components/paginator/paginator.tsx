/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import React from 'react';

import {Omit} from '../../utils/omit';
import {Button} from '../button';

import * as styles from './paginator.module.css';

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** Paginator public properties */
export interface Props extends Omit<TargetProps, 'onChange'> {
    onChange: (value: number) => any;
    itemsLength: number;
    itemsPerPage: number;
    offset: number;
    className?: string;
}

const clickPrevious = ({onChange, offset, itemsPerPage}: Props) => () =>
    onChange(offset - itemsPerPage);

const clickNext = ({onChange, offset, itemsPerPage}: Props) => () =>
    onChange(offset + itemsPerPage);

/**
 * Paginator React component.
 */
export const Paginator = (props: Props) => {
    const {offset, itemsPerPage, itemsLength, className} = props;
    const isFirstPage = offset === 0;
    const isLastPage = offset + itemsPerPage >= itemsLength;
    const firstShownItem = offset + 1;
    const lastShownItem = Math.min(offset + itemsPerPage, itemsLength);
    const paginatorFullClassName = classNames(styles.container, className);

    return (
        <div className={paginatorFullClassName}>
            <div className={styles.info}>
                {firstShownItem === lastShownItem
                    ? lastShownItem
                    : `${firstShownItem} — ${lastShownItem}`}{' '}
                of {itemsLength}
            </div>
            <Button
                onClick={clickPrevious(props)}
                disabled={isFirstPage}
                title="Previous page"
                className={styles.button}
            >
                ◀
            </Button>
            <Button
                onClick={clickNext(props)}
                disabled={isLastPage}
                title="Next page"
                className={styles.button}
            >
                ▶
            </Button>
        </div>
    );
};
