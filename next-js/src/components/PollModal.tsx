import React from "react"

import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Button, TextField } from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup"

export default function PollModal({
  isOpen = false,
  onSubmit,
}: {
  isOpen: boolean
  onSubmit: () => void
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  return (
    <div className="popup-box">
      <div className="box">
        <title>Poll</title>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Controller
            name="proposal"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                margin="normal"
                fullWidth
                required
                onChange={onChange}
                value={value || ""}
                label="Proposal"
              />
            )}
          />
          <p>{errors.proposal?.message}</p>
          <Controller
            name="expiration"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Poll closing time"
                type="datetime-local"
                value={value || ""}
                onChange={onChange}
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
          <p>{errors.expiration?.message}</p>
          <Controller
            name="option_1"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Option 1"
                value={value || ""}
                onChange={onChange}
              />
            )}
          />
          <p>{errors.option_1?.message}</p>
          <Controller
            name="option_2"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Option 1"
                value={value || ""}
                onChange={onChange}
              />
            )}
          />
          <p>{errors.option_2?.message}</p>
          <Button
            onClick={onClose()}
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
            Submit
          </Button>
        </Box>
      </div>
    </div>
  )
}
