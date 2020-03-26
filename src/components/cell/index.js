import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
const useStyles = makeStyles(theme => ({
  cell: {
      width: '100%',
	  height: '100%',
	  display: 'flex',
	  // flexDirection: 'column',
	  justifyContent: 'center',
	  alignItems: 'center',
	  textAlign: 'center',
	  // padding: '0 .5em',
	  color: 'gray',
	   border: 'solid 1px #e6e6e6' ,
	    '&.cell-selected' : {
     border: 'solid 2px #1a73e8'
	   },
	   '&.cell-drapped' : {
	    background: 'rgba(0, 0, 255, 0.3)'
	  } 
  },
}));

function Cell(props) {
  	const {style,isSelected,isDrapped, onMouseDown, onMouseOver, onMouseUp, children} = props;
   const classes = useStyles();
    var className = '';
     isSelected && (className += ' cell-selected');
      isDrapped && (className += ' cell-drapped');
  	return (
     <div 
      onMouseDown={onMouseDown} 
      onMouseOver={onMouseOver} 
      onMouseUp={onMouseUp} 
      className={clsx(classes.cell, className)}  style={style}>
        {children}
  	</div>
  );
}

export default Cell;