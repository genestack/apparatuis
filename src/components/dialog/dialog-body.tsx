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
import {MarginBoxProps, MarginBox} from '../margin-box';

import * as styles from './dialog-body.module.css';
import {DialogContext} from './dialog-context';

type TargetProps = React.HTMLAttributes<HTMLDivElement> & Omit<MarginBoxProps, 'classes'>;

/** DialogBody public properties */
export interface Props extends TargetProps, WithClasses<keyof typeof styles> {}

/**
 * DialogBody element includes main content of Dialog.
 *
 * By default dialog body could have scroll when the content is too long.
 * This scroll could be disabled by compact dialog mode.
 */
export const DialogBody = (props: Props) => {
    const {classes, ...rest} = mergeClassesProps(props, styles);

    return (
        <DialogContext.Consumer>
            {(dialogContext) => (
                <MarginBox
                    data-qa="dialog-body"
                    contained="in-dialog"
                    {...rest}
                    className={classNames(rest.className, classes.root, {
                        [classes.scrollable]: dialogContext.scrollable
                    })}
                />
            )}
        </DialogContext.Consumer>
    );
};
