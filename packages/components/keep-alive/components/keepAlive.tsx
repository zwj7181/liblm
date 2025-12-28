import  React from 'react';
import AsyncComponent from './AsyncComponent';
import keepAlive, { COMMAND } from '../utils/keepAliveDecorator';
import changePositionByComment from '../utils/changePositionByComment';
import { IKeepAliveProps, LIFECYCLE, START_MOUNTING_DOM } from '../common';
import { mchcLogger } from '@lm_fe/env';







class KeepAlive extends React.PureComponent<IKeepAliveProps> {
    private bindUnmount: (() => void) | null = null;

    private bindUnactivate: (() => void) | null = null;

    private unmounted = false;

    private mounted = false;

    private ref: null | Element = null;

    private refNextSibling: null | Node = null;

    private childNodes: Node[] = [];

    public componentDidMount() {
        const {
            _container,
        } = this.props;
        console.log('pro', this.props, this.props._container.eventEmitter)
        const {
            notNeedActivate,
            identification,
            eventEmitter,
            keepAlive,
        } = _container;
        notNeedActivate();
        const cb = () => {
            this.mount();
            this.listen();
            eventEmitter.off([identification, START_MOUNTING_DOM], cb);
        };
        eventEmitter.on([identification, START_MOUNTING_DOM], cb);
        if (keepAlive) {
            this.componentDidActivate();
        }
    }

    public componentDidActivate() {
        // tslint-disable
    }

    public componentDidUpdate() {
        const {
            _container,
        } = this.props;
        const {
            notNeedActivate,
            isNeedActivate,
        } = _container;
        if (isNeedActivate()) {
            notNeedActivate();
            this.mount();
            this.listen();
            this.unmounted = false;
            this.componentDidActivate();
        }
    }

    public componentWillUnactivate() {
        this.unmount();
        this.unlisten();
    }

    public componentWillUnmount() {
        if (!this.unmounted) {
            this.unmounted = true;
            this.unmount();
            this.unlisten();
        }
    }

    private mount() {
        const {
            _container: {
                cache,
                identification,
                storeElement,
                setLifecycle,
            },
        } = this.props;
        this.setMounted(true);
        const { renderElement } = cache[identification];
        setLifecycle(LIFECYCLE.UPDATING);
        changePositionByComment(identification, renderElement, storeElement);
    }

    private correctionPosition = () => {
        if (this.ref && this.ref.parentNode && this.ref.nextSibling) {
            const childNodes = this.ref.childNodes as any;
            this.refNextSibling = this.ref.nextSibling;
            this.childNodes = [];
            while (childNodes.length) {
                const child = childNodes[0];
                this.childNodes.push(child);
                try {
                    this.ref.parentNode.insertBefore(child, this.ref.nextSibling);

                } catch (error) {
                    mchcLogger.error('insertBefore', { error, ref: this.ref, child, parent: this.ref.parentNode, nextSibling: this.ref.nextSibling })
                }

            }
            try {
                this.ref.parentNode.removeChild(this.ref);
            } catch (error) {
                mchcLogger.error('removeChild', { error, ref: this.ref, parent: this.ref.parentNode })
            }
        }
    }

    private retreatPosition = () => {
        if (this.ref && this.refNextSibling && this.refNextSibling.parentNode) {
            for (const child of this.childNodes) {
                this.ref.appendChild(child);
            }

            try {
                this.refNextSibling.parentNode.insertBefore(this.ref, this.refNextSibling);


            } catch (error) {
                mchcLogger.error('insertBefore', { error, ref: this.ref, parent: this.refNextSibling.parentNode, nextSibling: this.refNextSibling })
            }
        }
    }

    private unmount() {
        const {
            _container: {
                identification,
                storeElement,
                cache,
                setLifecycle,
            },
        } = this.props;
        if (cache[identification]) {
            const { renderElement, ifStillActivate, reactivate } = cache[identification];
            setLifecycle(LIFECYCLE.UNMOUNTED);
            this.retreatPosition();
            changePositionByComment(identification, storeElement, renderElement);
            if (ifStillActivate) {
                reactivate();
            }
        }
    }

    private listen() {
        const {
            _container: {
                identification,
                eventEmitter,
            },
        } = this.props;
        eventEmitter.on(
            [identification, COMMAND.CURRENT_UNMOUNT],
            this.bindUnmount = this.componentWillUnmount.bind(this),
        );
        eventEmitter.on(
            [identification, COMMAND.CURRENT_UNACTIVATE],
            this.bindUnactivate = this.componentWillUnactivate.bind(this),
        );
    }

    private unlisten() {
        const {
            _container: {
                identification,
                eventEmitter,
            },
        } = this.props;
        eventEmitter.off([identification, COMMAND.CURRENT_UNMOUNT], this.bindUnmount);
        eventEmitter.off([identification, COMMAND.CURRENT_UNACTIVATE], this.bindUnactivate);
    }

    private setMounted = (value: boolean) => {
        this.mounted = value;
    }

    private getMounted = () => {
        return this.mounted;
    }

    public render() {
        // The purpose of this div is to not report an error when moving the DOM,
        // so you need to remove this div later.
        return (
            <div ref={ref => this.ref = ref}>
                <AsyncComponent
                    setMounted={this.setMounted}
                    getMounted={this.getMounted}
                    onUpdate={this.correctionPosition}
                >
                    {this.props.children}
                </AsyncComponent>
            </div>
        );
    }
}

export default keepAlive<IKeepAliveProps>(KeepAlive);
