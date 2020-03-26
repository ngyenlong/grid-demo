

import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { AutoSizer, Grid, ScrollSync, MultiGrid  } from 'react-virtualized';
import 'react-virtualized/styles.css';
import Cell from '../cell';

const STYLE = {
  border: '1px solid #ddd',
};
const STYLE_BOTTOM_LEFT_GRID = {
  borderRight: '2px solid #aaa',
  backgroundColor: '#f7f7f7',
};
const STYLE_TOP_LEFT_GRID = {
  borderBottom: '2px solid #aaa',
  borderRight: '2px solid #aaa',
  fontWeight: 'bold',
};
const STYLE_TOP_RIGHT_GRID = {
  borderBottom: '2px solid #aaa',
  fontWeight: 'bold',
};
class MultipleGridExample extends React.PureComponent {
    constructor(props, context) {
    super(props, context);

    this.state = {
      fixedColumnCount: 1,
      fixedRowCount: 1,
      selected: [],
      cellStatus: '',
      columns: 1000,
      rows: 1000000,
      rowHeight: 40,
      colWidth: 100,
      height: this._getWindowDimensions().height - 40,
    }
  }

  render() {
    const {classes} = this.props;
    const {columns, rows, rowHeight, colWidth, height} = this.state;
    return (
     <div className={classes.ContentBox}>
        <AutoSizer disableHeight>
          {({width}) => (
            <MultiGrid
              {...this.state}
              cellRenderer={this._cellRenderer}
              columnWidth={colWidth}
              columnCount={columns}
              overscanColumnCount={0}
              overscanRowCount={0}
              enableFixedColumnScroll
              enableFixedRowScroll
              height={height}
              rowHeight={rowHeight}
              rowCount={rows}
              style={STYLE}
              styleBottomLeftGrid={STYLE_BOTTOM_LEFT_GRID}
              styleTopLeftGrid={STYLE_TOP_LEFT_GRID}
              styleTopRightGrid={STYLE_TOP_RIGHT_GRID}
              width={width}
              hideTopRightGridScrollbar
              hideBottomLeftGridScrollbar
            />
           
          )}
        </AutoSizer>
      </div>
    );
  }

  _cellRenderer = ({columnIndex, key, rowIndex, style}) => {
    const {classes} = this.props;
    const {selected} = this.state;

    //Empty content body
    let element = ` ${columnIndex}, ${rowIndex}`;
    if(columnIndex > 0 && rowIndex > 0) {
      element = '';
    }

    return (
      <Cell  
      isSelected={!!(selected && selected.length > 0 && selected[0].columnIndex === columnIndex && selected[0].rowIndex === rowIndex)}
      isDrapped={!!(selected.filter(c => c.columnIndex === columnIndex && c.rowIndex === rowIndex)[0])}
      key={key}
      style={style}
      onMouseDown={event => this.onMouseDown({columnIndex, rowIndex})} 
      onMouseOver={event => this.onMouseOver({columnIndex, rowIndex})} 
      onMouseUp={event => this.onMouseUp({columnIndex, rowIndex})}>
       <span>{element}</span> 
      </Cell>
    );
  }

  onMouseDown = event => {
    const {cellStatus, selected} = this.state;
    this.setState({cellStatus: 'down', selected: [event]})
  }

  onMouseOver = event => {
    const {cellStatus, selected} = this.state;
    if(cellStatus === 'down' || cellStatus === 'over') {
      this.setState({cellStatus: 'over', selected: [...selected, event]})
    }
  
  }

  onMouseUp = event => {
    this.setState({cellStatus: 'up'}, () => this._createRange());
  }

  _createRange (){
    const {selected} = this.state;
    let columnRange = this._findMinMax(selected, 'columnIndex');
    let rowRange = this._findMinMax(selected, 'rowIndex');
    if(columnRange.range > 0 && rowRange.range > 0 ) {
      let rangeRendering = [];
      for (let indexCol = columnRange.min; indexCol <= columnRange.max; indexCol++) {
        for (let indexRow = rowRange.min; indexRow <= rowRange.max; indexRow++) {
          rangeRendering.push({columnIndex: indexCol, rowIndex: indexRow});
        }
      }
      rangeRendering && rangeRendering.length > 0 && this.setState({selected: rangeRendering})
    }
  }

  _getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height
      };
    }

  _getColumnWidth({index}) {
    switch (index) {
      case 0:
        return 50;
      default:
        return 100;
    }
  }

  _findMinMax(arr, name) {
    let min = arr[0][name], max = arr[0][name];
  
    for (let i = 1, len=arr.length; i < len; i++) {
      let v = arr[i][name];
      min = (v < min) ? v : min;
      max = (v > max) ? v : max;
    }
  
    return {min: min, max: max, range: max-min};
  }
}

const styles = theme => ({
  ContentBox :{
  flex:' 1 0 auto',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#FFF',
  padding: '0 1rem 1rem 1rem',
  overflow: 'auto',
  background: 'white',
},

 GridRow: {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
},
LeftSideGridContainer:{
   flex: '0 0 75px',
  zIndex: 10
},
LeftSideGrid: {
  overflow: 'hidden !important'
},
HeaderGrid: {
  width: '100%',
  overflow: 'hidden !important'
},
GridColumn: {
  display: 'flex',
  flexDirection: 'column',
  flex: '1 1 auto',
},
BodyGrid: {
  width: '100%'
},
Cell :{
  width: '100%',
  height: '100%',
  display: 'flex',
  // flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  // padding: '0 .5em',
  color: 'gray',
   border: 'solid 1px #e6e6e6'  ,
   '&.cell-selected' : {
     border: 'solid 2px #1a73e8'
   },
   '&.cell-drapped' : {
    background: 'rgba(0, 0, 255, 0.3)'
  }
},
 border: {
  border: '1px solid #ddd',
 },
 bottomLeftGrid : {
  borderRight: '2px solid #aaa',
  backgroundColor: '#f7f7f7',
},
topLeftGrid:{
   borderBottom: '2px solid #aaa',
  borderRight: '2px solid #aaa',
  fontWeight: 'bold',
},
topRightGrid: {
   borderBottom: '2px solid #aaa',
  fontWeight: 'bold',
},
});
export default withStyles(styles)(MultipleGridExample);
