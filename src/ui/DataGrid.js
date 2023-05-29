const TABLE_BODY_ID = "table-body";

export default class DataGrid {
  #parentId;
  #tBodyElement;
  #keys;

  constructor(parendId, columns) {
    this.#parentId = parendId;
    this.#keys = columns.map((column) => column.field);
    this.#fillHeader(
      parendId,
      columns.map((column) => column.headerName)
    );
  }

  fillData(rowsData) {
    this.#tBodyElement.innerHTML = rowsData
      .map(
        (rowData) => `
          <tr>
            ${this.#fillRow(rowData)}
          </tr>
        `
      )
      .join("");
  }

  insertRow(obj) {
    this.#tBodyElement.innerHTML += this.#fillRow(obj);
  }

  #fillRow(rowData) {
    return this.#keys
      .map(
        (key) => `
      <td>
        ${rowData[key]}
      </td>
    `
      )
      .join("");
  }

  #fillHeader(parentId, columnNames) {
    const tbodyId = getId(this.#parentId, TABLE_BODY_ID);
    const tableSectionElement = document.getElementById(parentId);
    tableSectionElement.innerHTML = `
      <table>
        <thead>
          <tr>
            ${columnNames
              .map((columnName) => `<th>${columnName}</th>`)
              .join("")}
          </tr>
        </thead>
        <tbody id="${tbodyId}">
        </tbody>
      </table>
    `;
    this.#tBodyElement = document.getElementById(tbodyId);
  }
}

function getId(parentId, elementId) {
  return `${parentId}-${elementId}`;
}
