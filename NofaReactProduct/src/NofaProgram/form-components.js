import React, { useEffect, useState } from 'react';

import { FieldWrapper,Field } from '@progress/kendo-react-form';
import { Input, MaskedTextBox, NumericTextBox, Checkbox, ColorPicker, Switch, RadioGroup, Slider, SliderLabel, RangeSlider, TextArea, Rating } from '@progress/kendo-react-inputs';
import { DatePicker, TimePicker, DateTimePicker, DateRangePicker, DateInput } from '@progress/kendo-react-dateinputs';
import { Label, Error, Hint, FloatingLabel } from '@progress/kendo-react-labels';
import { Upload } from '@progress/kendo-react-upload';
import { DropDownList, AutoComplete, MultiSelect, ComboBox, MultiColumnComboBox, DropDownTree } from '@progress/kendo-react-dropdowns';
import { processTreeData, expandedState } from './tree-data-operations';
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import {AdditionalDist} from "./data"

const ParentFieldContext = React.createContext("");
const FORM_DATA_INDEX = "formDataIndex";

const nameCell = (props) => {
  const parentField = React.useContext(ParentFieldContext);
  return (
    <td>
      <Field data={AdditionalDist} dataItemKey={"id"} textField="text"
        component={AutoComplete}
        name={`${parentField}[${props.dataItem[FORM_DATA_INDEX]}].${props.field}`}
      />
    </td>
  );
};
const nameCell2 = (props) => {

  const parentField = React.useContext(ParentFieldContext);
  return (
    <td>
     
      <Field data={AdditionalDist} dataItemKey={"id"} textField="text"
        component={AutoComplete}
        name={`${parentField}[${props.dataItem[FORM_DATA_INDEX]}].${props.field}`}
      />
    </td>
  );
};
const nameCell3 = (props) => {
  const parentField = React.useContext(ParentFieldContext);
  return (
    <td>
      <Field
        component={NumericTextBox}
        name={`${parentField}[${props.dataItem[FORM_DATA_INDEX]}].${props.field}`}
      />
    </td>
  );
};
const commandCell = (onRemove) => (props) => {
  const onClick = React.useCallback(
    (e) => {
      e.preventDefault();
      onRemove(props);
    },
    [props]
  );
  return (
    <td>
      <button className="k-button k-grid-remove-command" onClick={onClick}>
        Remove
      </button>
    </td>
  );
};
export const FormGrid = (fieldArrayRenderProps) => {
  const { validationMessage, visited, name } = fieldArrayRenderProps;
  const onAdd = React.useCallback(
    (e) => {
      e.preventDefault();
      fieldArrayRenderProps.onUnshift({
        value: {
          name: "",
        },
      });
    },
    [fieldArrayRenderProps]
  );
  const onRemove = React.useCallback(
    (cellProps) =>
      fieldArrayRenderProps.onRemove({
        index: cellProps.dataIndex,
      }),
    [fieldArrayRenderProps]
  );
  const dataWithIndexes = fieldArrayRenderProps.value.map((item, index) => {
    return { ...item, [FORM_DATA_INDEX]: index };
  });
  return (
    <ParentFieldContext.Provider value={name}>
      {visited && validationMessage && <Error>{validationMessage}</Error>}
      <Grid data={dataWithIndexes}>
        <GridToolbar>
          <button
            title="Add new"
            className="k-button k-primary"
            onClick={onAdd}
          >
            Add new
          </button>
        </GridToolbar>
        <GridColumn  field="attribute_name" title="Attribute Name" cell={nameCell} />
        <GridColumn field="sub_attribute_name" title="Sub Attribute Name" cell={nameCell2} />
        <GridColumn field="percentage" title="Percentage" cell={nameCell3} />
        <GridColumn cell={commandCell(onRemove)} width="150px" />
      </Grid>
    </ParentFieldContext.Provider>
  );
};
export const FormInput = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    type,
    value,
    optional,    
    required,
    ...others
  } = fieldRenderProps;
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  return <FieldWrapper>
        <div className='input-label'>
        <Label editorId={id} editorValid={valid} editorDisabled={disabled} optional={optional}>{label}{required && <span className='required' >*</span>}</Label>
        
        </div>
        { value ? <span className='length'> {value.length} / {125}</span> : ""}
        <div className={'k-form-field-wrap'}>
          <Input value={value} valid={valid} type={type} disabled={disabled} id={id} maxLength={64} ariaDescribedBy={`${hintId} ${errorId}`} {...others} /> 
          {showHint && <Hint id={hintId}>{hint}</Hint>}
          {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
        </div>
      </FieldWrapper>;
};
export const FormRadioGroup = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    id,
    label,
    valid,
    disabled,
    hint,
    visited,
    modified,
    ...others
  } = fieldRenderProps;
  const editorRef = React.useRef(null);
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  const labelId = label ? `${id}_label` : '';
  return <FieldWrapper>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>{label}</Label>
        <RadioGroup ariaDescribedBy={`${hintId} ${errorId}`} ariaLabelledBy={labelId} valid={valid} disabled={disabled} ref={editorRef} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormNumericTextBox = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,value,
    hint,
    ...others
  } = fieldRenderProps;
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  return <FieldWrapper>
        <Label editorId={id} editorValid={valid} editorDisabled={disabled}>{label}</Label>
        
        <div className={'k-form-field-wrap'}>
        <NumericTextBox ariaDescribedBy={`${hintId} ${errorId}`} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
        </div>
      </FieldWrapper>;
};
export const FormCheckbox = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    id,
    valid,
    disabled,
    hint,
    optional,
    required,
    label,
    visited,
    modified,
    checked,
    ...others
  } = fieldRenderProps;
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  return <FieldWrapper>
        <Checkbox ariaDescribedBy={`${hintId} ${errorId}`} label={label} labelOptional={optional} valid={valid} id={id} disabled={disabled} checked={checked} {...others} />
        {required && <span className='required' >*</span>}
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormSwitch = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    optional,
    id,
    valid,
    disabled,
    hint,
    checked,
    ...others
  } = fieldRenderProps;
  const editorRef = React.useRef(null);
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  const labelId = label ? `${id}_label` : '';
  return <FieldWrapper>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled} optional={optional}>
          {label}
        </Label>
        <Switch ref={editorRef} ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} valid={valid} id={id} disabled={disabled} checked={checked} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormMaskedTextBox = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    hint,value,
    optional,
    ...others
  } = fieldRenderProps;
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  return <FieldWrapper>
        <Label editorId={id} editorValid={valid} optional={optional}>{label}</Label>
        { value ? <span className='length'> {value.length} / {125}</span> : ""}
        <div className={'k-form-field-wrap'}>
      
          <MaskedTextBox ariaDescribedBy={`${hintId} ${errorId}`} valid={valid} id={id} {...others} />
          {showHint && <Hint id={hintId}>{hint}</Hint>}
          {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
        </div>
      </FieldWrapper>;
};
export const FormTextArea = fieldRenderProps => {
  const {
    value,
    validationMessage,
    touched,
    label,
    id,
    valid,
    hint,
    disabled,
    optional,
    required,
    ...others
  } = fieldRenderProps;
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  return <FieldWrapper>
        <div className='input-label'>
        <Label editorId={id} editorValid={valid} optional={optional}>{label}{required && <span className='required' >*</span>}</Label>
       
        </div>
        { value ? <span className='length'> {value.length} / {1000}</span> : ""}
        <TextArea value={value} valid={valid} id={id} disabled={disabled} maxLength={1024} ariaDescribedBy={`${hintId} ${errorId}`} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormColorPicker = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    wrapperStyle,
    ...others
  } = fieldRenderProps;
  const editorRef = React.useRef(null);
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  const labelId = label ? `${id}_label` : '';
  return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
          {label}
        </Label>
        <ColorPicker ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormSlider = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    data,
    min,
    max,
    ...others
  } = fieldRenderProps;
  const editorRef = React.useRef(null);
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  const labelId = label ? `${id}_label` : '';
  return <FieldWrapper>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
          {label}
        </Label>
        <Slider ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef} valid={valid} id={id} disabled={disabled} min={min} max={max} {...others}>
          {data.map(value => <SliderLabel title={value} key={value} position={value}>
                        {value.toString()}
                      </SliderLabel>)}
        </Slider>
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormRangeSlider = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    hint,
    disabled,
    data,
    min,
    max,
    ...others
  } = fieldRenderProps;
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  return <FieldWrapper>
        <Label editorId={id} editorValid={valid}>{label}</Label>
        <RangeSlider valid={valid} id={id} disabled={disabled} ariaDescribedBy={`${hintId} ${errorId}`} min={min} max={max} {...others}>{data.map(value => {
        return <SliderLabel key={value} position={value}>
                        {value.toString()}
                      </SliderLabel>;
      })}
        </RangeSlider>
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormRating = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    hint,
    disabled,
    optional,
    ...others
  } = fieldRenderProps;
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  return <FieldWrapper>
        <Label editorId={id} editorValid={valid} optional={optional}>{label}</Label>
        <Rating valid={valid} id={id} disabled={disabled} ariaDescribedBy={`${hintId} ${errorId}`} {...others} />
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormUpload = fieldRenderProps => {
  const {
    valid,
    disabled,
    value,
    id,
    subtitle,
    optional,
    required,
    label,
    hint,
    validationMessage,
    touched,saveUrl,
    multiple,
    accept,removeUrl,
    ...others
  } = fieldRenderProps;
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  const labelId = label ? `${id}_label` : '';

  const onChangeHandler = event => {
    fieldRenderProps.onChange({
      value: event.newState
    });
  };

  const onRemoveHandler = event => {
    fieldRenderProps.onChange({
      value: event.newState
    });
  };

  return <FieldWrapper>
        <Label id={labelId} editorId={id} optional={optional} editorValid={valid} editorDisabled={disabled}>
          {label}{required && <span className='required' >*</span>}
        </Label>
        <span className="subtitle">{subtitle}</span>
        <Upload 
         
         
         withCredentials={false}
          id={id} 
          autoUpload={true} 
          showActionButtons={true} 
          multiple={multiple} 
          
          restrictions={{
            allowedExtensions: accept
          }}
          // accept={accept}
          onAdd={onChangeHandler} 
          onRemove={onRemoveHandler} 
          ariaDescribedBy={`${hintId} ${errorId}`} 
          ariaLabelledBy={labelId} 
           saveUrl={saveUrl}
           removeUrl={removeUrl}
          {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormDropDownList = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    wrapperStyle,
    ...others
  } = fieldRenderProps;
  const editorRef = React.useRef(null);
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  const labelId = label ? `${id}_label` : '';
  return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
          {label}
        </Label>
        <DropDownList ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormAutoComplete = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    wrapperStyle,placeholder,
    required,
    ...others
  } = fieldRenderProps;
  const editorRef = React.useRef(null);
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  const labelId = label ? `${id}_label` : '';
  return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
          {label} {required && <span className='required' >*</span>}
         
        </Label>
        <AutoComplete ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef} placeholder={placeholder} valid={valid} id={id} disabled={disabled} {...others} /> 
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormComboBox = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    wrapperStyle,
    ...others
  } = fieldRenderProps;
  const editorRef = React.useRef(null);
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  const labelId = label ? `${id}_label` : '';
  return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
          {label}
        </Label>
        <ComboBox ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormMultiColumnComboBox = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    wrapperStyle,
    ...others
  } = fieldRenderProps;
  const editorRef = React.useRef(null);
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  const labelId = label ? `${id}_label` : '';
  const columns = [{
    field: 'id',
    header: <span>header</span>,
    width: '100px'
  }, {
    field: 'name',
    header: 'Name',
    width: '300px'
  }, {
    field: 'position',
    header: 'Position',
    width: '300px'
  }];
  return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
          {label}
        </Label>
        <MultiColumnComboBox ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef} valid={valid} id={id} disabled={disabled} columns={columns} textField={'name'} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormMultiSelect = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    wrapperStyle,
    ...others
  } = fieldRenderProps;
  const editorRef = React.useRef(null);
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : "";
  const errorId = showValidationMessage ? `${id}_error` : "";
  const labelId = label ? `${id}_label` : "";
  return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
          {label}
        </Label>
        <MultiSelect ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormDropDownTree = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    wrapperStyle,
    data,
    ...others
  } = fieldRenderProps;
  const {
    value,
    selectField,
    expandField,
    dataItemKey,
    filter
  } = others;
  const [expanded, setExpanded] = React.useState([data[0][dataItemKey]]);
  const treeData = React.useMemo(() => processTreeData(data, {
    expanded,
    value,
    filter
  }, {
    selectField,
    expandField,
    dataItemKey,
    subItemsField: 'items'
  }), [data, expanded, value, filter, selectField, expandField, dataItemKey]);
  const onExpandChange = React.useCallback(event => setExpanded(expandedState(event.item, dataItemKey, expanded)), [expanded, dataItemKey]);
  const editorRef = React.useRef(null);
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : "";
  const errorId = showValidationMessage ? `${id}_error` : "";
  const labelId = label ? `${id}_label` : "";
  return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
          {label}
        </Label>
        <DropDownTree ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef} valid={valid} id={id} disabled={disabled} data={treeData} onExpandChange={onExpandChange} dataItemKey={others.dataItemKey} textField={others.textField} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormDatePicker = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    wrapperStyle,
    hintDirection,
    ...others
  } = fieldRenderProps;
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  const labelId = label ? `${id}_label` : '';
  return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
          {label}
        </Label>
        <div className={'k-form-field-wrap'}>
          <DatePicker ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} valid={valid} id={id} disabled={disabled} {...others} />
          {showHint && <Hint id={hintId} direction={hintDirection}>{hint}</Hint>}
          {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
        </div>
      </FieldWrapper>;
};
export const FormDateTimePicker = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    wrapperStyle,
    ...others
  } = fieldRenderProps;
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  const labelId = label ? `${id}_label` : '';
  return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
          {label}
        </Label>
        <DateTimePicker ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormTimePicker = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    wrapperStyle,
    ...others
  } = fieldRenderProps;
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  const labelId = label ? `${id}_label` : '';
  return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
          {label}
        </Label>
        <TimePicker ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormDateInput = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    wrapperStyle,
    ...others
  } = fieldRenderProps;
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  const labelId = label ? `${id}_label` : '';
  return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorId={id} editorValid={valid} editorDisabled={disabled}>
          {label}
        </Label>
        <DateInput ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormDateRangePicker = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    wrapperStyle,
    ...others
  } = fieldRenderProps;
  const editorRef = React.useRef(null);
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  const labelId = label ? `${id}_label` : '';
  return <FieldWrapper style={wrapperStyle}>
        <Label id={labelId} editorRef={editorRef} editorId={id} editorValid={valid} editorDisabled={disabled}>
          {label}
        </Label>
        <DateRangePicker ariaLabelledBy={labelId} ariaDescribedBy={`${hintId} ${errorId}`} ref={editorRef} valid={valid} id={id} disabled={disabled} {...others} />
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormFloatingNumericTextBox = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    optional,
    value,
    ...others
  } = fieldRenderProps;
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  return <FieldWrapper>
        <FloatingLabel optional={optional} editorValue={value} editorId={id} editorValid={valid} editorDisabled={disabled} label={label}>
          <NumericTextBox ariaDescribedBy={`${hintId} ${errorId}`} value={value} valid={valid} id={id} disabled={disabled} {...others} />
        </FloatingLabel>
        {showHint && <Hint id={hintId}>{hint}</Hint>}
        {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
      </FieldWrapper>;
};
export const FormInputQues = fieldRenderProps => {
  const {
    validationMessage,
    touched,
    label,
    id,
    valid,
    disabled,
    hint,
    type,
    value,
    optional,    
    required,
    ...others
  } = fieldRenderProps;
  const showValidationMessage = touched && validationMessage;
  const showHint = !showValidationMessage && hint;
  const hintId = showHint ? `${id}_hint` : '';
  const errorId = showValidationMessage ? `${id}_error` : '';
  return <FieldWrapper>
        <div className='input-label'>
        <Label editorId={id} editorValid={valid} editorDisabled={disabled} optional={optional}>{label}{required && <span className='required' >*</span>}</Label>
        
        </div>
        {/* { value ? <span className='length'> {value.length} / {100000}</span> : ""} */}
        <div className={'k-form-field-wrap'}>
          <Input value={value} valid={valid} type={type} disabled={disabled} id={id} maxLength={64} ariaDescribedBy={`${hintId} ${errorId}`} {...others} /> 
          {showHint && <Hint id={hintId}>{hint}</Hint>}
          {showValidationMessage && <Error id={errorId}>{validationMessage}</Error>}
        </div>
      </FieldWrapper>;
};