import { EphemeralDeploymentLoader } from "./internal/deployment-loader/ephemeral-deployment-loader";
import { FileDeploymentLoader } from "./internal/deployment-loader/file-deployment-loader";
import { Wiper } from "./internal/wiper";
import { ArtifactResolver } from "./types/artifact";

/**
 * Clear the state against a future within a deployment
 *
 * @param deploymentDir - the file directory of the deployment
 * @param futureId - the future to be cleared
 *
 * @beta
 */
export async function wipe(
  deploymentDir: string,
  artifactResolver: ArtifactResolver,
  futureId: string
) {
  const deploymentLoader =
    deploymentDir !== undefined
      ? new FileDeploymentLoader(deploymentDir, false)
      : new EphemeralDeploymentLoader(artifactResolver, false);

  const wiper = new Wiper(deploymentLoader);

  return wiper.wipe(futureId);
}
