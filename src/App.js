import React, { Component } from 'react';
import CreateTask from './Tasks/CreateTask'
import ManageTasks from './Tasks/ManageTasks'
import * as reactbootstrap from 'react-bootstrap';
import { Constants } from './commonData/Constants';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: Constants.Tasks,
      taskId: null,
      timeDummyVariable: null,
    }
    this.interval = null

    this.updateTasks = this.updateTasks.bind(this)
    this.editTask = this.editTask.bind(this)
  }

  updateTasks(updatedTasks, newTask = 1) {
    //newTask 1 new 0 make as completed 2 edit
    if (newTask === 1) {
      let preCount = (localStorage.getItem('count') !== undefined) ? Number(localStorage.getItem('count')) : 0
      localStorage.setItem('count', preCount + 1)
    } else if (newTask === 0) {
      let preCount = (localStorage.getItem('checkboxCount') !== undefined) ? Number(localStorage.getItem('checkboxCount')) : 0
      localStorage.setItem('checkboxCount', preCount + 1)
    }
    this.setState({
      tasks: updatedTasks,
    })
  }

  editTask(id) {
    localStorage.setItem('editId', id)
    this.setState({
      taskId: id,
    })
  }

  render() {
    let curTime = Date()
    var splitted = curTime.split('GMT')
    let currentDateTime = splitted[0]

    return (
      <div style={{ width: '100%', border: '3px solid #fff', padding: '20px'}}>
        <div>
          <p style={{ width: '96%', textAlign: 'right' }}>Current Time : {currentDateTime}</p>
        </div>
        <div style={{ width: '40%', float: 'left', padding: '20px', border: '2px solid black', marginLeft: '40px', marginRight: '80px'}}>
          <CreateTask tasks = {this.state.tasks} updateTasks={this.updateTasks} id = {this.state.taskId} editId={localStorage.getItem('editId')} editTask={this.editTask}/>
        </div>
        <div style={{ width: '40%', float: 'left', padding: '20px', border: '2px solid black'}}>
          <ManageTasks tasks = {this.state.tasks} count = {localStorage.getItem('count')} updateTasks={this.updateTasks} checkboxCount={localStorage.getItem('checkboxCount')} editTask={this.editTask}/>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.interval = setInterval(() =>
    this.setState({
      timeDummyVariable: null,
    }), 1000)
  }

}

export default App;
