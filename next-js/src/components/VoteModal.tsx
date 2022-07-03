import React from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Dialog, TextField, Select, MenuItem } from "@mui/material"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"

import { Poll } from "@models/poll"

export default function VoteModal({
  isOpen = false,
  poll,
  onSubmit,
  onCancel,
}: {
  isOpen: boolean
  poll: Poll
  onSubmit: (data: any) => void
  onCancel: () => void
}) {
  const schema = yup
    .object({
      proposal: yup.string().required(),
      // expiration: yup.date.apply(),
      // address: yup.string().required(),
    })
    .required()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  return (
    <div className="popup-box">
      <Dialog open={isOpen} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{poll.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>{poll.description}</DialogContentText>
          <Controller
            name="expirationDate"
            control={control}
            render={({ field: { value } }) => (
              <TextField
                label="Poll closing time"
                type="datetime-local"
                value={poll.expirationDate}
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
          <p>{errors.expiration?.message}</p>
          <Controller
            name="options"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                required
                fullWidth
                label="Vote Options"
                value={value || ""}
                onChange={onChange}
              >
                {poll.vote_options.map((option, index) => (
                  <MenuItem value={option} key={index}></MenuItem>
                ))}
              </Select>
            )}
          />
          <p>{errors.options?.message}</p>
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
            onClick={handleSubmit(onSubmit)}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Vote
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
