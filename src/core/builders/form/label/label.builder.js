import React from 'react';
export const LabelBuilder = props => {

    if(props.data){
        return <div className={props.data.type === "hidden" ? "d-none" : null}>
                    <span className="mx-1"><i className={"fa fa-" + props.data.icon}> </i></span>
                    <label htmlFor={props.data.name} className={"text-bold" + props.data.nameClass}>
                        {props.data.titre} :
                    </label>
                    <span className={props.data.displayPhoto ? "dspT" : "d-none"}>
                        <img src={props.data.type === "user-picker" ? "/assets/images/user_avatar.png" : ""}
                            className={"img-thumbnail" + props.data.type === "user-picker" ? "" : "circle-rounded"} alt="" />
                        <p className="mt-1">
                            <button className="btn btn-block btn-danger closePhoto">
                                supprimer <i className="fa fa-trash"></i>
                            </button>
                        </p>
                    </span>
                </div>
    }
    console.error('label can\'t built cause by parameters missing');
}
