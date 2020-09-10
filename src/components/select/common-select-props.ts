/*
 * Copyright (c) 2011-2020 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {Props as EmitterProps} from './emitter';

/** Common props for all select types (native or menu based) */
export interface CommonSelectProps extends EmitterProps {
    /** Select value */
    value?: string | number;
    /** Sets `invalid` styles for select */
    invalid?: boolean;
}
