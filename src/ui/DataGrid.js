export default class DataGrid {
  #tBodyElement;
  #keys;

  constructor(parendId, columns) {
    this.#keys = columns.map((column) => column.field);
    this.#fillHeader(
      parendId,
      columns.map((column) => column.headerName)
    );
  }

  fillData(rowsData) {
    const tableBodyElement = document.getElementById(this.#tBodyElement);
    tableBodyElement.innerHTML = rowsData.map((rowData) => `
      <tr>
        ${this.#fillRow(rowData)}
      </tr>
    `).join('')
  }

  #fillRow(rowData) {
    return this.#keys.map((key) => `
      <td>
        ${rowData[key]}
      </td>
    `).join('');
  }

  #fillHeader(parentId, columnNames) {
    const tableSectionElement = document.getElementById(parentId);
    this.#tBodyElement = "table-body";
    tableSectionElement.innerHTML = `
      <table>
        <thead>
          <tr>
            ${columnNames
              .map((columnName) => `<th>${columnName}</th>`)
              .join("")}
          </tr>
        </thead>
        <tbody id="${this.#tBodyElement}">
        </tbody>
      </table>
    `;
  }
}
