import React from 'react';
import ModalBuilder from './../core/builders/modal/modal.builder';
import FrameBuilder from '../core/builders/frame/frame.builder';
import { SidebarBuilder } from './../core/builders/bar/sidebar/sidebar.builder';
import { FrameHeaderModeAndTitle } from './../core/builders/frame/frame.utils.builder';
import { BoxSubMenu } from './../core/builders/bar/menu/menu.builder';


export default class FrameModule extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            frameData: this.props.frameData ? this.props.frameData : null
        }
        //console.log(this.props.frameData)
    }

    componentDidUpdate(prevProps){
        if(this.props.frameData !== prevProps.frameData){
            this.setState({frameData : this.props.frameData});
        }
    }

    render() {
        const PFrameComponent = this.state.frameData.pFrameComponent ? this.state.frameData.pFrameComponent : null;
        return <div className="page-wrapper chiller-theme d-flex toggled">
                    {
                            this.state.frameData.withSideBar  ?
                            <a id="show-sidebar" className="btn btn-sm btn-dark" href="#">
                                <i className="fa fa-bars"></i>
                            </a> : null
                    }
                    {
                        this.state.frameData.withSideBar ? <SidebarBuilder sb={this.state.frameData.sideBarData } /> : null
                    }
                    <main className={this.state.frameData.withSideBar  ? "page-content" : "container pt-3"}>
                            {

                                this.state.frameData.withHeader === true ?
                                    <div className="container py-0">
                                        <FrameHeaderModeAndTitle data={
                                            {
                                                title: this.state.frameData.title,
                                                user: this.state.frameData.info,
                                                actions: this.state.frameData.info
                                            }
                                        } />
                                    </div> : null
                            }
                            {
                                this.state.frameData.withSubMenu === true ?
                                    <div className="container">
                                        <FrameWithSubMenu
                                            otherData ={this.state.frameData.otherData}
                                            subMenuData = {this.state.frameData.subMenuData}
                                            changeSubComponent={this.state.frameData.changeComponent}
                                        />
                                    </div>

                                    :
                                PFrameComponent ?
                                    <div className="container">
                                        <PFrameComponent data={this.state.frameData.data} />
                                    </div>
                                    :
                                    <FrameBuilder
                                        data={this.state.frameData} />
                            }

                    </main>
                    {
                        this.state.frameData.data ?
                            this.state.frameData.data.hasModal === true?
                                <ModalBuilder modalData={this.state.frameData.data.modalData} />: null
                            : null
                    }
        </div>;
    }
}

class FrameWithSubMenu extends React.Component{
    render(){
        const Component = this.props.otherData.component ? this.props.otherData.component : null;
        return  <div>
                    <BoxSubMenu subData={this.props.subMenuData}
                                changeSubComponent={this.props.changeSubComponent}/>
                    <Component {...this.props}/>
                </div>
                ;
    }
}

