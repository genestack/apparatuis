/*
 * Copyright (c) 2011-2019 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */
import * as React from 'react';

import {ListItem} from '../../src';

import {PresentationContext} from './presentation-context';

interface Props {
    name: string;
    label: string;
    value?: unknown;
}

/** Renders ListList with input control to change certain state value */
export function PresentationState(props: Props) {
    const {name, label, value} = props;
    const [state, setState] = React.useContext(PresentationContext);

    const type = value === undefined ? 'checkbox' : 'radio';

    const checked = type === 'checkbox' ? !!state[name] : state[name] === value;

    const handleChange = () => {
        if (type === 'checkbox') {
            setState({...state, [name]: !state[name]});
        } else {
            setState({...state, [name]: value});
        }
    };

    return (
        <ListItem
            as="label"
            interactive
            prepend={<input type={type} name={name} checked={checked} onChange={handleChange} />}
        >
            {label}
        </ListItem>
    );
}
