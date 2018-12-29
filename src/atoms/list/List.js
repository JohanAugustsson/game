import React,{ Fragment} from 'react';
import './List.css';

// read example at the end
function List (props) {
  if (!props.dataselect) return null;
  const { data } = props;
  const { headers, tabelKeys } = props.dataselect;

  //creates headers for list
  const tabelHeader = headers.map(item=> <div className='item' key={item}>{item}</div>);

  // creates rows for list
  const tabelRows = Object.keys(data).map( (itemKey, index) => {
    const row = data[itemKey];
    const rowData = tabelKeys.map((item) => {
      const rowData = row[item.value];

      // if button current cell is button
      if (item.type === 'button')
        return  (
          <div key={index + '-' + rowData}>
            <button
              onClick={()=> props.onClick({rowData: row,  rowKey: itemKey, clickedValue: rowData, columnKey:item.value, rowNb: index })}
            >
              {rowData}
            </button>
          </div>
        )
      // if plain text
      return <div className='item' key={index}>{row[item.value]}</div>
    })

    return (
      <div
        key={itemKey}
        className='rows'
      >
        {rowData}
      </div>
    )
  });

  return (
    <div className='atoms-list'>
      <div className='headers'>
        {tabelHeader}
      </div>
        { tabelRows }
    </div>
  );
}


export default List;


/*

***** RAW DATA *************************************
const dataForList = {
  efaef: { name: 'johan', age: 38, city: 'Göteborg' },
  feffe: { name: 'peter', age: 38, city: 'Stockholm' },
}

***** SELECT DATA TO DISPLAY AND SELECT TYPE OF TEXT OR BUTTON
const labelList = {
  headers: ['Name','Age','City'],
  tabelKeys: [
    {
      type: 'text',
      value: 'name'
    },
    {
      type: 'button',
      value: 'age'
    },
    {
      type: 'button',
      value: 'city',
    }
  ]
}


<List
  data={dataForList}
  dataselect={labelList}
  onClick={this.handleList}
/>


returns data from row

clickedValue: "Stockholm"
columnKey: "city"
rowData: {name: "peter", age: 38, city: "Stockholm"}
rowKey: "feffe"
rowNb: 1



 */
