/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {MarginBoxProps, MarginBox} from '../margin-box';

/** PageContent public properties */
export type Props = MarginBoxProps;

/**
 * Shortcut to MarginBox for adding common paddings to the main page container
 */
export const PageContent = (props: Props) => <MarginBox data-qa="page-content" {...props} />;
