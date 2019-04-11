/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React from 'react';

import * as styles from './checkbox.module.css';

interface Props {
    disabled?: boolean;
}

/**
 * Checkbox Icon
 */
export function CheckboxIcon(props: Props) {
    const {disabled} = props;

    return (
        <svg width="10" height="8" className={styles.iconSvg}>
            <path
                className={!disabled ? styles.checkmark : styles.checkmarkDisabled}
                // tslint:disable-next-line:max-line-length
                d="M10 1.562a.668.668 0 0 0-.18-.458L8.941.19A.612.612 0 0 0 8.503 0a.612.612 0 0 0-.438.189L3.832 4.613 1.935 2.626a.612.612 0 0 0-.438-.188.612.612 0 0 0-.439.188l-.877.916a.668.668 0 0 0 0 .916l2.335 2.438.878.915A.612.612 0 0 0 3.832 8a.612.612 0 0 0 .439-.189l.877-.915L9.82 2.02A.668.668 0 0 0 10 1.562z"
            />
        </svg>
    );
}
