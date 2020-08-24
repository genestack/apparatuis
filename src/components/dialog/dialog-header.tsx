/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {mergeClassesProps, WithClasses} from '../../utils/styles';
import {MarginBox, MarginBoxProps} from '../margin-box';

import {DialogContext} from './dialog-context';
import * as styles from './dialog-header.module.css';

type TargetProps = React.HTMLAttributes<HTMLDivElement> &
    Pick<MarginBoxProps, 'startDividerProps' | 'endDividerProps'>;

/** DialogHeader public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    contentProps?: React.HTMLAttributes<HTMLDivElement>;
}

/**
 * Dialog Header should present common info about dialog (title, subtitle).
 * Also it adds right padding for close button placing if exists.
 */
export const DialogHeader = (props: Props) => {
    const {
        children,
        contentProps = {},
        endDividerProps,
        startDividerProps,
        classes,
        ...rest
    } = mergeClassesProps(props, styles);

    const dialogContext = React.useContext(DialogContext);

    return (
        <MarginBox
            data-qa="dialog-header"
            contained="in-dialog"
            {...rest}
            className={classNames(rest.className, classes.root)}
            startDividerProps={{
                endGap: 5,
                ...startDividerProps
            }}
            noEndDivider={!dialogContext.scrollable}
            endDividerProps={{
                variant: 'stroke',
                ...endDividerProps
            }}
        >
            <div
                {...contentProps}
                className={classNames(contentProps.className, classes.content, {
                    [classes.shiftedContent]: !dialogContext.hideCloseButton
                })}
            >
                {children}
            </div>
        </MarginBox>
    );
};
