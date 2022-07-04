import React from "react"

import { Button, Dialog, TextField } from "@mui/material"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useForm, Controller } from "react-hook-form"

import { Poll, SignUpOps } from "@models/poll"

export default function SignupModal({
  onSubmit,
  handleClose,
  poll,
  sk,
  pk,
}: {
  onSubmit: (data: SignUpOps) => any
  handleClose: (poll: Poll) => void
  poll: Poll
  sk: string
  pk: string
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const [registerError, setRegisterError] = React.useState("")

  return (
    <div className="popup-box">
      <Dialog
        open={poll.openSignUpModal}
        onSubmit={handleSubmit(
          onSubmit({ ivcpData: "", sgData: "", pubKey: pk })
        )}
      >
        <DialogTitle>Sign Up To Vote on Poll {poll.pollID}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You must register before you can vote
          </DialogContentText>
          <Controller
            name="pollName"
            control={control}
            render={({ field: { value } }) => (
              <TextField
                margin="normal"
                fullWidth
                defaultValue={poll.poll_name}
                label="Poll Name"
                inputProps={{ readOnly: true }}
              />
            )}
          />
          <Controller
            name="pollID"
            control={control}
            render={({ field: { value } }) => (
              <TextField
                margin="normal"
                fullWidth
                defaultValue={poll.pollID}
                label="Poll ID"
                inputProps={{ readOnly: true }}
              />
            )}
          />
          <Controller
            name="pollAddress"
            control={control}
            render={({ field: { value } }) => (
              <TextField
                margin="normal"
                label="Poll Address"
                defaultValue={poll.pollAddr}
                fullWidth
                inputProps={{ readOnly: true }}
              />
            )}
          />
          <Controller
            name="sk"
            control={control}
            render={({ field: { value } }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Secret Maci Key"
                defaultValue={sk}
              />
            )}
          />
          <Controller
            name="pk"
            control={control}
            render={({ field: { value } }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Public Maci Key"
                defaultValue={pk}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              reset()
              handleClose(poll)
            }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cancel
          </Button>
          <Button
            name="Register"
            onClick={handleSubmit(
              onSubmit({ ivcpData: "", sgData: "", pubKey: pk })
            )}
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
