import React from 'react';
import Label from '../atoms/Label';
import DatePicker from '../atoms/DatePicker';

class DatePickerWithLabel extends React.Component {
  state = { showPicker : false }

  handleClick = () => {
    this.setState({ showPicker: !this.state.showPicker});
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <Label onClick={this.handleClick}>のんだ日: {this.props.value} </Label>
        { this.state.showPicker && 
          <DatePicker handleDateClick={this.props.onChange}/>
        }
      </div>
    );
  }
}

export default DatePickerWithLabel;
