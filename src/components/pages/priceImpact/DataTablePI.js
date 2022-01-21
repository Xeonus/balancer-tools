import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createTableDataFromAssetArrayPI } from '../../../utils/createTableDataFromAssetArrayPI'
import DynamicValueFormatter from '../../UI/DynamicValueFormatter';

//TODO: Global style, remove
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
        color: '#272936',
        overflow: 'auto',
      },
      darkTable: {
        alignItems: "center",
        color: '#FFFFFF',
        overflow: 'auto',
      },
      paper: {
        marginTop: theme.spacing(3),
        overflowX: "auto",
        marginBottom: theme.spacing(2),
        margin: "auto",
      },
  }));



export default function DataTablePI(props) {

    //Init styles
  const classes = useStyles();

//Create data rows for table (using props to forward values to another component)
const data = createTableDataFromAssetArrayPI(props.assetArray, props.sellToken, props.sellTokenQuantity, props.buyToken, props.SwapFee);


  return (
    <TableContainer>
      <Table className={props.darkState ? classes.darkTable : classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell><b>Asset Pair</b></TableCell>
            <TableCell align="right"><b>Spot Price</b></TableCell>
            <TableCell align="right"><b>Effective Price</b></TableCell>
            <TableCell align="right"><b>Quantity without Impact</b></TableCell>
            <TableCell align="right"><b>Quantity with Impact</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data) => (
            <TableRow
            key={ Math.random().toString(36).substring(2, 9) }
              sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
            >
              <TableCell component="th" scope="row">
                {data.tokenPair}
              </TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(data.spotPrice).toFixed(0)} decimals={2}/></TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(data.effectivePrice).toFixed(0)} decimals={2}/></TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(data.tokensWithoutPI).toFixed(0)} decimals={2}/></TableCell>
              <TableCell align="right"><DynamicValueFormatter value={Number(data.tokensWithPI).toFixed(0)} decimals={2}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
