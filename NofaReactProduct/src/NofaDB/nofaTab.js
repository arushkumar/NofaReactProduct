import React, { Component, useState } from 'react';
import { Form, Field } from '@progress/kendo-react-form';
import { FormTextArea, FormDropDownList, FormInput } from './form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";

import { Col, FormGroup } from 'reactstrap';
import nofaServices from '../services/adminServices';

class NofaTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nofatitle:null,
        };

    };
   componentDidMount(){
    const Title = sessionStorage.getItem('NofaTitle');
          
    this.setState({nofatitle:Title })
    console.log("show title",Title)

   }

    // Handle the input change

    render() {
        return (

            <div>
                <PanelBar>
                    <PanelBarItem expanded={true} title={this.state.nofatitle}>
                       
                        <FormGroup row>
                            <Col lg="12">
                                <Field
                                    name={"tab_name"}
                                    component={FormInput}
                                    label={"Tab Name"}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>

                            <Col lg="12">
                                <Field
                                    name={"tab_seq"}
                                    // type={"textarea"}
                                    component={FormInput}
                                    label={"Tab Sequence"}

                                />
                            </Col>
                        </FormGroup>

                    </PanelBarItem>
                </PanelBar>



            </div>
        )
    }


}

export default NofaTab