/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.module.css';

export default function ButtonsGroup({children}) {
    return (
        <div className={styles.btnGroup}>
            {children}
        </div>
    );
}

ButtonsGroup.propTypes = {
    children: PropTypes.node.isRequired
};
