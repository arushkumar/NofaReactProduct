import * as React from "react";
export const MyGridCommandCell = props => {
  const {
    dataItem
  } = props;
  const inEdit = dataItem[props.editField];
  const isNewItem = dataItem.ID === undefined;
  return inEdit ? <td className="opration2">
    <button className="fourth btn btn-primary" onClick={() => isNewItem ? props.add(dataItem) : props.update(dataItem)}>
      <i className="fa fa-plus" aria-hidden="true"></i> {isNewItem ? "Add" : "Update"}
    </button>
    <button className="fourth btn btn-primary" onClick={() => isNewItem ? props.discard(dataItem) : props.cancel(dataItem)}>
      {isNewItem ? "Discard" : "Cancel"}
    </button>
  </td> : <td className="opration2">
    <button className="fourth btn btn-primary" onClick={() => props.edit(dataItem)}>
      <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
    </button>
    {/* <button className="fourth btn btn-primary" onClick={() => props.element(dataItem)}>
      <i className="fa fa-plus" aria-hidden="true"></i> Add Field
    </button> */}

    {/* <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base k-grid-remove-command" onClick={() => confirm("Confirm deleting: " + dataItem.TAB_NAME) && props.remove(dataItem)}> */}
    {/* <button className="fourth btn btn-danger" onClick={() => props.remove(dataItem)}>
      <i className="fa fa-trash-o" aria-hidden="true"></i> Remove
    </button> */}

  </td>;
};