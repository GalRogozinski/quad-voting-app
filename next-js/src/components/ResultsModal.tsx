import React from "react"

import { Button, Dialog, TextField } from "@mui/material"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { verifyClient } from "@verifyClient"


import { Poll, SignUpOps } from "@models/poll"

export default function ResultsModal({
  isOpen,
  handleClose,
  poll,
  
}: {
  isOpen: boolean
  handleClose: () => void
  poll: Poll
}) 
{
  return (
    <div className="popup-box">
      <Dialog
        open={isOpen}
      >
        <DialogTitle>Show results for {poll.poll_name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The following results should be verified.
          </DialogContentText>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Proposal</TableCell>
                  <TableCell align="right">Tally Result</TableCell>
                  {/* <TableCell align="right">Subsidy Result</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {poll.tallyResult?.results?.tally.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {poll.vote_options[index]}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {result}
                    </TableCell>
                    {/* <TableCell align="right">{proposal.tally_result}</TableCell>
                    <TableCell align="right">{proposal.subsidy_result}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose()
            }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Close
          </Button>
          <Button
            name="Verify"
            onClick={() => {
              verifyClient({tally_data: poll.tallyResult, subsidy_data: poll.subsidyResult, maci_address: poll.maciAddress, poll_id: poll.pollID, ppt: poll.pptAddr })
              handleClose()
            }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Verify
          </Button>
          {/* <p>{errors.Verify?.message}</p> */}
        </DialogActions>
      </Dialog>
    </div>
  )
}
