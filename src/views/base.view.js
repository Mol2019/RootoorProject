import React  from 'react';
import FrameModule from './../modules/frame.module';
import { ModalClass, SelectClass } from './../core/class/elements.class';


export default class BaseView extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            baseForm : null,
            localData : null,
            formD : null,
        }
        this.initTableData = this.initTableData.bind(this);
        this.initCardData = this.initCardData.bind(this);
        this.initFrame = this.initFrame.bind(this);
        this.initFrameData = this.initFrameData.bind(this);
        this.initModal = this.initModal.bind(this);
        this.initModalData = this.initModalData.bind(this);
        this.openModal = this.openModal.bind(this);
        this.updateModal = this.updateModal.bind(this);
        this.onChangeModalTemplate = this.onChangeModalTemplate.bind(this);
        this.initForm = this.initForm.bind(this);
        this.initFormData = this.initFormData.bind(this);
        this.initSide = this.initSide.bind(this);
        this.initSidebar = this.initSidebar.bind(this);
        this.initFrameInfo = this.initFrameInfo.bind(this);
        this.initInfo = this.initInfo.bind(this);
        this.reloadFrameObject = this.reloadFrameObject.bind(this);
        this.updateFrameData = this.updateFrameData.bind(this);
        this.initData = this.initData.bind(this);
        this.initSingleData = this.initSingleData.bind(this);
        this.initArrayData = this.initArrayData.bind(this);
        this.changeComponent = this.changeComponent.bind(this);
    }

    async changeComponent(e,cmp){
        e.preventDefault();
        this.setState(
            () => ({
                frameInfo : {
                    ...this.state.frameInfo,
                    otherData : {
                        ...this.state.frameInfo.otherData,
                        component : cmp
                    }
                }
            })
        )
    }

    /**
     * update any value of frame data
     * @param {*} name
     * @param {*} value
     */
    async updateFrameData(name,value){
        this.setState(
            prevState => ({
                frameInfo : {
                    ...prevState.frameInfo,
                    data : {
                        ...prevState.frameInfo.data,
                        [name] : value,
                    }
                }
            })
        )
    }


    /**
     * init the frame
     * @param {*} frame
     */
    async initFrame(frame){
        if(frame){
            await this.setState({frameInfo : frame});
            if (frame.data) {
                await this.initFrameData(frame.data);
            }
            if(frame.info){
                this.initInfo();
                this.initFrameInfo(frame.info)
            }
            if (frame.sideBarData){
                this.initSidebar();
                await this.initSide(frame.sideBarData);
            }
        }
    }

    /**
     * init info
     * @param {*} info
     */
    async initFrameInfo(info){
        if(info){
            await this.setState(
                    () => ({
                        frameInfo: {
                            ...this.state.frameInfo,
                            info: info
                        }
                    })
                );
        }
    }

    /**
     * load info
     */
    async initInfo(){
        setTimeout(()=>{
            this.initFrameInfo(this.props.data.frameAction)
        },1)
    }

    /**
     * init the frame data
     * @param {*} frameData
     */
    async initFrameData(frameData){
        if(frameData){
            await this.setState(
                () => ({
                    frameInfo: {
                        ...this.state.frameInfo,
                        data: frameData
                    }
                })
            );
            if(frameData.FormData){
                await this.initForm(frameData.FormData);
            }
            if(frameData.hasModal){
                if (frameData.modalData){
                    await this.initModal(frameData.modalData);
                }
            }
        }
    }


    /**
     * init frame modal
     * @param {*} name
     * @param {*} state
     */
    initModalData(name, state) {
        this.setState(
            () => ({
                frameInfo: {
                    ...this.state.frameInfo,
                    data: {
                        ...this.state.frameInfo.data,
                        modalData: {
                            ...this.state.frameInfo.data.modalData,
                            [name]: state
                        }
                    }
                }
            })
        );
    }

    /**
     * change the modal data for fetch it
     * @param {*} e
     * @param {*} dataF
     */
    async onChangeModalTemplate(e, dataF) {
        e.preventDefault();
        const fields = this.state.formD ? this.state.formD : null;
        let modal = {
            name: this.state.frameInfo.data.name,
            fields : fields
        };
        switch (e.target.name) {
            case "nouveau":
                        if (!this.state.baseForm.mData.fields.pFormComponent) {
                            modal.data = null;
                            modal.fields = this.state.formD;
                            if (modal.fields.data)
                            modal.fields.data = null;
                            modal.fields.action = "add";

                            modal.action = 'add';
                            modal.fields.formMessage.errors = null;
                            modal.fields.formMessage.success = "";
                        } else {

                        }
                        this.updateModal(modal);
                        this.openModal(e);
                        break;
            case "supprimer":
                              modal.action = "delete";
                              modal.dataId= e.currentTarget.id;
                              this.updateModal(modal);
                              this.openModal(e);
                        break;
            case "verrouiller":
                              modal.action = "lock";
                              modal.dataId = e.currentTarget.id;
                              this.updateModal(modal);
                              this.openModal(e);
                        break;
            case "deverrouiller":
                            modal.action = "unlock";
                            modal.dataId= e.currentTarget.id;
                            this.updateModal(modal);
                            this.openModal(e);
                            break;
            case "modifier":
                            let data = null;
                            if (this.state.frameInfo.data.fetchingData.type === "list") {
                                data = this.state.localData.find(element => element['id'] == e.currentTarget.id);
                            } else {
                                data = this.state.localData;
                            }

                            let updateForm = modal.fields;
                                updateForm.action = 'edit';
                                updateForm.data = data;
                                updateForm.formMessage.errors = null;
                                updateForm.formMessage.success = "";

                                modal.action = "edit";
                                modal.fields = updateForm;
                                modal.data = data;
                                await this.updateModal(modal);
                                this.openModal(e);
                            break;
            case "other-content":
                            if (dataF) {
                                const modalP = {
                                    pModalComponent: dataF
                                };
                                this.updateModal(modalP);
                                this.openModal(e);
                            } else {
                                console.log("aucune donnée fournie");
                            }
                            break;
            default: console.error('action not available'); break;
        }
    }



    /**
     * Open the modal
     * @param {*} e
     */
    async openModal(e) {
        this.state.frameInfo.data.modalData.modalInfo.openModal(e);
    }

    /**
     * update the modal data
     * @param {*} modal
     */
    async updateModal(modal) {
        if(modal){
            await this.setState(
                    prevState => ({
                        frameInfo: {
                            ...prevState.frameInfo,
                            data: {
                                ...prevState.frameInfo.data,
                                modalData: new ModalClass({
                                    modalInfo: this.props.data.modalInfo,
                                    mData: modal
                                })
                            }
                        }
                    })
            );
        }
    }

    /**
     * init the modal
     * @param {*} modal
     */
    async initModal(modal){
        await this.updateModal(modal.mData);
        await this.initModalData("modalInfo",modal.modalInfo);
    }

    /**
     * updating of component
     * @param {*} prevProps
     */
    async componentDidUpdate(prevProps){
        if(this.props !== prevProps){
            if(this.state.frameInfo.data){
                if (this.state.frameInfo.data.modalData)
                if (this.props.data.modalInfo !== prevProps.data.modalInfo)
                    this.initModalData("modalInfo", this.props.data.modalInfo);
            }

            if (this.props.data.others !== prevProps.data.others){
                if(this.state.frameInfo.pFrameComponent){
                    this.setState(
                        () => ({
                            frameInfo : {
                                ...this.state.frameInfo,
                                data : {
                                    ...this.state.frameInfo.data,
                                    data : {
                                        ...this.state.frameInfo.data.data,
                                        others: this.props.data.others
                                    }
                                }
                            }
                        })
                    )
                }
            }

            if (this.props.data.formMessage !== prevProps.data.formMessage){
                await this.initFormData("formMessage",this.props.data.formMessage);
                if (this.state.frameInfo.pFrameComponent && this.state.frameInfo.data){
                    if (this.state.frameInfo.data.data.formMessage)
                    await this.setState(
                        prevState => ({
                            frameInfo : {
                                ...prevState.frameInfo,
                                data : {
                                    ...prevState.frameInfo.data,
                                    data : {
                                        ...prevState.frameInfo.data.data,
                                        formMessage: this.props.data.formMessage
                                    }
                                }
                            }
                        })
                    )
                }
                if (this.state.frameInfo.data.modalData) {
                    this.setState(
                        prevState => ({
                            frameInfo: {
                                ...prevState.frameInfo,
                                data: {
                                    ...prevState.frameInfo.data,
                                    modalData: {
                                        ...this.state.frameInfo.data.modalData,
                                        mData: {
                                            ...prevState.frameInfo.data.modalData.mData,
                                            fields: prevState.frameInfo.data.FormData
                                        }
                                    }
                                }
                            }
                        })
                    );
                }
            }
            if (this.props.data.frameAction !== prevProps.data.frameAction){
                this.initSide(this.props.data.frameAction.info.sidebar);
                if (this.props.data.frameAction.info !== prevProps.data.frameAction.info){
                    this.initInfo(this.props.data.frameAction.info);
                }
            }
            if (this.props.data.donnees !== prevProps.data.donnees){
                await this.initData(this.props.data.donnees);
            }

            if (this.props.data.options !== prevProps.data.options){
                if(this.state.frameInfo.data.FormData.fields.selects){
                    let slts = this.state.frameInfo.data.FormData.fields.selects;
                    slts.map(
                        item => {
                            item.optionsData = this.props.data.options[item.name]
                        }
                    );

                    if(this.state.frameInfo.data.hasModal){
                        this.setState(
                            () => ({
                                frameInfo : {
                                    ...this.state.frameInfo,
                                    data: {
                                        ...this.state.frameInfo.data,
                                        modalData : {
                                            ...this.state.frameInfo.data.modalData,
                                            mData: {
                                                ...this.state.frameInfo.data.modalData.mData,
                                                fields: {
                                                    fields: {
                                                        ...this.state.frameInfo.data.fields,
                                                        selects: slts
                                                    }
                                                }

                                            }
                                        },
                                                                            }
                                }
                            })
                        );
                    }else{
                        this.setState(
                            () => ({
                                frameInfo: {
                                    ...this.state.frameInfo,
                                    data: {
                                        ...this.state.frameInfo.data,
                                        FormData: {
                                            fields: {
                                                ...this.state.frameInfo.data.fields,
                                                selects: slts
                                            }
                                        }
                                    }
                                }
                            })
                        );
                    }
                }

            }
        }
    }

    /**
     * init form of frame with it fields
     * @param {*} form
     */
    async initForm(form){
        await this.setState(
                prevState => ({
                    frameInfo : {
                        ...prevState.frameInfo,
                        data : {
                            ...prevState.frameInfo.data,
                            FormData : form,
                        }
                    }
                })
        );
    }
    /**
     * init form data
     * @param {*} name
     * @param {*} data
     */
    async initFormData(name,data){
        await this.setState(
            prevState => ({
                frameInfo: {
                    ...prevState.frameInfo,
                    data: {
                        ...prevState.frameInfo.data,
                        FormData : {
                            ...prevState.frameInfo.data.FormData,
                            [name]: data
                        }
                    }
                }
            })
        );
    }

    /**
     * load sidebar
     */
    initSidebar(){
        setTimeout(() => {
            this.initSide(this.props.data.frameAction.info.sidebar)
        }, 1);
    }

    /**
     * init the side bar
     * @param {*} side
     */
    async initSide(side){
        await this.setState(
            prevState => ({
                frameInfo : {
                    ...prevState.frameInfo,
                    sideBarData : side
                }
            })
        );
    }
    /**
     * Reload frame object
     * @param {*} name
     * @param {*} value
     */
    async reloadFrameObject(name,value){
        await this.setState(
            prevState => ({
                frameInfo  : {
                    ...prevState.frameInfo,
                    [name] : value
                }
            })
        )
    }

    /**
     * init the data
     * @param {*} iData
     */
    async initData(iData){
        if (this.state.frameInfo.data.fetchingData){
            if (this.state.frameInfo.data.fetchingData.type === "list") {
                if (!this.state.frameInfo.data.fetchingData.pListFrameComponent) {
                    if (this.state.frameInfo.data.fetchingData.listData.typeList === "card") {
                        this.initCardData(iData);
                    }
                    if (this.state.frameInfo.data.fetchingData.listData.typeList === "table") {
                        this.initTableData(iData);
                    }
                } else {
                    this.initArrayData(iData);
                }
            }
            if (this.state.frameInfo.data.fetchingData.type === "single") {
                this.initSingleData(iData);
            }
        }

        if (this.state.frameInfo.pFrameComponent){
            await this.setState(
                () => ({
                    frameInfo : {
                        ...this.state.frameInfo,
                        data : {
                            ...this.state.frameInfo.data,
                            data : {
                                ...this.state.frameInfo.data.data,
                                donnees: iData
                            }
                        }
                    }
                })
            )
        }
        await this.setState({localData : iData});
    }

    /**
     * init card data
     * @param {*} iData
     */
    initCardData(iData){
        let data = this.state.frameInfo.data.fetchingData.listData.cardsInformation;
        data.cardData = iData;
    }

    /**
     * init table data
     * @param {*} iData
     */
    initTableData(iData){
        let data = this.state.frameInfo.data.fetchingData.listData.tableInformation;
        data.tds = iData;
    }

    initArrayData(iData){
        const data = this.state.frameInfo.data.fetchingData.arrayData;
        data.tableData = iData;
    }

    initSingleData(iData){
        this.setState(
            () => ({
                frameInfo : {
                    ...this.state.frameInfo,
                    data : {
                        ...this.state.frameInfo.data,
                        fetchingData : {
                            ...this.state.frameInfo.data.fetchingData,
                            singleton: iData
                        }
                    }
                }
            })
        );
    }

    render() {
         return <FrameModule frameData={this.state.frameInfo} />
    }
}
