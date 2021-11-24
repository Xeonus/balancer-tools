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
    },
    table: {
        alignItems: "center",
        color: 'white',
      },
      paper: {
        marginTop: theme.spacing(3),
        overflowX: "auto",
        marginBottom: theme.spacing(2),
        margin: "auto"
      },
  }));



export default function DataTable(props) {

    //Init styles
  const classes = useStyles();

//Create data rows for table (using props to forward values to another component)
const rows = createTableDataFromAssetArray(props.assetArray, props.investment);


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell><b>Asset</b></TableCell>
            <TableCell align="right"><b>Value if held</b></TableCell>
            <TableCell align="right"><b>Value with IL</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.assetName}
              </TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(row.valueIfHeld).toFixed(0)} name={row.assetName} decimals={0}/></TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(row.valueWithIL).toFixed(0)} name={row.assetName} decimals={0}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}