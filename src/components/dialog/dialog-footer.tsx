/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {WithClasses, mergeClassesProps} from '../../utils/styles';
import {DividerProps, Divider} from '../divider';

import {DialogContext} from './dialog-context';
import * as styles from './dialog-footer.module.css';

const DEFAULT_DIVIDER_GAP = 4;

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** DialogFooter public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    contentProps?: React.HTMLAttributes<HTMLDivElement>;
    startDividerProps?: DividerProps;
    endDividerProps?: DividerProps;
}

/**
 * Dialog Footer is element that placed in bottom of Dialog.
 * It should presents required actions (buttons).
 */
export const DialogFooter = (props: Props) => {
    const {
        children,
        contentProps = {},
        startDividerProps,
        endDividerProps,
        classes,
        ...rest
    } = mergeClassesProps(props, styles);

    return (
        <div {...rest} className={classNames(rest.className, classes.root)}>
            <DialogContext.Consumer>
                {(dialogContext) =>
                    !dialogContext.compact ? (
                        <Divider startGap={0} endGap={DEFAULT_DIVIDER_GAP} {...startDividerProps} />
                    ) : null
                }
            </DialogContext.Consumer>

            <div {...contentProps} className={classNames(contentProps.className, classes.content)}>
                {children}
            </div>

            <Divider
                variant="transparent"
                startGap={DEFAULT_DIVIDER_GAP}
                endGap={0}
                {...endDividerProps}
            />
        </div>
    );
};
