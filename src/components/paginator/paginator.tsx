/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React from 'react';
import styles from './paginator.module.css';
import Button from '../button/button';

export default (props: PaginatorProps) => {
    const {offset, itemsPerPage, itemsLength} = props;
    const isFirstPage = offset === 0;
    const isLastPage = offset + itemsPerPage >= itemsLength;
    const firstShownItem = offset + 1;
    const lastShownItem = Math.min(offset + itemsPerPage, itemsLength);

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                {firstShownItem === lastShownItem
                    ? lastShownItem
                    : `${firstShownItem} — ${lastShownItem}`}
                {' '}of {itemsLength}
            </div>
            <Button
                onClick={clickPrevious(props)}
                disabled={isFirstPage}
                title='Previous page'
                className={styles.button}
            >
                ◀
            </Button>
            <Button
                onClick={clickNext(props)}
                disabled={isLastPage}
                title='Next page'
                className={styles.button}
            >
                ▶
            </Button>
        </div>
    );
};

export type PaginatorProps =
    & React.Props<HTMLDivElement>
    & {
        onChange: (value: number) => any,
        itemsLength: number,
        itemsPerPage: number,
        offset: number
    };

const clickPrevious = ({onChange, offset, itemsPerPage}: PaginatorProps) => () =>
    onChange(offset - itemsPerPage);

const clickNext = ({onChange, offset, itemsPerPage}: PaginatorProps) => () =>
    onChange(offset + itemsPerPage);
