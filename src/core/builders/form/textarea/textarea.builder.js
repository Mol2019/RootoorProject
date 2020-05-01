import React from 'react';
import { ErrorsDisplay } from './../input/inputs.builder';
import { LabelBuilder } from './../label/label.builder';

export default function TextareaBuilder(props) {
    const textObject = props.textObject;
    const data = props.data ? props.data : null;
    const errors = props.errors ? props.errors : null;
    if (textObject) {
        if(data){
            if (data[textObject.name]) {
                textObject.value = data[textObject.name];
            } else {
                textObject.value = "";
            }
        }
        if(errors){
            if (errors[textObject.name]) {
                textObject.errors = errors[textObject.name]
            }
        }
        return (
            <div className="form-group my-3 p-3" key={textObject.key}>
                <LabelBuilder data={
                    {
                        icon: textObject.icon,
                        type: textObject.type,
                        name: textObject.name,
                        nameClass: textObject.nameClass,
                        titre: textObject.titre
                    }
                } />
                <textarea defaultValue={textObject.value} id={textObject.name}
                    name={textObject.name} className="form-control"
                    cols="20" rows="5"
                    onChange={textObject.handleChange}
                >

                </textarea>

                <ErrorsDisplay errors={textObject.errors}/>
            </div>
        )
    }
    return null;
}
