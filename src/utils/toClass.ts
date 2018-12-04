/*
 * Copyright (c) 2011-2018 Genestack Limited
 * All Rights Reserved
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF GENESTACK LIMITED
 * The copyright notice above does not evidence any
 * actual or intended publication of such source code.
 */

import React, {ComponentType, ComponentClass} from 'react';

/**
 * Convert Functional component to class to get "ref" availability
 * @param baseComponent
 */

const toClass = <P>(baseComponent: React.ComponentType<P>): React.ComponentClass<P> =>
    isClassComponent(baseComponent) ? baseComponent : wrapWithClass(baseComponent);

const wrapWithClass = <P>(baseComponent: React.SFC<P>) =>
    class extends React.Component<P> {
        static displayName = getDisplayName(baseComponent);
        static propTypes = baseComponent.propTypes;
        static contextTypes = baseComponent.contextTypes;
        static defaultProps = baseComponent.defaultProps;

        render() {
            return typeof baseComponent === 'string'
                ? React.createElement(baseComponent, this.props)
                : baseComponent(this.props, this.context);
        }
    };

const isClassComponent = <P>(сomponent: ComponentType<P>): сomponent is ComponentClass<P> =>
    сomponent && сomponent.prototype && typeof сomponent.prototype.render === 'function';

const getDisplayName = (
    component: string | React.ComponentClass<any> | React.StatelessComponent<any>
) =>
    typeof component === 'string'
        ? component
        : (component.displayName && component.displayName + 'Class') ||
          component.name ||
          'Component';

export default toClass;
