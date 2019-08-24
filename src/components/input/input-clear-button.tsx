/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {ClearIcon} from '../../icons/clear-icon';
import {ButtonProps, Button} from '../button';
import {Fade} from '../fade';

/** InputClearButton public properties */
export interface Props extends ButtonProps {
    show?: boolean;
}

/** Fadable button with clear icon that is used in input field */
export const InputClearButton = (props: Props) => {
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
            <Button tiny variant="ghost" icon={<ClearIcon />} inverted={false} {...rest} />
        </Fade>
    ) : null;
};
