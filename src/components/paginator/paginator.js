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
        const {handlePageChange, offset, itemsPerPage} = this.props;
        handlePageChange(offset - itemsPerPage);
    }

    handleClickNext() {
        const {handlePageChange, offset, itemsPerPage} = this.props;
        handlePageChange(offset + itemsPerPage);
    }

    render() {
        const {offset, itemsPerPage, itemsLength} = this.props;

        return itemsLength <= itemsPerPage ? null : (
            <div className={styles.container}>
                <div className={styles.info}>
                    {offset + 1} — {Math.min(offset + itemsPerPage, itemsLength)} of {itemsLength}
                </div>
                <ButtonsGroup>
                    <Button
                        onClick={offset !== 0 ? this.handleClickPrevious : null}
                        isDisabled={offset === 0}
                        title="Previous page"
                    >
                        &lt;
                    </Button>
                    <Button
                        onClick={offset + itemsPerPage < itemsLength ? this.handleClickNext : null}
                        isDisabled={offset + itemsPerPage >= itemsLength}
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
    handlePageChange: PropTypes.func.isRequired,
    itemsLength: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired
};
