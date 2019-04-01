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
import {MarginBox, MarginBoxProps} from '../margin-box';

import {DialogContext} from './dialog-context';
import * as styles from './dialog-footer.module.css';

type TargetProps = React.HTMLAttributes<HTMLDivElement> &
    Pick<MarginBoxProps, 'startDividerProps' | 'endDividerProps'>;

/** DialogFooter public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    contentProps?: React.HTMLAttributes<HTMLDivElement>;
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

        classes,
        ...rest
    } = mergeClassesProps(props, styles);

    return (
        <DialogContext.Consumer>
            {(dialogContext) => (
                <MarginBox
                    {...rest}
                    className={classNames(rest.className, classes.root)}
                    noStartDivider={dialogContext.compact}
                    startDividerProps={{
                        variant: 'stroke',
                        ...startDividerProps
                    }}
                >
                    <div
                        {...contentProps}
                        className={classNames(contentProps.className, classes.content)}
                    >
                        {children}
                    </div>
                </MarginBox>
            )}
        </DialogContext.Consumer>
    );
};
