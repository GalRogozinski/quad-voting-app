import {deployPollApi} from "../quad-voting-maci/cli/build/deployPollApi.js";
import {signUpApi} from "../quad-voting-maci/cli/build/signUpApi.js";
import {redisClient} from "../app.mjs"

import express from "express";
import {MACI_ADDRESS, COO_PRIVATE_KEY} from "../consts.mjs";

import {publishMessageApi} from "../quad-voting-maci/cli/build/publishMessageApi.js";

export let cryptoRouter = express.Router();

