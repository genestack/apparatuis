/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {ClearIcon} from '../../icons/clear-icon';
import {Button, ButtonProps} from '../button';
import {Fade} from '../fade';

type TargetProps = ButtonProps & React.ComponentPropsWithoutRef<'button'>;

/** InputClearButton public properties */
export interface Props extends TargetProps {
    show?: boolean;
}

/** Fadable button with clear icon that is used in input field */
export const InputClearButton = React.forwardRef<HTMLButtonElement, Props>(
    function InputClearButton(props, ref) {
        const {show, ...rest} = props;

        const [isClearButtonExited, setClearButtonExited] = React.useState(true);

        return show || !isClearButtonExited ? (
            <Fade
                in={show}
                appear
                onEnter={() => {
                    setClearButtonExited(false);
                }}
                onExited={() => {
                    setClearButtonExited(true);
                }}
            >
                <Button
                    data-qa="input-clear-button"
                    size="tiny"
                    ghost
                    component="button"
                    rounded
                    iconStart={<ClearIcon />}
                    inverted={false}
                    {...rest}
                    ref={ref}
                />
            </Fade>
        ) : null;
    }
);
