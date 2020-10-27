import React, { Component } from 'react';
import * as reactbootstrap from 'react-bootstrap';
import { Constants } from '../commonData/Constants';
import { Form } from 'react-bootstrap'

class ManageTasks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: this.props.tasks,
      taskTypes: Constants.Types,
      typeFilter: '',
      statusFilter: '',
      Statuses: Constants.Status,
      allTypes: Constants.filterTypes,
    }

    this.convert = this.convert.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.handleTypeSelection = this.handleTypeSelection.bind(this)
    this.handleStatusSelection = this.handleStatusSelection.bind(this)
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
      })
    } else {
      this.setState({
        tasks: totalTasks,
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
      })
    } else {
      this.setState({
        tasks: totalTasks,
      })
    }
  }

  convert(str) {
    // let dueDate = str.toLocaleString()
    // let currentDate = todayDate.toLocaleString()
    // console.log(str.toLocaleString());
    var todayDate = new Date();
    // console.log(todayDate);
    // console.log(todayDate.toLocaleString());
    // let diff = null
    // if(todayDate.toLocaleString() > str.toLocaleString()) {
    //   diff = todayDate.toLocaleString() - str.toLocaleString()
    // } else {
    //   diff = str.toLocaleString() - todayDate.toLocaleString()
    // }
    // console.log(diff);
    // Duedate: Thu Oct 01 2020 00:08:00 GMT+0530
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    // console.log(date);
    return [date.getFullYear(), mnth, day].join("-");

    // var str = $.datepicker.formatDate('yy-mm-dd', d)
    //
    // var d = "Fri Jan 31 2014 00:00:00 GMT-0800 (Pacific Standard Time)";
    // alert(convertDate(d));
    // currentTimeDate.getDay()
    // => 6
    // (Returns the day of the week (0-6))
    // currentTimeDate.getMonth()
    // => 7
    // (Returns the month (0-11))
    // currentTimeDate.getDate()
    // => 5
    // (Returns the day of the month (1-31))
    // currentTimeDate.getFullYear()
    // => 2017
    // (Returns the year (4 digits for 4-digit years))
    // currentTimeDate.getHours()
    // => 2
    // (Returns the hour (0-23))
    // currentTimeDate.getMinutes()
    // => 43
    // (Returns the minutes (0-59))
    // currentTimeDate.getSeconds()
    // => 14
    // (Returns the seconds (0-59))
    //
    //     // const today = new Date()
        // let dateTime = today.toLocaleString('default', { month: 'long' })
        //     let todayDate = new Date();
        //     let dateTime = todayDate.toLocaleString();
        //     const today = new Date() today. toLocaleString('default', { month: 'long' }) ...
        // today. toLocaleString('default', { month: 'short' }) ...
        // const today = new Date() today. toLocaleString('it-IT', { month: 'long' })


        // var date = new Date(curTime),
        // mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        // day = ("0" + date.getDate()).slice(-2);
        // let presentdate =  [date.getFullYear(), mnth, day].join("-");
        // console.log(presentdate);
        //date1 = new Date ( "January 6, 2013" );
        // date = date1.getDate();
        // year = date1.getFullYear();
        // month = date1.getMonth();
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

  makeCompleted(e, id) {
    let allTasks = [];
    Object.values(this.props.tasks).map(item => {
      if (item.id === id) {
        item.Duedate = "Task completed"
        item.taskCompleted = !item.taskCompleted
        item.status = 2
      }
      allTasks.push(item);
    })
    this.props.updateTasks(allTasks, 0)
  }

  render() {
    const { tasks, taskTypes, typeFilter, statusFilter, allTypes, Statuses } = this.state
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
                value={typeFilter}
                onChange={e => this.handleStatusSelection(e)} >
                <option>Status : All</option>
                {Object.values(Statuses).map(Item => <option value={Item.id}>{Item.name}</option>)}
            </reactbootstrap.FormControl>
          </div>
          <div style={{ width: '20%', float: 'right', marginbottom: '15px',border: '0px' }}>
            <reactbootstrap.FormControl as="select" name="statusFilter"
                className="input_sw"
                value={statusFilter}
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
                  <tr style={{ textAlign: 'center', border: '2px solid black' }} onClick = {e => this.props.editTask(e, item.id)}>
                     <td>{item.name} {"(Due in )"} { item.Duedate === "Task completed" ? "Task completed" : this.convert(item.Duedate) }</td>
                     <td>
                       <Form.Check
                           onChange={e => this.makeCompleted(e, item.id)}
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
