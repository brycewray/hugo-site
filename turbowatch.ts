// Based on:
// - https://github.com/chriscoyier/simple-lightning-css-setup/blob/main/turbowatch.ts
// - https://frontendmasters.com/blog/fine-ill-use-a-super-basic-css-processing-setup/

import { defineConfig } from "turbowatch";

export default defineConfig({
  project: __dirname,
  triggers: [
    {
      expression: ["match", "*.css", "basename"],
      name: "build",
      onChange: async ({ spawn }) => {
        await spawn`lightningcss --bundle --targets \"$npm_package_config_targets\" assets/css/*.css --output-dir assets/lcss`;
      },
    },
  ],
});
