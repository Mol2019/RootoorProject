import React from 'react';
import { LabelBuilder } from './../label/label.builder';
import { ErrorsDisplay } from './../input/inputs.builder';

export default function SelectsBuilder(props) {
    const selects = props.selects;
    const data = props.data ? props.data : null;
    const errors = props.errors ? props.errors : null;
    if (selects) {
        return selects.map(
            item => {
                if (data) {
                    data[item.name] ? item.value = data[item.name] : null;
                } else {
                    item.value = "";
                }
                if (errors) {
                    errors[item.name] ? item.errors = errors[item.name] : null;
                } else {
                    item.errors = null;
                }
                return <SelectBuilder key={item.key} selectObject={item} />
            }
        );
    }
    return null;
}


export function SelectBuilder(props) {
    const selObject = props.selectObject;
    return (
        <div className="form-group my-3">
            <LabelBuilder data={
                {
                    icon: selObject.icon,
                    type: selObject.type,
                    name: selObject.name,
                    nameClass: selObject.nameClass,
                    titre: selObject.titre
                }
            } />
            <select defaultValue={selObject.value} className="form-control custom-select" onChange={selObject.handleChange} name={selObject.name} id={selObject.name + "select"}>
                <AddOptionsSelect options={selObject.optionsData} />
            </select>
            <ErrorsDisplay errors={selObject.errors} />
        </div>
    );
}

export function AddOptionsSelect(props) {
    const options = props.options;

    return options.map(
        item => {
            return <OptionsBuilder key={item.key} opt={item} />
        }
    );

}

export function OptionsBuilder(props) {
    const opt = props.opt;
    return (
        <option value={opt.value}>{opt.text}</option>
    );
}
