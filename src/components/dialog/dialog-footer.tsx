/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import classNames from 'classnames';
import * as React from 'react';

import {SlotProps} from '../../utils/slot-props';
import {MarginBox, MarginBoxProps} from '../margin-box';

import {DialogContext} from './dialog-context';
import * as styles from './dialog-footer.module.css';

type TargetProps = React.HTMLAttributes<HTMLDivElement> &
    Pick<MarginBoxProps, 'startDividerProps' | 'endDividerProps'>;

/** DialogFooter public properties */
export interface Props extends TargetProps {
    contentProps?: SlotProps<'div'>;
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

        ...rest
    } = props;

    return (
        <DialogContext.Consumer>
            {(dialogContext) => (
                <MarginBox
                    data-qa="dialog-footer"
                    contained="in-dialog"
                    {...rest}
                    className={classNames(rest.className, styles.root)}
                    noStartDivider={!dialogContext.scrollable}
                    startDividerProps={{
                        variant: 'stroke',
                        ...startDividerProps
                    }}
                >
                    {children}
                </MarginBox>
            )}
        </DialogContext.Consumer>
    );
};
