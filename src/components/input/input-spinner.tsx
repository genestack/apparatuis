/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {Fade} from '../fade';
import {Spinner} from '../spinner';

const SPINNER_SIZE = 16;

/** InputSpinner public properties */
export interface Props extends React.ComponentPropsWithRef<'div'> {
    show?: boolean;
}

/** Fadable spinner that is used in input field when loading */
export const InputSpinner = (props: Props) => {
    const {show, ...rest} = props;
    const [isSpinnerExited, setSpinnerExited] = React.useState(true);

    return show || !isSpinnerExited ? (
        <Fade
            in={show}
            appear
            onEnter={() => {
                setSpinnerExited(false);
            }}
            onExited={() => {
                setSpinnerExited(true);
            }}
        >
            <div {...rest}>
                <Spinner size={SPINNER_SIZE} />
            </div>
        </Fade>
    ) : null;
};
