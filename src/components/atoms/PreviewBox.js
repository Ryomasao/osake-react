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
    <div className="file is-boxed">
      <label className="file-label" style={{margin: '0 auto'}}>
        <input 
          className="file-input" 
          type="file" 
          onChange={props.handleChangeFile}
        />
        <span className="file-cta">
          <span className="file-icon">
            <i className="fas fa-upload"></i>
          </span>
          <span className="file-label">
            しゃしんをせんたくする
          </span>
        </span>
      </label>
    </div>
  );

};

const PreviewBox = styled.img`
  border: 1px dashed;
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
