/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

// TODO: replace with lodash.debounce
function debounce(func, wait, immediate) { // source: https://gist.github.com/sagiavinash/5c9084b79f68553c4b7d
    let timeout;
    return function(...args:any[]) {
	var context = this;//, args = arguments;
	var later = function() {
	    timeout = null;
	    if (!immediate) func.apply(context, args);
	};
	var callNow = immediate && !timeout;
	clearTimeout(timeout);
	timeout = setTimeout(later, wait);
	if (callNow) func.apply(context, args);
    };
}

function calcMenuStyles(inputDOMNode) {
    if (!inputDOMNode) return {};
    const inputDOMRect = inputDOMNode.getBoundingClientRect();
    return {
        position: 'absolute',
        zIndex: 1070,
        top: inputDOMNode.offsetHeight + inputDOMRect.y + window.pageYOffset + 'px',
        minWidth: inputDOMNode.offsetWidth + 'px',
        left: inputDOMRect.x + window.pageXOffset + 'px'
    };
}

export {
    debounce,
    calcMenuStyles
};
