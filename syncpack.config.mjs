// @ts-check

/** @type {import("syncpack").RcFile} */
const config = {
  versionGroups: [
    {
      label: "Use workspace protocol for local packages",
      dependencies: ["@repo/*"],
      dependencyTypes: ["dev", "prod"],
      pinVersion: "workspace:*",
    },
  ],
  semverGroups: [
    {
      label: "Use exact versions (no ^ or ~)",
      dependencies: ["**"],
      dependencyTypes: ["dev", "prod"],
      range: "",
    },
  ],
  sortFirst: ["name", "version", "private", "type", "scripts", "dependencies", "devDependencies"],
};

export default config;
