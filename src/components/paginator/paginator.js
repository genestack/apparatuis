/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './paginator.module.css';
import Button from './../button/button';

export default class Paginator extends PureComponent {
    constructor(props) {
        super(props);
        this.handleClickPrevious = this.handleClickPrevious.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
    }

    handleClickPrevious() {
        const {onChange, offset, itemsPerPage} = this.props;
        onChange(offset - itemsPerPage);
    }

    handleClickNext() {
        const {onChange, offset, itemsPerPage} = this.props;

        onChange(offset + itemsPerPage);
    }

    render() {
        const {offset, itemsPerPage, itemsLength} = this.props;
        const isFirstPage = offset === 0;
        const isLastPage = offset + itemsPerPage >= itemsLength;
        const firstShownItem = offset + 1;
        const lastShownItem = Math.min(offset + itemsPerPage, itemsLength);

        return (
            <div className={styles.container}>
                <div className={styles.info}>
                    {firstShownItem === lastShownItem ?
                        lastShownItem
                        : `${firstShownItem} — ${lastShownItem}`}
                    {' '}of {itemsLength}
                </div>
                <Button
                    onClick={this.handleClickPrevious}
                    isDisabled={isFirstPage}
                    title="Previous page"
                >
                    ◀
                </Button>
                <Button
                    onClick={this.handleClickNext}
                    isDisabled={isLastPage}
                    title="Next page"
                >
                    ▶
                </Button>
            </div>
        );
    }
}

Paginator.propTypes = {
    onChange: PropTypes.func.isRequired,
    itemsLength: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired
};
