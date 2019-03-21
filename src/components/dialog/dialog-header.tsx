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
import {Divider, DividerProps} from '../divider';

import {DialogContext} from './dialog-context';
import * as styles from './dialog-header.module.css';

const DEFAULT_DIVIDER_GAP = 4;

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** DialogHeader public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    contentProps?: React.HTMLAttributes<HTMLDivElement>;
    startDividerProps?: DividerProps;
    endDividerProps?: DividerProps;
}

/**
 * Dialog Header should present common info about dialog (title, subtitle).
 * Also it adds right padding for close button placing if exists.
 */
export const DialogHeader = (props: Props) => {
    const {
        children,
        contentProps = {},
        startDividerProps,
        endDividerProps,
        classes,
        ...rest
    } = mergeClassesProps(props, styles);

    return (
        <DialogContext.Consumer>
            {(dialogContext) => (
                <div {...rest} className={classNames(classes.root)}>
                    <Divider
                        variant="transparent"
                        startGap={0}
                        endGap={DEFAULT_DIVIDER_GAP}
                        {...startDividerProps}
                    />
                    <div
                        {...contentProps}
                        className={classNames(contentProps.className, classes.content, {
                            [classes.shiftedContent]: !dialogContext.hideCloseButton
                        })}
                    >
                        {children}
                    </div>
                    {!dialogContext.compact ? (
                        <Divider startGap={DEFAULT_DIVIDER_GAP} endGap={0} {...startDividerProps} />
                    ) : null}
                </div>
            )}
        </DialogContext.Consumer>
    );
};
