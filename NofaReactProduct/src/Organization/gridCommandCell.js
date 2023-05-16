import * as React from "react";
export const GridCommandCell = props => {
  const {
    dataItem
  } = props;
  const inEdit = dataItem[props.editField];
  const isNewItem = dataItem.id === undefined;
  return inEdit ? <td className="k-command-cell">   
    </td> : <td className="k-command-cell">
      <button className="k-primary k-custom-button k-button k-grid-edit-command" onClick={() => props.edit(dataItem)}>
      <i className="fa fa-edit" aria-hidden="true"></i>
      </button>     
    </td>;
};
export const GridDeleteCell = props => {
  const {
    dataItem
  } = props;
  const inDelete = dataItem[props.deleteField];
  const isNewItem = dataItem.id === undefined;
  return inDelete ? <td className="k-command-cell">   
    </td> : <td className="k-command-cell">
      <button className="k-primary k-custom-button k-button k-grid-edit-command" onClick={() => props.delete(dataItem)}>
      <i className="fa fa-trash-o" aria-hidden="true"></i>
      </button>     
    </td>;
};
