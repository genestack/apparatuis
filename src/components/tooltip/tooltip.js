import React from 'react';
import PropTypes from 'prop-types';
import RcTooltip from 'rc-tooltip';
import classNames from 'classnames';
import './tooltip.css';

export default function Tooltip({children, isError, overlayClassName, ...props}) {
    return (
        <RcTooltip
            prefixCls="genestack-ui-tooltip"
            overlayClassName={classNames(overlayClassName, {
                'genestack-ui-tooltip--error': isError
            })}
            {...props}
        >
            {children}
        </RcTooltip>
    );
}

Tooltip.propTypes = {
    children: PropTypes.node.isRequired,
    isError: PropTypes.bool,
    overlayClassName: PropTypes.string
};

Tooltip.defaultProps = {
    isError: false,
    overlayClassName: ''
};
