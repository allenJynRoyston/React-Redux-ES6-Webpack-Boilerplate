import React from 'react';
// import ToDoLine from 

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myText: '', 
      listdata: [
        { text: 'Item 1', value: false },
        { text: 'Item 2', value: false },
        { text: 'Item 3', value: false },
      ],
    };
  }

  render() {
    let { myText, listdata } = this.state

    let changeState = (item) => {
      item.value = !item.value;
      this.setState({ myText: 'Value has been changed!' })
      this.forceUpdate()
    }

    return (
      <div>
        <p>{myText}</p>
        {
          listdata.map((item, index) => {
            item.key = `list_id_${index}`;
            return (
              <a role="button" className={item.value ? 'strikethrough' : ''} onClick={() => { changeState(item) }} key={item.key}>{item.text}<br /></a>
            )
          })
        }
      </div>
    )
  }
}

export default ToDoList;
