import { IgnitionValidationError } from "../../../errors";
import { isArtifactType } from "../../../type-guards";
import { ArtifactResolver } from "../../../types/artifact";
import { ContractCallFuture } from "../../../types/module";
import {
  validateArtifactFunction,
  validateArtifactFunctionName,
} from "../../execution/abi";

export async function validateNamedContractCall(
  future: ContractCallFuture<string, string>,
  artifactLoader: ArtifactResolver
) {
  const artifact =
    "artifact" in future.contract
      ? future.contract.artifact
      : await artifactLoader.loadArtifact(future.contract.contractName);

  if (!isArtifactType(artifact)) {
    throw new IgnitionValidationError(
      `Artifact for contract '${future.contract.contractName}' is invalid`
    );
  }

  validateArtifactFunctionName(artifact, future.functionName);

  validateArtifactFunction(
    artifact,
    future.contract.contractName,
    future.functionName,
    future.args,
    false
  );
}
