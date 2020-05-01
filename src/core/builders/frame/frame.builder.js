import React from 'react';
import { FrameHeaderBuilder, DefaultFormBuilderFetch, DefaultListBuilderFetch, DefaultFetchSingleDataBuilder } from './frame.utils.builder';


export default class FrameBuilder extends React.Component{
    constructor(props) {
         super(props);
         this.state =  {
             component: DefaultBuilder,
             action : "",
             frameData: this.props.data
         };
        this.fetchComponent = this.fetchComponent.bind(this);
        this.goodFrameByAction = this.goodFrameByAction.bind(this);
    }

    async fetchComponent(componentF){
        await this.setState({component : componentF});
    }

    /**
     * fetching the good frame
     * @param {*} action
     */
    async goodFrameByAction(action){
        let cmp = null;
        if(action){
            switch (action) {
                case "listDataFetch": cmp = FrameWithListBuilder; break;
                case "singleDataFetch": cmp = SingleDataFrameBuilder; break;
                case "formFetch": cmp = FormFrameBuilder; break;
                default: console.log("type of frame is not available try with personal frame"); return null;
            }
        }
        if(cmp){
           await this.fetchComponent(cmp);
        }
    }

    componentDidUpdate(prevProps){
        if (this.props.data !== prevProps.data){
            this.setState({ frameData: this.props.data});
        }
    }

    async componentDidMount(){
        if (this.props.data.action){
            await this.setState({ action: this.props.data.action });
            await this.goodFrameByAction(this.state.action);
        }
    }

    render(){
        let Component = this.state.component;
        return <Component action={this.state.action} frameData={this.state.frameData}/>
    }
}

/**
 * Default loading component
 */
const DefaultBuilder = () => {return <p></p> }

const FrameWithListBuilder = props => (<FrameDrawing frameInfo={props.frameData} component={DefaultListBuilderFetch} />)


/**
 * Frame with form content
 * @param {*} props
 */
const FormFrameBuilder = props => {
    return <FrameDrawing frameInfo={props.frameData} component={DefaultFormBuilderFetch}/>;
}



const SingleDataFrameBuilder = props => (<FrameDrawing frameInfo={props.frameData} component={DefaultFetchSingleDataBuilder}/>);


/**
 * Default frame drawing
 * @param {*} props
 */
const FrameDrawing = props => {
    if(props.component){
        const Component = props.component;
        return  <div className="container-fluid">
                    <div className={props.frameInfo.action === "formFetch" ? "" : "card mt-2"}>
                        <FrameHeaderBuilder
                                data = {
                                {
                                        name : props.frameInfo.data.name ,
                                        titre: props.frameInfo.action === "formFetch" ?
                                                     props.frameInfo.title : null,
                                        modalChange: props.frameInfo.data.onChangeModalTemplate,
                                        action : props.frameInfo.action,
                                        dataId: props.frameInfo.data.fetchingData.type === "single"
                                                ? props.frameInfo.data.fetchingData.singleton.id : null
                                }
                                }
                        />
                        <div className={props.frameInfo.action === "formFetch" ? "" : "px-2 border-top"}>
                            <div className={props.frameInfo.action === "formFetch" ? "" : "table-wrapper table-responsive"}>
                                <Component infos={props.frameInfo.data} />
                            </div>
                        </div>
                    </div>
                </div>
    }
    console.error('component is missing please check it');
    return null;
}
