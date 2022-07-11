import React from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import { Button, Dialog, TextField, Select, MenuItem } from "@mui/material"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import {
  genRandomSalt,
  stringifyBigInts,
  unstringifyBigInts,
} from "maci-crypto"
import { Command } from "maci-domainobjs"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"

import { Poll, PublishOps } from "@models/poll"
import { publishAPI } from "@pages/_app"

export default function VoteModal({
  poll,
  isOpen,
  handleClose,
}: {
  poll: Poll
  isOpen: boolean
  handleClose: Function
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

  const getNonce = () => {
    const lastNonce: number = Number(window.localStorage.getItem("lastNonce"))
    if (lastNonce) {
      return lastNonce + 1
    }
    return 1
  }

  const generateSalt = () => {
    return stringifyBigInts(genRandomSalt())
  }

  const onSubmit = (data: any) => {
    console.log("vote")
    console.log(data)
    const command: Command = new Command(
      data.stateIndex,
      data.pubKey,
      data.voteOptionIndex,
      BigInt(1),
      data.nonce,
      BigInt(poll.pollID),
      unstringifyBigInts(data.salt)
    )
    const signature = command.sign(data.privKey)
    const publishOps: PublishOps = {
      pollID: poll.pollID,
      maciAddress: poll.maciAddress,
      nonce: data.nonce,
      salt: data.salt,
      stateID: data.stateID,
      voteOptionIndex: data.voteOptionIndex,
      pubKey: data.pubKey,
      privKey: data.privKey,
      newVoteWeight: 1, //TODO: find how to assignt this value
      newPubkey: data.newPubkey,
      SignatureR8: stringifyBigInts(signature.R8).join(),
      SignatureS: stringifyBigInts(signature.S),
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
      <Dialog open={isOpen} onSubmit={handleSubmit((data) => onSubmit(data))}>
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
                defaultValue={poll.expirationDate}
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
          <p>{errors.expiration?.message}</p>
          <Controller
            name="pubKey"
            control={control}
            render={({ field: { value } }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Public Maci Key"
                defaultValue={window.localStorage.getItem("maciPK")}
              />
            )}
          />
          <p>{errors.pubKey?.message}</p>
          <Controller
            name="privKey"
            control={control}
            render={({ field: { value } }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Public Maci Key"
                defaultValue={window.localStorage.getItem("maciSK")}
              />
            )}
          />
          <p>{errors.privKey.message}</p>
          <Controller
            name="privkey"
            control={control}
            render={({ field: { value } }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Public Maci Key"
                defaultValue={window.localStorage.getItem("maciSK")}
              />
            )}
          />
          <p>{errors.privkey?.message}</p>
          <Controller
            name="stateIndex"
            control={control}
            render={({ field: { value } }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="State Index"
                defaultValue={window.localStorage.getItem("stateIndex")}
              />
            )}
          />
          <p>{errors.stateIndex?.message}</p>
          <Controller
            name="nonce"
            control={control}
            render={({ field: { value } }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Nonce"
                defaultValue={getNonce()}
              />
            )}
          />
          <p>{errors.Nonce?.message}</p>
          <Controller
            name="salt"
            control={control}
            render={({ field: { value } }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Salt"
                defaultValue={generateSalt()}
              />
            )}
          />
          <p>{errors.salt?.message}</p>
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
              handleClose()
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
