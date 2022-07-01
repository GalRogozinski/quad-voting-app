import React from "react"

import { Button, Dialog, TextField } from "@mui/material"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useForm, Controller } from "react-hook-form"

export default function SignupModal({
  isOpen = false,
  onSubmit,
  onCancel,
  pollName,
  pollID,
  pollAddress,
  sk,
  pk,
}: {
  isOpen: boolean
  onSubmit: (data: any) => void
  onCancel: () => void
  pollName: string
  pollID: number
  pollAddress: string
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
      <Dialog open={isOpen} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Sign Up To Vote on Poll {pollID}</DialogTitle>
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
                required
                value={pollName}
                label="Poll Name"
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
                required
                value={pollID}
                label="Poll ID"
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
                value={pollAddress}
                fullWidth
                required
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
                value={sk}
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
                value={pk}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              reset()
              onCancel()
            }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cancel
          </Button>
          <Button
            name="Register"
            onClick={handleSubmit(onSubmit)}
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
