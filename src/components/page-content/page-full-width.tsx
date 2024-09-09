/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {MarginBoxFullWidth, MarginBoxFullWidthProps} from '../margin-box';

/** PageFullWidth public properties */
export type Props = MarginBoxFullWidthProps;

/**
 * Remove paddings from page content. Is used for Lists and Dividers in common.
 */
export const PageFullWidth = React.forwardRef<HTMLElement, Props>(function PageFullWidth(
    props,
    ref
) {
    return <MarginBoxFullWidth {...props} ref={ref} />;
});
