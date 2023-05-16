import React, { Component, useState } from 'react';
import { Form, Field } from '@progress/kendo-react-form';
import { FormTextArea, FormDropDownList, FormInput } from './form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";

import { Col, FormGroup } from 'reactstrap';
import nofaServices from '../services/adminServices';

class NofaLineItemPartyType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nofatitle: null,
        };
    };

    componentDidMount() {
        const Title = sessionStorage.getItem('NofaTitle');
        this.setState({ nofatitle: Title })
    }

    render() {
        return (
            <div>
                <PanelBar>
                    <PanelBarItem expanded={true} title={this.state.nofatitle}>

                        <FormGroup row>
                            <Col lg="12">
                                <Field
                                    name={"nofa_line_item_party_type"}
                                    component={FormInput}
                                    label={"Type"}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>

                            <Col lg="12">
                                <Field
                                    name={"nofa_line_item_party_desc"}
                                    type={"textarea"}
                                    component={FormTextArea}
                                    label={"Description"}
                                />
                            </Col>
                        </FormGroup>

                    </PanelBarItem>
                </PanelBar>
            </div>
        )
    }


}

export default NofaLineItemPartyType