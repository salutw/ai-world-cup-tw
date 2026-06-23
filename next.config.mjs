/** @type {import('next').NextConfig} */
const isGithubPagesBuild = process.env.DEPLOY_TARGET === "github-pages";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserOrOrgPagesSite = repositoryName.endsWith(".github.io");
const githubPagesBasePath = isGithubPagesBuild && repositoryName && !isUserOrOrgPagesSite ? `/${repositoryName}` : "";

const nextConfig = {
  poweredByHeader: false,
  ...(isGithubPagesBuild
    ? {
        output: "export",
        trailingSlash: true,
        basePath: githubPagesBasePath,
        assetPrefix: githubPagesBasePath ? `${githubPagesBasePath}/` : undefined,
        images: {
          unoptimized: true
        }
      }
    : {})
};

export default nextConfig;
