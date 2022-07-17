import { genTallyResultCommitment } from 'maci-core'
import { hash2, hash3 } from 'maci-crypto'
import {getDefaultSigner, parseArtifact} from 'maci-contracts'


// import {contractFilepath} from './config'

import * as ethers from 'ethers'
import {
    validateEthAddress,
    contractExists,
} from 'maci-cli/build/utils'

export type VerifierOpts = {
    tally_data: any;
    subsidy_data: any;
    maci_address: string;
    poll_id: number;
    ppt: string;
}

const verifyClient = async (args: VerifierOpts) => {
    // const signer = await getDefaultSigner()

    const pollId = args.poll_id

    // check existence of MACI and ppt contract addresses
    if (!args.maci_address) {
        console.error('Error: MACI contract address is empty') 
        throw new Error('MACI contract address is empty')
    }
    if (!args.ppt) {
        console.error('Error: PollProcessorAndTally contract address is empty') 
        throw new Error('PollProcessorAndTally contract address is empty')
    }

    const maciAddress = args.maci_address
    const pptAddress = args.ppt

    // MACI contract
    if (!validateEthAddress(maciAddress)) {
        console.error('Error: invalid MACI contract address')
        throw new Error('Invalid MACI contract address')
    }

    // PollProcessorAndTallyer contract
    if (!validateEthAddress(pptAddress)) {
        console.error('Error: invalid PollProcessorAndTallyer contract address')
        throw new Error('Invalid PollProcessorAndTallyer contract address')
    }

    const [ maciContractAbi ] = parseArtifact('MACI')
    const [ pollContractAbi ] = parseArtifact('Poll')
    const [ pptContractAbi ] = parseArtifact('PollProcessorAndTallyer')

    const signer = await getDefaultSigner()

    if (! (await contractExists(signer, pptAddress))) {
        console.error(`Error: there is no contract deployed at ${pptAddress}.`)
        return 1
    }

	const maciContract = new ethers.Contract(
        maciAddress,
        maciContractAbi,
        signer,
    )

    const pollAddr = await maciContract.polls(pollId)
    if (! (await contractExists(signer, pollAddr))) {
        console.error('Error: there is no Poll contract with this poll ID linked to the specified MACI contract.')
        throw new Error('Error: there is no Poll contract with this poll ID linked to the specified MACI')
    }

    const pollContract = new ethers.Contract(
        pollAddr,
        pollContractAbi,
        signer,
    )

    const pptContract = new ethers.Contract(
        pptAddress,
        pptContractAbi,
        signer,
    )

       // ----------------------------------------------
    // verify tally result
    const onChainTallyCommitment = BigInt(await pptContract.tallyCommitment())
    console.log(onChainTallyCommitment.toString(16))

    const tallyData = args.tally_data
    console.log('-------------tally data -------------------')
    console.log(tallyData)
    // Check the results commitment
    let validResultsCommitment =
        tallyData.newTallyCommitment &&
        tallyData.newTallyCommitment.match(/0x[a-fA-F0-9]+/)

    if (!validResultsCommitment) {
        console.error('Error: invalid results commitment format')
        return 0
    }

    const treeDepths = await pollContract.treeDepths()
    const voteOptionTreeDepth = Number(treeDepths.voteOptionTreeDepth)
    const numVoteOptions = 5 ** voteOptionTreeDepth
    const wrongNumVoteOptions = 'Error: wrong number of vote options.'
    // Ensure that the lengths of data.results.tally and
    // data.perVOSpentVoiceCredits.tally are correct
    // Get vote option tree depth
    if (tallyData.results.tally.length !== numVoteOptions) {
        console.error(wrongNumVoteOptions)
        return 1
    }

    if (tallyData.perVOSpentVoiceCredits.tally.length !== numVoteOptions) {
        console.error(wrongNumVoteOptions)
        return 1
    }

    // Verify that the results commitment matches the output of
    // genTallyResultCommitment()

    // Verify the results

    // Compute newResultsCommitment
    const newResultsCommitment = genTallyResultCommitment(
        tallyData.results.tally.map((x: any) => BigInt(x)),
        tallyData.results.salt,
        voteOptionTreeDepth
    )

    // Compute newSpentVoiceCreditsCommitment
    const newSpentVoiceCreditsCommitment = hash2([
        BigInt(tallyData.totalSpentVoiceCredits.spent),
        BigInt(tallyData.totalSpentVoiceCredits.salt),
    ])

    // Compute newPerVOSpentVoiceCreditsCommitment
    const newPerVOSpentVoiceCreditsCommitment = genTallyResultCommitment(
        tallyData.map((x: any) => BigInt(x)),
        tallyData.perVOSpentVoiceCredits.salt,
        voteOptionTreeDepth
    )

    // Compute newTallyCommitment
    const newTallyCommitment = hash3([
        newResultsCommitment,
        newSpentVoiceCreditsCommitment,
        newPerVOSpentVoiceCreditsCommitment,
    ])

    if (onChainTallyCommitment !== newTallyCommitment) {
        console.log('Error: the on-chain tally commitment does not match.')
        throw new Error('Error: the on-chain tally commitment does not match')
    }

    // ----------------------------------------------
    // verify subsidy result

    if (args.subsidy_data) {
        const onChainSubsidyCommitment = BigInt(await pptContract.subsidyCommitment())
        console.log(onChainSubsidyCommitment.toString(16))

      const subsidyData = args.subsidy_data
    
        validResultsCommitment =
            subsidyData.newSubsidyCommitment &&
            subsidyData.newSubsidyCommitment.match(/0x[a-fA-F0-9]+/)
    
        if (!validResultsCommitment) {
            console.error('Error: invalid results commitment format')
            throw new Error('Invalid results commitment format')
        }
    
        if (subsidyData.results.subsidy.length !== numVoteOptions) {
            console.error(wrongNumVoteOptions)
            throw new Error('Invalid results commitment format')
        }
    
        // to compute newSubsidyCommitment, we can use genTallyResultCommitment
        const newSubsidyCommitment = genTallyResultCommitment(
            subsidyData.results.subsidy.map((x: any) => BigInt(x)),
            subsidyData.results.salt,
            voteOptionTreeDepth
        )
    
        if (onChainSubsidyCommitment !== newSubsidyCommitment) {
            console.log('Error: the on-chain subsidy commitment does not match.')
            throw new Error('the on-chain subsidy commitment does not match')
        }
    }

    console.log('OK. finish verify')

    return true
}

export {
    verifyClient,
}
