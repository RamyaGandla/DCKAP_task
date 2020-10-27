import React, { Component } from 'react';
import CreateTask from './Tasks/CreateTask'
import ManageTasks from './Tasks/ManageTasks'
import * as reactbootstrap from 'react-bootstrap';
import { Constants } from './commonData/Constants';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: Constants.Tasks,
      taskId: null,
    }

    this.updateTasks = this.updateTasks.bind(this)
    this.editTask = this.editTask.bind(this)
  }

  updateTasks(updatedTasks, newTask = 1) {
    if (newTask === 1) {
      let preCount = (localStorage.getItem('count') !== undefined) ? Number(localStorage.getItem('count')) : 0
      localStorage.setItem('count', preCount + 1)
    } else {
      let preCount = (localStorage.getItem('checkboxCount') !== undefined) ? Number(localStorage.getItem('checkboxCount')) : 0
      localStorage.setItem('checkboxCount', preCount + 1)
    }
    this.setState({
      tasks: updatedTasks,
    })
  }

  editTask(e, id) {
    // let taskId = (localStorage.getItem('editId') !== undefined) ? Number(localStorage.getItem('editId')) : id
    localStorage.setItem('editId', id)
    this.setState({
      taskId: id,
    })
  }

  render() {
    let curTime = Date()
    var splitted = curTime.split('GMT');
    var DatenTime = splitted[0];

    return (
      <div style={{ width: '100%', border: '3px solid #fff', padding: '20px'}}>
        <div>
          <p style={{ width: '100%', textAlign: 'right' }}>Current Time : {DatenTime}</p>
        </div>
        <div style={{ width: '40%', float: 'left', padding: '20px', border: '2px solid black', marginLeft: '40px', marginRight: '80px'}}>
          <CreateTask tasks = {this.state.tasks} updateTasks={this.updateTasks} id = {this.state.taskId} editId={localStorage.getItem('editId')}/>
        </div>
        <div style={{ width: '40%', float: 'left', padding: '20px', border: '2px solid black'}}>
          <ManageTasks tasks = {this.state.tasks} count = {localStorage.getItem('count')} updateTasks={this.updateTasks} checkboxCount={localStorage.getItem('checkboxCount')} editTask={this.editTask}/>
        </div>
      </div>
    );
  }
}

export default App;
