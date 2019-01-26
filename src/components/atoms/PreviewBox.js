import React from 'react';
import styled from 'styled-components';
import DeleteButton from './DeleteButton';

const PreviewBoxComponent = props => {
  if (props.src) {
    return(
      <PreviewWrapper>
        <PreviewBox src={props.src}>
        </PreviewBox>
        <DeleteImageButton 
          className="delete"
          onClick={props.handleDeleteFile}
        />
      </PreviewWrapper>
    );
  }   

  return (
    <InputLabel>
      <span>アップロードする</span>
      <InputFile  
        type="file" 
        onChange={props.handleChangeFile}/>
    </InputLabel>
  );

};

const PreviewBox = styled.img`
  border: 1px dashed;
`;

const InputFile = styled.input`
  display: none;
`;

const InputLabel = styled.label`
`;

const PreviewWrapper = styled.div`
  position: relative;
`;

const DeleteImageButton = styled(DeleteButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`;


export default PreviewBoxComponent;
