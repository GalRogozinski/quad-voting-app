declare module 'maci-contracts' {
    export function getDefaultSigner(): Promise<any>;
    export function parseArtifact(name: string): any[];
}