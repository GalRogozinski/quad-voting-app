import React from "react"

import { Button, Dialog, TextField } from "@mui/material"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useForm } from "react-hook-form"

import { MaciKeyPair, Poll } from "@models/poll"
import { signUpAPI } from "@pages/_app"
import { genKeyPair } from "@utils"

export default function SignupModal({
  poll,
  open,
  handleClose,
}: {
  poll: Poll
  open: boolean
  handleClose: Function
}) {
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const [registerError, setRegisterError] = React.useState("")
  const [maciKeyPair, setMaciKeyPair] = React.useState(genKeyPair())


  function onSubmit() {
    signUpAPI(
      { ivcp_data: "", sg_data: "", pub_key: maciKeyPair.pk },
      (res) => {
        handleClose()
        alert("state index is " + res.data.stateID + " Please save it!")
        window.localStorage.setItem("stateIndex" + poll.pollID, res.data.stateID)
        window.localStorage.setItem("maciPK" + poll.pollID, maciKeyPair.pk)
        window.localStorage.setItem("maciSK" + poll.pollID, maciKeyPair.sk)
      },
      (err) => {
        console.log(err)
        throw new Error(err.message)
      }
    )
  }


  function closeDialogue() {
    reset()
    handleClose()
    setMaciKeyPair(genKeyPair())
  }

  return (
    <div className="popup-box">
      <Dialog open={open} onSubmit={handleSubmit(() => onSubmit())}>
        <DialogTitle>Sign Up To Vote on Poll {poll.pollID}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You must register before you can vote
          </DialogContentText>
          <TextField
            margin="normal"
            fullWidth
            defaultValue={poll.poll_name}
            label="Poll Name"
            inputProps={{ readOnly: true }}
          />
          <TextField
            margin="normal"
            fullWidth
            defaultValue={poll.pollID}
            label="Poll ID"
            inputProps={{ readOnly: true }}
          />
          <TextField
            margin="normal"
            label="Poll Address"
            defaultValue={poll.pollAddr}
            fullWidth
            inputProps={{ readOnly: true }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Secret Maci Key"
            defaultValue={maciKeyPair.sk}
            inputProps={{ readOnly: true }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Public Maci Key"
            defaultValue={maciKeyPair.pk}
            inputProps={{ readOnly: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              closeDialogue()
            }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cancel
          </Button>
          <Button
            name="Register"
            onClick={handleSubmit(() => {
              onSubmit()
              closeDialogue()
            })}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <p>{errors.Register?.message}</p>
        </DialogActions>
      </Dialog>
    </div>
  )
}