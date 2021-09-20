import React, { useState } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const contactList = [
  {
    comptype: 'TextSnippet',
    title: 'How to free your cat?',
    text: 'some interesting text can go here'
  }
]



function App() {

  class NameForm extends React.Component {

    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
      event.preventDefault();
      const items = Array.from(contacts);
      const formItems = document.getElementById("compForm").elements;
      //console.log(formItems);
      const formValue = Array.from(formItems)
      const container = {};
      const inputType = formValue.map(e => {
        
        if(e.value === "Submit" || e.value === "") return;

        
        container[e.name] = e.value;

        //console.log(e.name + ': ' + e.value)

        return container;
      })

      const inputTypesClean = inputType.filter(cleanup => cleanup);

      //console.log(inputTypesClean[0]);

      //console.log(items);

      items.splice(0, 0, inputTypesClean[0]);

      updateContacts(items)

    }

    render() {
      return (
        <form onSubmit={this.handleSubmit} id="compForm">
          <div className="formItem">
            <select name="comptype">
              <option >Choose</option>
              <option value="TextSnippet">TextSnippet</option>
              <option value="HighlightedText">HighlightedText</option>
            </select>
            <label>Type:</label>
          </div>
          <div className="formItem">
            <input name="title" type="text" />
            <label>title:</label>
          </div>
          <div className="formItem">
            <textarea name="text" >
            </textarea>
            <label>text:</label>
          </div>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
  const [contacts, updateContacts] = useState(contactList)

  function handleOnDragEnd(result) {
    if(!result.destination) return;
    const items = Array.from(contacts);
    const [reorderItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderItem);

    updateContacts(items)
  }
  return (
    <div className="App">
      <header className="App-header">
        Blueprint Creator
      </header>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="contacts">
          {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {contacts.map(({comptype,title,text}, index) => {
              return (
                <Draggable key={index} draggableId={index.toString()} index={index}>
                {(provided) => (
                <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    Type: {comptype}<br />
                    Title: {title}<br />
                    {text}
                </li>
                )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
          )}
        </Droppable>
      </DragDropContext>
      <div className="contactForm">
        <div className="formTitle">Add Component</div>
        <NameForm />
      </div>
    </div>
  );
}

export default App;
