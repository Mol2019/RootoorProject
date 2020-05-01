import React from 'react';
import Modal from 'react-responsive-modal';
import './modal.css';
import { FormBuilder } from './../form/form.builder';

/**
 * Modal Builder
 */
export default class ModalBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalData: this.props.modalData ? this.props.modalData : null
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.modalData !== prevProps.modalData){
            this.setState({modalData : this.props.modalData});
        }
    }

    render() {
        const PModalComponent = this.state.modalData.mData.pModalComponent ? this.state.modalData.mData.pModalComponent : null;
        return <Modal open={this.state.modalData.modalInfo.isOpen} onClose={this.state.modalData.modalInfo.closeModal}>
            <div className="modal-dialog" role="document">
                {
                    PModalComponent ?
                        <div className="modal-content">
                            <PModalComponent />
                        </div>
                        :
                        <div className="modal-content">
                            <ModalHeader closeModal={this.state.modalData.modalInfo.hideModal} mTitle={this.state.modalData.mData.titre} />
                            <ModalBody modalData={this.state.modalData.mData} />
                            {
                                this.state.modalData.mData.type === "confirmModal" ?
                                    <ModalFooter dataId={this.state.modalData.mData.dataId} name={this.state.modalData.mData.action} validAction={this.state.modalData.modalInfo.validAction} closeModal={this.state.modalData.modalInfo.hideModal} /> :
                                    null
                            }
                        </div>

                }
            </div>
        </Modal>
    }
}

/**
 * Modal header
 * @param {*} props
 */
export let ModalHeader = props => {
    const mTitle = props.mTitle ? props.mTitle : null;
    return <div className="modal-header">
                <h5 className="modal-title text-light m-auto text-center" id="FormModal">{mTitle}</h5>
            </div>;
}

/**
 * Modal Body
 * @param {*} props
 */
export function ModalBody(props) {
    return <div className="modal-body">
        {
                props.modalData.type === "withForm" ?
                    <BodyWithForm formData={props.modalData.fields ? props.modalData.fields : null} />
                    :
                    <BodyWithText clickClose={props.clickClose} text={props.modalData.textModal ? props.modalData.textModal : null} />
        }
    </div>;
}


/**
 * Modal Body with form
 * @param {*} props
 */
function BodyWithForm(props) {
    if (props.formData) {
        return <FormBuilder formObject={props.formData} />;
    }
    console.error("form data are missing");
    return null;
}

/**
 * Modal with body as text
 * @param {*} props
 */
function BodyWithText(props) {
    const text = props.text ? props.text : null;
    if (text) {
        return <div className="confirmModal">
            <p> {text}</p>
        </div>;
    }
    console.error("text is missing");
    return null;
}

/**
 * Modal Footer
 * @param {*} props
 */
export function ModalFooter(props) {
    return <div className="modal-footer">
        <button type="button" onClick={props.closeModal} className="btn btn-secondary" data-dismiss="modal">Annuler</button>
        <button type="button" id={props.dataId} name={props.name} onClick={props.validAction} className="btn btn-primary">OK</button>
    </div>;
}
