import React, { Component, useState } from 'react';
import { Form, Field } from '@progress/kendo-react-form';
import { FormTextArea, FormDropDownList, FormInput } from './form-components';
import { PanelBar, PanelBarItem } from "@progress/kendo-react-layout";

import { Col, FormGroup } from 'reactstrap';
import nofaServices from '../services/adminServices';

class NofaQues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nofaquestiontype: [],
      nofaQuestion: [],
      // nofaQues:[],
      nofatitle:null,

    };
  };
 

  onChange = (event) => {  
    this.setState({ data_value: event.target.value })
    const value = {
      data_value: event.target.value
    }
   
  }


  componentDidMount() {
    const Title = sessionStorage.getItem('NofaTitle');          
    this.setState({nofatitle:Title })

    console.log("show title",Title)

    nofaServices.getQuestionType().then(
      response => {
        // window.scrollTo(0, 0)
        var nofaQuestype = response.data.data;
        console.log("nofa")

        this.setState({ nofaquestiontype: nofaQuestype })
        console.log(this.state.nofaquestiontype)
      },
      error => {

      }
    );

    nofaServices.getQuestion().then(
      response => {      
        var nofaQues = response.data.data;   

        this.setState({ nofaQuestion: nofaQues })
        console.log(this.state.nofaQuestion)
      },
      error => {

      }
    );




  }
  render() {

    // const nofTitle = this.props.NofaTit
    return (

      <div>
        <PanelBar>
          <PanelBarItem expanded={true} title={this.state.nofatitle}>

            <FormGroup row>

              <Col lg="4">
                <Field
                  name="nofaQuesType"
                  component={FormDropDownList}
                  // value={this.state.nofa.ID}
                  onChange={this.onChange}
                  label={"Questions Type"}
                  data={this.state.nofaquestiontype}
                  textField={"TYPE"}
                  dataItemKey={'ID'}
                />
              </Col>
              <Col lg="12">
                <Field
                  name="nofaQues"
                  component={FormDropDownList}
                  // value={this.state.nofa.ID}
                  onChange={this.onChange}
                  label={"Parent Questions"}
                  data={this.state.nofaQuestion}
                  textField={"QUESTION"}
                  dataItemKey={'ID'}
                />
              </Col>

              <Col lg="12">
                <Field
                  name={"ques"}
                  component={FormInput}
                  label={"Question"}
                />
              </Col>

            </FormGroup>

          </PanelBarItem>
        </PanelBar>
      </div>
    )
  }


}

export default NofaQues