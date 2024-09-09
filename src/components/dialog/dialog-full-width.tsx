/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {MarginBoxFullWidth} from '../margin-box';

/** DialogFullWidth public properties */
export type Props = React.HTMLAttributes<HTMLDivElement>;

/**
 * Use this element to remove side paddings from Dialog elements.
 * It add negative margins to compensate dialog side paddings.
 */
export const DialogFullWidth = React.forwardRef<HTMLElement, Props>(function DialogFullWidth(
    props,
    ref
) {
    return <MarginBoxFullWidth {...props} ref={ref} />;
});
