/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './paginator.module.css';
import Button from 'components/button/button';
import ButtonsGroup from 'components/button/buttons-group';

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
                <ButtonsGroup>
                    <Button
                        onClick={this.handleClickPrevious}
                        isDisabled={isFirstPage}
                        title="Previous page"
                    >
                        &lt;
                    </Button>
                    <Button
                        onClick={this.handleClickNext}
                        isDisabled={isLastPage}
                        title="Next page"
                    >
                        &gt;
                    </Button>
                </ButtonsGroup>
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
