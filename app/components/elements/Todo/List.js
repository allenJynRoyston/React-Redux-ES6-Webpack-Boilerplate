import React from 'react';
// import ToDoLine from 

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listdata: [
        { text: 'Item 1', value: false },
        { text: 'Item 2', value: false },
        { text: 'Item 3', value: false },
      ],
    };
  }

  render() {
    let { myText, listdata } = this.state

    return pug`
    div
      ${listdata.map((item, index) => {
        item.key = `list_id_${index}`;
        return pug`
          a(role="button" key=${item.key} class=${item.value ? 'strikethrough' : ''} onClick=${() => { listdata[index].value = !listdata[index].value; this.setState({ listdata }) }}) ${item.text}          
            br
        `
        })}
    `
  }
}

export default ToDoList;
