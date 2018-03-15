/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './input.css';

export default class Input extends PureComponent {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const {onChange, name} = this.props;
        const {value} = event.currentTarget;

        onChange(event, name ? {[name]: value} : value);
    }

    render() {
        const {value, className, ...props} = this.props;

        return (
            <input
                {...props}
                className={classNames(className, styles.input)}
                value={value}
                onChange={this.handleChange}
            />
        );
    }
}

Input.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    className: PropTypes.string
};

Input.defaultProps = {
    name: null,
    className: ''
};
