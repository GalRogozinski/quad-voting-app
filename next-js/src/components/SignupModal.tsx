import React from "react"

import { Button, Dialog, TextField } from "@mui/material"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useForm } from "react-hook-form"

import { Poll } from "@models/poll"
import { signUpAPI } from "@pages/_app"

export default function SignupModal({
  poll,
  sk,
  pk,
}: {
  poll: Poll
  sk: string
  pk: string
}) {
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const [registerError, setRegisterError] = React.useState("")

  function onSubmit() {
    signUpAPI(
      { ivcp_data: "", sg_data: "", pub_key: pk },
      (res) => {
        handleClose()
        alert("state index is " + res.data.stateID + " Please save it!")
        window.localStorage.setItem("StateIndex", res.data.stateID)
      },
      (err) => {
        console.log(err)
        throw new Error(err.message)
      }
    )
  }

  const handleClose = () => {
    poll.openSignUpModal = false
  }

  return (
    <div className="popup-box">
      <Dialog
        open={poll.openSignUpModal}
        onSubmit={handleSubmit(() => onSubmit())}
      >
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
            defaultValue={sk}
            inputProps={{ readOnly: true }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Public Maci Key"
            defaultValue={pk}
            inputProps={{ readOnly: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              reset()
              handleClose()
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
