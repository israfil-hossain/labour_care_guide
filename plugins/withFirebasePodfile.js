const { withPodfile } = require('expo/config-plugins');

const withFirebasePodfile = (config) => {
  return withPodfile(config, (config) => {
    const podfileContent = config.modResults.contents;

    // Add build settings to allow non-modular includes
    // This fixes Firebase compatibility with Expo SDK 54 / RN 0.81
    const buildSettingsCode = `
    # Firebase compatibility fix for Expo SDK 54
    installer.pods_project.build_configurations.each do |config|
      config.build_settings["CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES"] = "YES"
    end
  `;

    // Find the post_install hook and add our build settings
    if (podfileContent.includes('post_install do |installer|')) {
      // Insert before the end of the post_install block
      const postInstallRegex = /(post_install do \|installer\|[\s\S]*?)(^\s*end\s*$)/m;

      if (podfileContent.match(postInstallRegex)) {
        config.modResults.contents = podfileContent.replace(
          postInstallRegex,
          `$1${buildSettingsCode}\n$2`
        );
      }
    }

    return config;
  });
};

module.exports = withFirebasePodfile;
