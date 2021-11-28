import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTableDataFromAssetArray } from '../../utils/createTableDataFromAssetArray';
import DynamicValueFormatter from '../UI/DynamicValueFormatter';
import { RootRef } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '30ch',
        color: "primary"
      },
      '& .MuiSlider-root': {
        margin: theme.spacing(1),
        width: '30ch',
        color: "primary"
      },
      '& .MuiTableCell-root': {
        color: "#FFFFFF"
      },
    },
    table: {
        alignItems: "center",
        color: '#FFFFFF',
        backgroundColor: "#35384a",
      },
      paper: {
        marginTop: theme.spacing(3),
        overflowX: "auto",
        marginBottom: theme.spacing(2),
        margin: "auto",
      },
  }));



export default function DataTable(props) {

    //Init styles
  const classes = useStyles();

//Create data rows for table (using props to forward values to another component)
const rows = createTableDataFromAssetArray(props.assetArray, props.investment, props.SwapFee);


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Asset</b></TableCell>
            <TableCell align="right"><b>Initial value</b></TableCell>
            <TableCell align="right"><b>Value if held</b></TableCell>
            <TableCell align="right"><b>Value with IL</b></TableCell>
            <TableCell align="right"><b>Value with Fees</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell component="th" scope="row">
                {row.assetName}
              </TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(row.initialValue).toFixed(0)} name={row.assetName} decimals={2}/></TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(row.valueIfHeld).toFixed(0)} name={row.assetName} decimals={2}/></TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(row.valueWithIL).toFixed(0)} name={row.assetName} decimals={2}/></TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(row.valueWithFees).toFixed(0)} name={row.assetName} decimals={2}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}