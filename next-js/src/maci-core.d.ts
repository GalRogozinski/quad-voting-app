declare module 'maci-core' {
    const genTallyResultCommitment = (
        results: BigInt[],
        salt: BigInt,
        depth: number,
    ): BigInt
}