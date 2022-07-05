import React from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Dialog, TextField, Select, MenuItem } from "@mui/material"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"

import { Poll, PublishOps } from "@models/poll"
import { publishAPI } from "@pages/_app"

export default function VoteModal({ poll }: { poll: Poll }) {
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

  const onSubmit = (data: any) => {
    console.log("vote")
    console.log(data)
    const publishOps: PublishOps = {
      pollID: poll.pollID,
      maciAddress: poll.maciAddress,
      nonce: data.nonce,
      salt: data.salt,
      stateID: data.stateID,
      voteOptionIndex: data.voteOptionIndex,
      pubKey: data.pubKey,
      privKey: data.privKey,
      newPubkey: data.newPubkey,
    }

    publishAPI(
      publishOps,
      (res) => {
        alert(res.data.receipt)
      },
      (err) => {
        console.error(err)
        throw new Error(err.message)
      }
    )
  }

  return (
    <div className="popup-box">
      <Dialog
        open={poll.openVoteModal}
        onSubmit={handleSubmit((data) => onSubmit(data))}
      >
        <DialogTitle>{poll.poll_name}</DialogTitle>
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
                  <MenuItem value={option} key={index}>
                    {option}
                  </MenuItem>
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
              poll.openVoteModal = false
            }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit((data) => onSubmit(data))}
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
