import BaseView from './../base.view';
import React from 'react';
import { FrameDataClass } from '../../core/class/base.class';
import { ModalClass } from './../../core/class/elements.class';
import { FrameClass } from './../../core/class/base.class';
import LoginComponent from './../../components/login/login.component';

export default class HomeView extends BaseView{
    constructor(props){
        super(props);
    }

    UNSAFE_componentWillMount() {
        const FrameDataObject = new FrameDataClass({
            hasModal: true,
            modalData: new ModalClass({
                mData : {
                    pModalComponent : LoginComponent
                },
                modalInfo : this.props.data.modalInfo
            }),
            onChangeModalTemplate: this.onChangeModalTemplate
        });
        const FrameObject = new FrameClass({
            data: FrameDataObject,
            pFrameComponent : PHomeFrameComponent
        });
        this.initFrame(FrameObject);
    }

}

let PHomeFrameComponent = props => (
    <div className="container">
        <div className="home">
            <div className="home_container">
                <div className="home_container__img">
                    <h3 className="text-center text-white">
                        @{appName}
                    </h3>
                </div>
                <div className="container home_container__content p-5">
                    <button onClick={(e) => { props.data.onChangeModalTemplate(e, LoginComponent) }} name="other-content" className="home_container__button  btn-subscribe">CONNEXION</button>
                </div>
            </div>
        </div>
    </div>
 );


