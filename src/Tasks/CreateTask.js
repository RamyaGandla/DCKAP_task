import React, { Component } from 'react';
import * as reactbootstrap from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import { Constants } from '../commonData/Constants';

class CreateTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      taskTypes: Constants.Types,
      type: 0,
      DateTime: null,
      tasks: Constants.Tasks,
      added: false,
      taskId: this.props.taskId,
    }
    this.handleChange = this.handleChange.bind(this);
    this.addtask = this.addtask.bind(this);
    this.creattask = this.creattask.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.editId !== this.props.editId) {
      Object.values(this.props.tasks).map(item => {
        if (Number(item.id) === Number(this.props.editId)) {
          this.setState({
            added: false,
            title: item.name,
            description: item.desciption,
            taskTypes: Constants.Types,
            type: item.type,
            DateTime: item.Duedate,
          })
          localStorage.removeItem("editId");
        }
      })
    }
  }

  creattask(e) {
    this.setState({
      added: false,
      title: '',
      description: '',
      taskTypes: Constants.Types,
      type: 0,
      DateTime: null,
      taskId: null  ,
    })
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value,
      added: false,
    })
  }

  addtask(e) {
    this.setState({
      added: true,
    })
    if (this.state.title !== ' ' && this.state.DateTime !== null) {
      let newTask = {
        "id": localStorage.getItem('count') + 1,
        "name": this.state.title,
        "desciption": this.state.description,
        "type": this.state.type,
        "Duedate": this.state.DateTime,
        "taskCompleted": 0,
        "status": 0,
      }
      let allTasks = [];
      Object.values(this.props.tasks).map(item => {
        allTasks.push(item);
      })
      allTasks.push(newTask)
      this.props.updateTasks(allTasks)
      this.setState({
        added: false,
        title: '',
        description: '',
        taskTypes: Constants.Types,
        type: 0,
        DateTime: null,
      })
    }
  }

  handleDateChange(date) {
    this.setState({
      DateTime: date,
    })
  }

  render() {
    const { title, description, type, taskTypes, DateTime, added } = this.state
    return(
      <reactbootstrap.Container className="pt-5 px-0">
        <div style={{ color: '#EC661C', fontSize: '20px'}} >
            <span><h4>{'Create task'}</h4></span>
            <reactbootstrap.Button style={{ backgroundColor: '#EC661C',borderColor: "black", marginBottom: '15px'}} type="button" onClick={e => this.creattask(e)}>
                  {'New'}
            </reactbootstrap.Button>
        </div>
        <reactbootstrap.Form style={{ width: '600px', height: '200px'}}>
           <reactbootstrap.FormGroup>
             <div style={{ marginbottom: '15px',border: '0px' }}>
               <label style={{ color: '#EC661C', fontSize: '14px' }}>{'Title'}<span style={{ color: 'red' }}> * </span></label>
               <input
                 name="title"
                 value={title}
                 type="text"
                 style={{ marginBottom: '15px', width: '250px', borderColor: "black", borderWidth: '3px'}}
                 placeholder={"Task title"}
                 onChange={this.handleChange}
                 autoComplete="off" />
             </div>
             {added === true && title === '' &&
               <div style={{ color: 'red', fontSize: '15px' }}>{"Title field is required"}</div>
             }
           </reactbootstrap.FormGroup>
           <reactbootstrap.FormGroup>
             <div style={{ marginbottom: '15px',border: '0px' }}>
               <label style={{ color: '#EC661C', fontSize: '14px' }}>{'Description'}</label>
               <input
                 name="description"
                 value={description}
                 type="textarea"
                 style={{ marginBottom: '15px', width: '250px', borderColor: "black", borderWidth: '3px'}}
                 placeholder={"Description"}
                 onChange={this.handleChange}
                 autoComplete="off" />
             </div>
           </reactbootstrap.FormGroup>
           <reactbootstrap.FormGroup>
             <div style={{ marginbottom: '15px',border: '0px' }}>
               <label style={{ color: '#EC661C', fontSize: '14px' }}>{'Type'}<span style={{ color: 'red' }}> * </span></label>
                   <reactbootstrap.FormControl as="select" name="type"
                       className="input_sw"
                       value={type}
                       onChange={this.handleChange} >
                       <option>Select type</option>
                       {Object.values(taskTypes).map(taskType => <option value={taskType.id}>{taskType.name}</option>)}
                   </reactbootstrap.FormControl>
             </div>
           </reactbootstrap.FormGroup>
           <reactbootstrap.FormGroup>
             <div style={{ marginbottom: '15px',border: '0px' }}>
               <label style={{ color: '#EC661C', fontSize: '14px' }}>{'Due at'}<span style={{ color: 'red' }}> * </span></label>
                 <DateTimePicker
                   onChange={e => this.handleDateChange(e)}
                   value={DateTime}
                 />
                 {added === true && DateTime === null &&
                   <div style={{ color: 'red', fontSize: '15px' }}>{"DateTime field is required"}</div>
                 }
             </div>
           </reactbootstrap.FormGroup>
           <div>
             <reactbootstrap.Button style={{ float: 'left', backgroundColor: '#EC661C',borderColor: "black", marginBottom: '25px', marginTop: '25px', width: '80px' }} type="button" onClick={e => this.addtask(e)}>
                   {'Add'}
             </reactbootstrap.Button>
           </div>
         </reactbootstrap.Form>
       </reactbootstrap.Container>
    );
  }
}

export default (CreateTask);
