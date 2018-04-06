/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import ReactDOM from 'react-dom';
import React from 'react';
import {shake} from './shake.module.css';

const ANIMATION_DURATION = 350;

/**
 * Add shaking css class and remove one after animation duration
 * Yogiu can pass here React.Component instance by ref or just Dom Element
 * @param {React.ReactInstance} node
 */
export default (node: React.ReactInstance) => {
    const element = ReactDOM.findDOMNode(node);
    element.classList.add(shake);

    setTimeout(
        () => element.classList.remove(shake),
        10000
    );
};
