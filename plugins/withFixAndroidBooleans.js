const { withDangerousMod } = require('expo/config-plugins');
const fs = require('fs');
const path = require('path');

const withFixAndroidBooleans = (config) => {
  return withDangerousMod(config, [
    'android',
    async (config) => {
      console.log('[withFixAndroidBooleans] Running Android boolean fixes...');

      const stringsPath = path.join(
        config.modRequest.platformProjectRoot,
        'app/src/main/res/values/strings.xml'
      );
      const boolsPath = path.join(
        config.modRequest.platformProjectRoot,
        'app/src/main/res/values/bools.xml'
      );
      const integersPath = path.join(
        config.modRequest.platformProjectRoot,
        'app/src/main/res/values/integers.xml'
      );
      const manifestPath = path.join(
        config.modRequest.platformProjectRoot,
        'app/src/main/AndroidManifest.xml'
      );

      // Read and fix strings.xml
      let stringsContent = fs.readFileSync(stringsPath, 'utf-8');

      // Remove the problematic expo_splash_screen_status_bar_translucent string
      const lines = stringsContent.split('\n');
      const filteredLines = lines.filter(line =>
        !line.includes('expo_splash_screen_status_bar_translucent')
      );
      stringsContent = filteredLines.join('\n');

      // Fix any malformed translatable attributes
      stringsContent = stringsContent.replace(/translatable=\{false\}/g, 'translatable="false"');
      stringsContent = stringsContent.replace(/translatable=\{true\}/g, 'translatable="true"');

      fs.writeFileSync(stringsPath, stringsContent);
      console.log('[withFixAndroidBooleans] Fixed strings.xml');

      // Create or update bools.xml with proper boolean resources
      const boolsContent = `<?xml version="1.0" encoding="utf-8"?>
<resources>
  <bool name="expo_updates_enabled">false</bool>
  <bool name="expo_splash_screen_status_bar_translucent">false</bool>
</resources>
`;
      fs.writeFileSync(boolsPath, boolsContent);
      console.log('[withFixAndroidBooleans] Created bools.xml');

      // Create or update integers.xml
      const integersContent = `<?xml version="1.0" encoding="utf-8"?>
<resources>
  <integer name="expo_updates_launch_wait_ms">0</integer>
</resources>
`;
      fs.writeFileSync(integersPath, integersContent);
      console.log('[withFixAndroidBooleans] Created integers.xml');

      // Fix AndroidManifest.xml to use resource references
      if (fs.existsSync(manifestPath)) {
        let manifestContent = fs.readFileSync(manifestPath, 'utf-8');

        // Replace hardcoded boolean values with resource references
        manifestContent = manifestContent.replace(
          /(<meta-data android:name="expo\.modules\.updates\.ENABLED" android:value=")(?:false|true)(")/g,
          '$1@bool/expo_updates_enabled$2'
        );

        // Fix malformed boolean attributes
        manifestContent = manifestContent.replace(/android:exported=\{true\}/g, 'android:exported="true"');
        manifestContent = manifestContent.replace(/android:exported=\{false\}/g, 'android:exported="false"');
        manifestContent = manifestContent.replace(/android:allowBackup=\{true\}/g, 'android:allowBackup="true"');
        manifestContent = manifestContent.replace(/android:allowBackup=\{false\}/g, 'android:allowBackup="false"');
        manifestContent = manifestContent.replace(/android:supportsRtl=\{true\}/g, 'android:supportsRtl="true"');
        manifestContent = manifestContent.replace(/android:supportsRtl=\{false\}/g, 'android:supportsRtl="false"');
        manifestContent = manifestContent.replace(/android:enableOnBackInvokedCallback=\{true\}/g, 'android:enableOnBackInvokedCallback="true"');
        manifestContent = manifestContent.replace(/android:enableOnBackInvokedCallback=\{false\}/g, 'android:enableOnBackInvokedCallback="false"');

        // Replace hardcoded integer with resource reference
        manifestContent = manifestContent.replace(
          /(<meta-data android:name="expo\.modules\.updates\.EXPO_UPDATES_LAUNCH_WAIT_MS" android:value=")(\d+)(")/g,
          '$1@integer/expo_updates_launch_wait_ms$3'
        );

        fs.writeFileSync(manifestPath, manifestContent);
        console.log('[withFixAndroidBooleans] Fixed AndroidManifest.xml');
      }

      console.log('[withFixAndroidBooleans] Completed successfully!');
      return config;
    },
  ]);
};

module.exports = withFixAndroidBooleans;
