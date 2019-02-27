/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
const {configure} = require('enzyme');
const ReactSixteenAdapter = require('enzyme-adapter-react-16');

configure({adapter: new ReactSixteenAdapter()});
