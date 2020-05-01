import BaseView from './../base.view';
import { FrameClass, FetchingDataClass, FrameDataClass, FetchingListClass } from './../../core/class/base.class';
import { SelectClass, FormClass, TableClass } from '../../core/class/elements.class';
import { ModalClass } from './../../core/class/elements.class';
import { AssignFormComponent } from '../../components/app/pages/contact/already-assign-contact.component';

export class AlreadyAssignContactView extends BaseView{
    UNSAFE_componentWillMount(){

        const Fields = {
            selects : [
                new SelectClass({
                        optionsData: [],
                        name: "compte",
                        icon: "users",
                        value: null,
                        errors: [],
                        handleChange: this.props.data.formAction.handleField
                    }),
                    new SelectClass({
                        optionsData: [],
                        name: "contact",
                        icon: "phone-alt",
                        value: null,
                        errors: [],
                        handleChange: this.props.data.formAction.handleField
                    })
            ]
        }

        const FormDataObject = new FormClass({
            formSubmit: this.props.data.formAction.submitForm,
            pFormComponent : null,//AssignFormComponent,
            fields : Fields,
            action: "assignation",
            formMessage: this.props.data.formMessage,
            btnText : "Assigner"
            //handleFields: this.props.data.formAction.handleField
        });
        this.state.formD = FormDataObject;

        const tableData = new TableClass({
            pTableDataComponent: null,
            ths: ["id","contact", "compte"],
            tds: this.props.data.donnees
        });

        const goodListFetcher = new FetchingListClass({
            typeList: "table",
            tableInformation: tableData
        });

        const ListData = new FetchingDataClass({
            type: "list",
            listData : goodListFetcher,
            pListFrameComponent: null,
        })


        const FrameDataObject = new FrameDataClass({
            name: 'contacts assigné',
            FormData: FormDataObject,
            hasModal: true,
            formInModal: true,
            fetchingData: ListData,
            modalData: new ModalClass({
                modalInfo: this.props.data.modalInfo,
                mData: { name: "contact à assigner",type:"withForm",action: 'def',titre:"Assignation de contact à un compte"}
            }),
            onChangeModalTemplate: this.onChangeModalTemplate
        });
        this.state.baseForm = FrameDataObject.modalData;

        const FrameObject = new FrameClass({
            data: FrameDataObject,
            action: "listDataFetch",
            title: "Gestion des contacts",
        });

        this.initFrame(FrameObject);
    }

    /**
     * change the modal data for fetch it
     * @param {*} e
     * @param {*} dataF
     */
    async onChangeModalTemplate(e, dataF) {
        e.preventDefault();
        const fields = this.state.baseForm.mData.fields ? this.state.baseForm.mData.fields : null;
        let modal = {
            name: this.state.frameInfo.data.name,
            fields: fields
        };
        if (!dataF) {

            //modal = this.state.baseForm.mData ? this.state.baseForm.mData : null;

        }
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
                modal.dataId = e.currentTarget.id;
                this.updateModal(modal);
                this.openModal(e);
                break;
             case "modifier":
                let data = null;
                if (this.state.frameInfo.data.fetchingData.type === "list") {
                    data = this.state.localData.find(element => element['id'] == e.currentTarget.id);
                }

                let updateForm = modal.fields;
                updateForm.action = 'edit';

                let dataG = {
                    id : data.id,
                    compte: data.compte_id,
                    contact: data.contact_id
                };


                updateForm.data = dataG;

                updateForm.formMessage.errors = null;
                updateForm.formMessage.success = "";

                modal.action = "edit";
                modal.fields = updateForm;
                modal.data = dataG;

                await this.updateModal(modal);
                this.openModal(e);
                break;

            default: console.error('action not available'); break;
        }
    }

}

