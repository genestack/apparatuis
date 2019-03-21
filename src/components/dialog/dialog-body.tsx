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
import {Divider, DividerProps} from '../divider';

import * as styles from './dialog-body.module.css';
import {DialogContext} from './dialog-context';

const DEFAULT_DIVIDER_GAP = 4;

type TargetProps = React.HTMLAttributes<HTMLDivElement>;

/** DialogBody public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {
    startDividerProps?: DividerProps;
    endDividerProps?: DividerProps;
}

/**
 * DialogBody element includes main content of Dialog.
 *
 * By default dialog body could have scroll when the content is too long.
 * This scroll could be disabled by compact dialog mode.
 */
export const DialogBody = (props: Props) => {
    const {classes, children, startDividerProps, endDividerProps, ...rest} = mergeClassesProps(
        props,
        styles
    );

    return (
        <DialogContext.Consumer>
            {(dialogContext) => (
                <div
                    {...rest}
                    className={classNames(rest.className, classes.root, {
                        [classes.scrollable]: !dialogContext.compact
                    })}
                >
                    <Divider
                        variant="transparent"
                        startGap={0}
                        endGap={DEFAULT_DIVIDER_GAP}
                        {...startDividerProps}
                    />
                    {children}
                    <Divider
                        variant="transparent"
                        startGap={DEFAULT_DIVIDER_GAP}
                        endGap={0}
                        {...endDividerProps}
                    />
                </div>
            )}
        </DialogContext.Consumer>
    );
};
