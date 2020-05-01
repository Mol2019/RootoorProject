import React from 'react';
import "./input.css";
import { LabelBuilder } from './../label/label.builder';

/**
 * Inputs builder
 */
export default function InputsBuilder(props) {
    const inputs = props.inputs ? props.inputs : null;
    const data = props.data ? props.data : null;
    const errors = props.errors ? props.errors : null;
    if (inputs) {
        return <div>
                    {
                        inputs.map(
                            item => {
                                if (data) {
                                    data[item.name] ? item.value = data[item.name] : null
                                } else {
                                    item.value = "";
                                }
                                if(item.defValue){
                                    item.value = item.defValue;
                                }
                                if (errors) {
                                    errors[item.name] ? item.errors = errors[item.name] : null;
                                } else {
                                    item.errors = null;
                                }
                                return <InputBuilder key={item.key} input={item} />
                            }
                        )
                    }
               </div>
    }
    return null;
}

/**
 * input builder
 */
export function InputBuilder(props){
    if(props.input){
        //console.log(props.input.type === "user-pic" || "photo" || "doc")
        if (props.input.type ===  "user-pic"){
            return <FileInputBuilder input={props.input} />;
        }
        switch(props.input.type){
           case "radio" : return <RadiosBuilder input={props.input}/>;
           //case
           case "checkbox": return <CheckBuilder input={props.input} /> ;
           default: return <DefaultInputBuilder input={props.input}/>;
       }
    }
    console.error("input parameters are missing");
    return null;
}

export let ErrorsDisplay = props => {
    if(props.errors){
        return <span className={props.type === "hidden" ? "d-none" : "text-danger"}>
                    {props.errors}
                </span>
    }
    return null;
}

/**
 * Input:File builder
 * @param {*} props
 */
export let FileInputBuilder = props => {
    if(props.input){
        return <div className={"form-group my-3 p-3 " + props.input.isInLine ? "col-" + props.colSize : ""}>
                    <LabelBuilder data={
                        {
                            icon: props.input.icon,
                            type: props.input.type,
                            name: props.input.name,
                            nameClass: props.input.nameClass,
                            titre : props.input.titre
                        }
                    } />
                    <input type="file"
                        id={props.input.name} name={props.input.name}
                        className={"form-control d-none"}
                        ref = {props.input.handleFile}
                        onChange={props.input.handleChange}
                        defaultValue={props.input.value}
                        accept={props.input.type === ("photo" || "user-picker") ? "image/*" : "*"}
                    />
                    <ErrorsDisplay errors={props.input.errors} />
                </div>
    }
    console.error('file input can\'t build');
    return null;
}

/**
 * Input:Checkbox builder
 * @param {*} props
 */
export let CheckBuilder = props => {
    if(props.input){
        return <div className={props.input.isInLine ? "form-check-inline" : " " + "form-check my-3 p-4"}>
                    <input className="form-check-input" onChange={props.input.handleChange}
                        type="checkbox" id={props.input.name}
                        defaultValue={props.input.value}
                    />
                    <label className="form-check-label" htmlFor={props.input.name}>{props.input.titre}</label>
                    <ErrorsDisplay errors={props.input.errors}/>
                </div>
    }
    console.error("parameters are missing for build checkbox");
    return null;
}

/**
 * Input:radios  many builder
 * @param {*} props
 */
const RadiosBuilder = props => {
    if(props.input){
        props.input.map(
            item => (
                <RadioBuilder key={generateKey()} radio={item}/>
            )
        );
    }
    console.error("radios can't be build cause of missed parameter");
    return null;
}

/**
 * Input:radio one builder
 * @param {*} props
 */
export let RadioBuilder = props => {
    if (props.input) {
        return <div className={props.input.isInLine ? "form-check-inline" : " " + " form-check my-3 p-3 "}>
                    <input class="form-check-input"
                        onChange={props.input.handleChange}
                        defaultChecked={props.input.isChecked}
                        type="radio" id={props.input.name}
                        defaultValue={props.input.value} />
                    <label class="form-check-label" htmlFor={props.input.name}>{props.input.titre}</label>
                    <ErrorsDisplay errors={props.input.errors} />
                </div>
    }
    console.error("can't built radio cause parameter missing");
    return null;
}

export function DefaultInputBuilder(props){
    if(props.input){
        return <div className={props.input.isInLine ? "col-" + props.colSize : " " +" form-group my-3 p-3 "}>
                    <LabelBuilder data={
                        {
                            icon: props.input.icon,
                            type: props.input.type,
                            name: props.input.name,
                            nameClass: props.input.nameClass,
                            titre : props.input.titre
                        }
                    }/>
                    <input type={props.input.type}
                        id={props.input.type === "password" ? "password " : "" + props.input.name}
                        name={props.input.name}
                        className={
                            props.input.type === "password" ?
                            "form-control inputShowPwd" :
                            "form-control"
                        }
                        onChange={props.input.handleChange}
                        defaultValue={props.input.value}
                    />
                    <ErrorsDisplay type={props.input.type} errors={props.input.errors}/>
                </div>
    }
    console.error('can\'t build input file')
}
