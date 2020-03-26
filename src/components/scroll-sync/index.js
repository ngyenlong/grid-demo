

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import { AutoSizer, Grid, ScrollSync  } from 'react-virtualized';

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
   border: 'solid 1px #e6e6e6'  
}
});

class ScrollSyncExample extends React.PureComponent {
    constructor(props, context) {
    super(props, context);

    this.state = {
      columnWidth: 100,
      columnCount: 1000,
      height: this._getWindowDimensions().height  - 80,
      overscanColumnCount: 0,
      overscanRowCount: 5,
      rowHeight: 40,
      rowCount: 1000000,
    };
    this._renderBodyCell = this._renderBodyCell.bind(this);
    this._renderHeaderCell = this._renderHeaderCell.bind(this);
    this._renderLeftSideCell = this._renderLeftSideCell.bind(this);
  }

  render() {
     const {
      columnCount,
      columnWidth,
      height,
      overscanColumnCount,
      overscanRowCount,
      rowHeight,
      rowCount,
    } = this.state;
    const {classes} = this.props;
    return (
      <div className={classes.ContentBox}>
      <ScrollSync>
          {({
            clientHeight,
            clientWidth,
            onScroll,
            scrollHeight,
            scrollLeft,
            scrollTop,
            scrollWidth,
          }) => {
            return (
              <div className={classes.GridRow}>
                <div
                  className={classes.LeftSideGridContainer}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    backgroundColor: 'gray',
                  }}>
                  <Grid
                    cellRenderer={this._renderLeftHeaderCell}
                    className={classes.HeaderGrid}
                    width={columnWidth}
                    height={rowHeight}
                    rowHeight={rowHeight}
                    columnWidth={columnWidth}
                    rowCount={1}
                    columnCount={1}
                  />
                </div>
                <div
                  className={classes.LeftSideGridContainer}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: rowHeight,
                    color: 'gray',
                    backgroundColor: 'white',
                  }}>
                  <Grid
                    overscanColumnCount={overscanColumnCount}
                    overscanRowCount={overscanRowCount}
                    cellRenderer={this._renderLeftSideCell}
                    columnWidth={columnWidth}
                    columnCount={1}
                    className={classes.LeftSideGrid}
                    height={height - 18}
                    rowHeight={rowHeight}
                    rowCount={rowCount}
                    scrollTop={scrollTop}
                    width={columnWidth}
                  />
                </div>
                <div className={classes.GridColumn}>
                  <AutoSizer disableHeight>
                    {({width}) => (
                      <div>
                        <div
                          style={{
                            backgroundColor: 'gray',
                            height: rowHeight,
                            width: width,
                          }}>
                          <Grid
                            className={classes.HeaderGrid}
                            columnWidth={columnWidth}
                            columnCount={columnCount}
                            height={rowHeight}
                            overscanColumnCount={overscanColumnCount}
                            cellRenderer={this._renderHeaderCell}
                            rowHeight={rowHeight}
                            rowCount={1}
                            scrollLeft={scrollLeft}
                            width={width}
                          />
                        </div>
                        <div
                          style={{
                            height,
                            width,
                          }}>
                          <Grid
                            className={classes.BodyGrid}
                            columnWidth={columnWidth}
                            columnCount={columnCount}
                            height={height}
                            onScroll={onScroll}
                            overscanColumnCount={overscanColumnCount}
                            overscanRowCount={overscanRowCount}
                            cellRenderer={this._renderBodyCell}
                            rowHeight={rowHeight}
                            rowCount={rowCount}
                            width={width}
                          />
                        </div>
                      </div>
                    )}
                  </AutoSizer>
                </div>
              </div>
            );
          }}
        </ScrollSync>
        </div>
    );
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
   _renderBodyCell({columnIndex, key, rowIndex, style}) {
    if (columnIndex < 1) {
      return;
    }

    return this._renderLeftSideCell({columnIndex, key, rowIndex, style});
  }

  _renderHeaderCell({columnIndex, key, rowIndex, style}) {
    if (columnIndex < 1) {
      return;
    }

    return this._renderLeftHeaderCell({columnIndex, key, rowIndex, style});
  }

  _renderLeftHeaderCell({columnIndex, key, style}) {
    return (
      <div  key={key} style={style}>
        {`C${columnIndex}`}
      </div>
    );
  }

  _renderLeftSideCell({columnIndex, key, rowIndex, style}) {
    const rowClass =
      rowIndex % 2 === 0
        ? columnIndex % 2 === 0
          ? styles.evenRow
          : styles.oddRow
        : columnIndex % 2 !== 0
        ? styles.evenRow
        : styles.oddRow;
     const {classes} = this.props;
    return (
      <div className={clsx(rowClass, classes.Cell)} key={key} style={style}>
        {columnIndex > 0 ? `R${rowIndex + 1}, C${columnIndex}` : rowIndex + 1}
      </div>
    );
  }

}


export default withStyles(styles)(ScrollSyncExample);
