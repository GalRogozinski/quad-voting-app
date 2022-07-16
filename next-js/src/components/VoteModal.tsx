import React from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import { Poll, PublishOps } from "@models/poll"
import { Button, Dialog, TextField, Select, MenuItem } from "@mui/material"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { publishAPI } from "@pages/_app"
import {
  genRandomSalt,
  stringifyBigInts,
  unstringifyBigInts,
} from "maci-crypto"
import { Command, PubKey } from "maci-domainobjs"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"

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
      // proposal: yup.string().required(),
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


  function getNonce() : number {
    const lastNonce: number = Number(window.localStorage.getItem("lastNonce"))
    if (lastNonce) {
      return lastNonce + 1
    }
    return 1
  }

  const generateSalt = () => {
    return stringifyBigInts(genRandomSalt())
  }

  const [expirationDate, setExpirationDate] = React.useState(
    poll.expirationDate
  )

  const [pubKey, setPubKey] = React.useState(
    null
  )
  const [privKey, setPrivKey] = React.useState(
    null
  )
  const [stateIndex, setStateIndex] = React.useState(
    null
  )
  const [nonce, setNonce] = React.useState(null)
  const [salt, setSalt] = React.useState(generateSalt())

  const onSubmit = (data: any) => {
    console.log("vote")
    console.log(data)
    const command: Command = new Command(
      BigInt(Number.parseInt(stateIndex ?? "")),
      PubKey.unserialize(pubKey ?? ""),
      BigInt(data.voteOptionIndex),
      BigInt(1),
      BigInt(nonce ?? 0),
      BigInt(poll.pollID),
      unstringifyBigInts(salt)
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
      signatureR8: stringifyBigInts(signature.R8).join(),
      signatureS: stringifyBigInts(signature.S),
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
                onChange={() => setPubKey(value)}
                value={pubKey ?? window.localStorage.getItem("maciPK" + poll.pollID) ?? ""}
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
                label="Private Maci Key"
                onChange={() => setPrivKey(value)}
                value={privKey ?? window.localStorage.getItem("maciSK" + poll.pollID) ?? ""}
              />
            )}
          />
          <p>{errors.privKey?.message}</p>
          <Controller
            name="stateIndex"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="State Index"
                onChange={() => setStateIndex(value)}
                value={stateIndex ?? window.localStorage.getItem("stateIndex" + poll.pollID) ?? 0}
              />
            )}
          />
          <p>{errors.stateIndex?.message}</p>
          <Controller
            name="nonce"
            control={control}
            render={({ field: {onChange, value } }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Nonce"
                onChange={() => setNonce(value)}
                value={nonce ?? getNonce()}
              />
            )}
          />
          <p>{errors.Nonce?.message}</p>
          <Controller
            name="salt"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Salt"
                onChange={onChange}
                value={salt}
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
            onClick={handleSubmit(
              (data) => {
                onSubmit(data)
                reset()
                handleClose()
              },
              (err) => {
                console.error(err)
                throw new Error(err.message)
              }
            )}
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
