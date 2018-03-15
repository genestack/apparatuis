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
import styles from './paginator.css';

export default class Paginator extends PureComponent {
    constructor(props) {
        super(props);
        this.handleClickPrevious = this.handleClickPrevious.bind(this);
        this.handleClickNext = this.handleClickNext.bind(this);
    }

    handleClickPrevious() {
        this.props.handlePageChange(this.props.currentPage - 1);
    }

    handleClickNext() {
        this.props.handlePageChange(this.props.currentPage + 1);
    }

    render() {
        const {pagesLength, currentPage} = this.props;

        return pagesLength < 2 ? null : (
            <div className={styles.container}>
                <div className={styles.info}>
                    <strong>Page {currentPage + 1} of {pagesLength}</strong>
                </div>
                <ul className={styles.buttons}>
                    <li>
                        <a
                            onClick={currentPage !== 0 ? this.handleClickPrevious : null}
                            className={classNames(styles.link, {
                                [styles.disabled]: currentPage === 0
                            })}
                            title="Previous page"
                        >
                            &lt;
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={currentPage !== pagesLength - 1 ? this.handleClickNext : null}
                            className={classNames(styles.link, {
                                [styles.disabled]: currentPage === pagesLength - 1
                            })}
                            title="Next page"
                        >
                            &gt;
                        </a>
                    </li>
                </ul>
            </div>
        );
    }
}

Paginator.propTypes = {
    pagesLength: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired
};
