import React from 'react';
// import ToDoLine from 

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mockdata: [
        { text: 'Item 1', value: false },
        { text: 'Item 2', value: false },
        { text: 'Item 3', value: false },
      ],
    };
  }

  render() {
    let location = `${window.location.pathname}${'#'}`;
    
    return (
      <div>
        {
          this.state.mockdata.map((item, index) => {
            item.key = `list_id_${index}`;
            return (
              <a href={location} className={item.value ? 'strikethrough' : ''} onClick={() => { item.value = !item.value }} key={item.key}>{item.text}<br /></a>
            )
          })
        }
      </div>
    )
  }
}

export default ToDoList;
