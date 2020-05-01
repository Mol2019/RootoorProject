import React from 'react';
import InputsBuilder from './input/inputs.builder';
import SelectsBuilder, { SelectBuilder } from './select/selects.builder';
import TextareaBuilder from './textarea/textarea.builder';
import FlashMessage from 'react-flash-message';
import './form.css';


export class FormBuilder extends React.Component{
    constructor(props){
        super(props);
    }

    render() {
        const PFormComponent = this.props.pFormComponent ? this.props.pFormComponent : null;
        return <form onSubmit={this.props.formObject.formSubmit}>
                    {
                            PFormComponent ?
                            <PFormComponent data={this.props.formObject} /> :
                            <DefaultFormBuilder data={this.props.formObject} />
                    }
                </form>;
    }
}



let DefaultFormBuilder = props => {
    if(props.data){
        let btnText = "";
        switch(props.data.action){
            case "add": btnText = "Ajouter"; break;
            case "edit": btnText = "Modifier"; break;
            default: btnText = props.data.btnText; break;
        }
        return <div className="form-epm">
                    {
                        props.data.formMessage.success ?
                            <FlashMessage className="bg-light mt-3 mb-3" duration={5000}>
                                <strong className="text-success text-italic">{props.data.formMessage.success}</strong>
                            </FlashMessage>
                            :
                            null
                    }
                    {
                        props.data.data ? <input type="hidden" defaultValue={props.data.data.id} name="id" />
                            : null
                    }
                    <SelectsBuilder colSize={props.hasColRow ? props.colSize : "12"}
                        errors={props.data.formMessage.errors}
                        data={props.data.data ? props.data.data : null}
                        selects={props.data.fields.selects}
                    />
                    <InputsBuilder colSize={props.hasColRow ? props.colSize : "12"}
                                    errors={props.data.formMessage.errors}
                                    data={props.data.data ? props.data.data : null}
                                    inputs={props.data.fields.inputs}
                    />
                    <TextareaBuilder errors={props.data.formMessage.errors}
                              data={props.data.data ? props.data.data : null}
                              textObject={props.data.fields.textarea} />
                    <div className="form-group col-12">
                        <button type="submit" className="btn btn-block btn-primary">
                            {btnText}
                        </button>
                    </div>
               </div>
    }
    console.error('form parameters are missing');
    return null;
}
