/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import {wrapPureComponent} from '../../utils/wrap-pure-component';
import {List, ListProps} from '../list';

/** SubMenu public properties */
export type Props = ListProps;

/** Shortcut to List */
export const SubMenu = wrapPureComponent(List);
