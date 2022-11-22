/*
 * Copyright (c) 2011-2022 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as Components from './src';

(global as any).PageContent = Components.PageContent;

for (const name of Object.keys(Components)) {
    (global as any)[name] = (Components as any)[name];
}
