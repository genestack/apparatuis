import React from 'react';

const toClass = <Props>(baseComponent: React.SFC<Props>) =>
    isClassComponent(baseComponent)
        ?   baseComponent
        :   wrapWithClass(baseComponent);


const wrapWithClass = <Props>(baseComponent: React.SFC<Props>) =>
    class extends React.Component<Props> {
        static propTypes = baseComponent.propTypes;
        static contextTypes = baseComponent.contextTypes;
        static defaultProps = baseComponent.defaultProps;

        render() {
            return typeof baseComponent === 'string'
                ?   React.createElement(baseComponent, this.props)
                :   baseComponent(this.props, this.context);
        }
    };

const isClassComponent = Component =>
    Component &&
    Component.prototype &&
    typeof Component.prototype.render === 'function';


const getDisplayName = Component =>
    typeof Component === 'string'
        ? Component
        : Component.displayName || Component.name || 'Component';


export default toClass;