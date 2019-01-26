import React from 'react';
import Label from '../atoms/Label';
import DatePicker from '../atoms/DatePicker';
import styled from 'styled-components';

class DatePickerWithLabel extends React.Component {
  state = { showPicker : false }

  handleClick = () => {
    this.setState({ showPicker: !this.state.showPicker});
  }

  render() {
    return (
      <div>
        <Label onClick={this.handleClick}>のんだ日: {this.props.value} </Label>
        { this.state.showPicker && 
          <Wrapper>
            <DatePicker handleDateClick={this.props.onChange}/>
          </Wrapper>
        }
      </div>
    );
  }
}

const Wrapper = styled.div`
  text-align: center;
`;


export default DatePickerWithLabel;
