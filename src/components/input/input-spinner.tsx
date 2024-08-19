/*
 * Copyright (c) 2011-2023 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {DataAttributes} from '../../utils/slot-props';
import {Fade} from '../fade';
import {Spinner} from '../spinner';

const SPINNER_SIZE = 16;

/** InputSpinner public properties */
export interface Props extends React.ComponentPropsWithRef<'div'>, DataAttributes {
    show?: boolean;
}

/** Fadable spinner that is used in input field when loading */
export const InputSpinner = React.forwardRef<HTMLDivElement, Props>(function InputSpinner(
    props,
    ref
) {
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
            <div data-qa="input-spinner" {...rest} ref={ref}>
                <Spinner size={SPINNER_SIZE} />
            </div>
        </Fade>
    ) : null;
});
