import React, { Component } from 'react';
import * as reactbootstrap from 'react-bootstrap';
import { Constants } from '../commonData/Constants';
import { Form } from 'react-bootstrap'
var DateDiff = require('date-diff');

class ManageTasks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: this.props.tasks,
      typeFilter: '',
      statusFilter: '',
      Statuses: Constants.Status,
      allTypes: Constants.filterTypes,
      taskStatus: 1,
    }

    this.convert = this.convert.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.handleTypeSelection = this.handleTypeSelection.bind(this)
    this.handleStatusSelection = this.handleStatusSelection.bind(this)
    this.makeTaskCompleted = this.makeTaskCompleted.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    if ((prevProps.count !== undefined && prevProps.count !== this.props.count) || (prevProps.checkboxCount !== undefined && prevProps.checkboxCount !== this.props.checkboxCount)) {
      this.setState({
        tasks: this.props.tasks,
      })
    }
  }

  handleTypeSelection(e) {
    let totalTasks = this.props.tasks
    if (Number(e.target.value) !== -1) {
      let allTasks = [];
      Object.values(totalTasks).map(item => {
        if (Number(item.type) === Number(e.target.value)) {
          allTasks.push(item);
        }
      })
      this.setState({
        tasks: allTasks,
        typeFilter: e.target.value,
      })
    } else {
      this.setState({
        tasks: totalTasks,
        typeFilter: e.target.value,
      })
    }
  }

  handleStatusSelection(e) {
    let totalTasks = this.props.tasks
    if (Number(e.target.value) !== 0) {
      let allTasks = [];
      Object.values(totalTasks).map(item => {
        if (Number(item.status) === Number(e.target.value)) {
          allTasks.push(item);
        }
      })
      this.setState({
        tasks: allTasks,
        statusFilter: e.target.value,
      })
    } else {
      this.setState({
        tasks: totalTasks,
        statusFilter: e.target.value,
      })
    }
  }

  convert(str, id, status) {
    console.log(id);
    var todayDate = Date();
    var date1 = new Date(todayDate);
    // mnth1 = ("0" + (date1.getMonth() + 1)).slice(-2),
    // day1 = ("0" + date1.getDate()).slice(-2),
    // hours1 = ("0" + date1.getHours()).slice(-2),
    // minutes1 = ("0" + date1.getMinutes()).slice(-2),
    // seconds1 = ("0" + date1.getSeconds()).slice(-2);
    // let dateOne = [date1.getFullYear(), mnth1, day1].join("-")
    // var timeOne = [hours1, minutes1, seconds1].join(":");
    var date = new Date(str);
    // mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    // day = ("0" + date.getDate()).slice(-2),
    // hours = ("0" + date.getHours()).slice(-2),
    // minutes = ("0" + date.getMinutes()).slice(-2),
    // seconds = ("0" + date.getSeconds()).slice(-2);
    // let dateTwo = [date.getFullYear(), mnth, day].join("-")
    // var timeTwo = [hours, minutes, seconds].join(":");

    let differenceInDays = this.getDifferenceInDays(date1, date);
    let differenceInHours = this.getDifferenceInHours(date1, date)
    let differenceInMinutes = this.getDifferenceInMinutes(date1, date)
    let differenceInSeconds = this.getDifferenceInSeconds(date1, date)
    console.log(differenceInDays);
    console.log(differenceInHours);
    console.log(differenceInMinutes);
    console.log(differenceInSeconds);

    let dueDateOfTask = 0
    if (status !== 2) {
      if (differenceInDays > 0) {
        if (differenceInDays > 365) {
          let dueYears = differenceInDays/365
          dueDateOfTask = "Due in " + dueYears + "Years"
        } else if(differenceInDays > 30) {
          let dueMonths = differenceInDays/30
          dueDateOfTask = "Due in " + dueMonths + "Months"
        } else if(differenceInHours > 24) {
          dueDateOfTask = "Due in " + differenceInDays + "d " + differenceInHours + "h"
        } else {
          if(differenceInHours < 1) {
            dueDateOfTask = "Due in " + differenceInMinutes + "m "
            Object.values(this.props.tasks).map(item => {
              if (item.id === id) {
                item.color = "yellow"
              }
            })
          } else {
            let dueMinutes = Math.round(differenceInHours/60)
            let dueSeconds = Math.round(differenceInMinutes/60)
            dueDateOfTask = "Due in " + (differenceInHours) + "h " + dueMinutes + "m " + dueSeconds + "s"
          }
        }
      } else if(differenceInDays === 0) {
        if (differenceInHours === 0) {
          if (differenceInMinutes === 0) {
            if (differenceInSeconds === 0) {
              dueDateOfTask = "Due Time Exceed"
              Object.values(this.props.tasks).map(item => {
                if (item.id === id) {
                  item.color = "red"
                }
              })
            } else {
              dueDateOfTask = "Due in " + (differenceInSeconds) + "m "
              Object.values(this.props.tasks).map(item => {
                if (item.id === id) {
                  item.color = "yellow"
                }
              })
            }
          } else {
            dueDateOfTask = "Due in " + (differenceInMinutes) + "m "
            Object.values(this.props.tasks).map(item => {
              if (item.id === id) {
                item.color = "yellow"
              }
            })
          }
        } else {
          if(differenceInHours < 1) {
            dueDateOfTask = "Due in " + differenceInMinutes + "m "
            Object.values(this.props.tasks).map(item => {
              if (item.id === id) {
                item.color = "yellow"
              }
            })
          } else {
            let dueMinutes = Math.round(differenceInHours/60)
            let dueSeconds = Math.round(differenceInMinutes/60)
            dueDateOfTask = "Due in " + (differenceInHours) + "h " + dueMinutes + "m " + dueSeconds + "s"
          }
        }
      } else {
        dueDateOfTask = "Due Time Exceed"
        Object.values(this.props.tasks).map(item => {
          if (item.id === id) {
            item.color = "red"
          }
        })
      }
    } else {
      dueDateOfTask = "Task completed"
    }


    return dueDateOfTask
  }

  getDifferenceInDays(date1, date2) {
    // const diffInMs = Math.abs(date2 - date1);
    const diffInMs = date2 - date1;
    return Math.trunc(diffInMs / (1000 * 60 * 60 * 24));
  }

  getDifferenceInHours(date1, date2) {
    // const diffInMs = Math.abs(date2 - date1);
    const diffInMs = date2 - date1;
    return Math.trunc(diffInMs / (1000 * 60 * 60));
  }

  getDifferenceInMinutes(date1, date2) {
    const diffInMs = date2 - date1;
    return Math.trunc(diffInMs / (1000 * 60));
  }

  getDifferenceInSeconds(date1, date2) {
    const diffInMs = date2 - date1;
    return Math.trunc(diffInMs / 1000);
  }

  deleteTask(e, id) {
    let allTasks = [];
    Object.values(this.props.tasks).map(item => {
      if (item.id !== id) {
        allTasks.push(item);
      }
    })
    this.props.updateTasks(allTasks)
  }

  makeTaskCompleted(e, id) {
    let allTasks = [];
    Object.values(this.props.tasks).map(item => {
      if (item.id === id) {
        // item.Duedate = "Task completed"
        item.taskCompleted = !item.taskCompleted
        item.status = (item.status === 2) ? 1 : 2 // completed tasks
      }
      allTasks.push(item);
    })
    this.props.updateTasks(allTasks, 0)
  }

  render() {
    const { tasks, typeFilter, statusFilter, allTypes, Statuses, taskStatus } = this.state
    console.log(tasks);
    return(
      <reactbootstrap.Container className="pt-5 px-0">
        <div style={{ color: '#EC661C', fontSize: '20px'}} >
            <span><h4>{'Manage tasks'}</h4></span>
        </div>
        <div style={{ width: '100%', border: '3px solid #fff', padding: '20px'}}>
          <div style={{ width: '45%', float: 'right', marginbottom: '15px',border: '0px' }}>
            <reactbootstrap.FormControl as="select" name="typeFilter"
                className="input_sw"
                value={statusFilter}
                onChange={e => this.handleStatusSelection(e)} >
                <option>Status : All</option>
                {Object.values(Statuses).map(Item => <option value={Item.id}>{Item.name}</option>)}
            </reactbootstrap.FormControl>
          </div>
          <div style={{ width: '20%', float: 'right', marginbottom: '15px',border: '0px' }}>
            <reactbootstrap.FormControl as="select" name="statusFilter"
                className="input_sw"
                value={typeFilter}
                onChange={e => this.handleTypeSelection(e)} >
                <option>Type : All</option>
                {Object.values(allTypes).map(taskType => <option value={taskType.id}>{taskType.name}</option>)}
            </reactbootstrap.FormControl>
          </div>
        </div>
        <reactbootstrap.Form style={{ width: '600px', height: '200px'}}>
          {/* add scroll bar */}
          <reactbootstrap.Table style={{ display: 'block'}}>
            <thead style={{ backgroundColor: '#EC661C', color: 'white', position: 'sticky', top: '0', textAlign: 'center' }}>
                <tr style={{ textAlign: 'center', border: '2px solid black' }}>
                  <th>{'Name'}</th>
                  <th>{'Make completed'}</th>
                  <th>{'Delete'}</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: 'gray', color: 'white', position: 'sticky', top: '0', textAlign: 'center' }}>
                {Object.values(tasks).map((item) => (
                  <tr style={{ textAlign: 'center', border: '2px solid black' }} onClick = {e => this.props.editTask(item.id)}>
                     <td style={{ backgroundColor: item.color }}>
                       {item.color}
                       {item.name} { item.Duedate === "Task completed" ? "Task completed" : this.convert(item.Duedate, item.id, item.status) }
                     </td>
                     <td>
                       <Form.Check
                           onChange={e => this.makeTaskCompleted(e, item.id)}
                           name='makeCompleted'
                           checked={item.taskCompleted}
                           label={""}
                       />
                     </td>
                     <td>
                       <reactbootstrap.Button style={{ float: 'left', backgroundColor: '#EC661C',borderColor: "black", marginBottom: '25px', marginTop: '25px', width: '80px' }} type="button" onClick={e => this.deleteTask(e, item.id)}>
                             {'Delete'}
                       </reactbootstrap.Button>
                     </td>
                  </tr>
                ))}
              </tbody>
          </reactbootstrap.Table>
        </reactbootstrap.Form>
      </reactbootstrap.Container>
    )
  }
}

export default (ManageTasks);
