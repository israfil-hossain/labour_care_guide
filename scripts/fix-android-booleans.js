#!/usr/bin/env node

/**
 * Fix Android boolean type casting issue
 * This script removes string definitions of boolean resources and ensures
 * they are properly defined in bools.xml
 */

const fs = require('fs');
const path = require('path');

const stringsPath = path.join(__dirname, '../android/app/src/main/res/values/strings.xml');
const boolsPath = path.join(__dirname, '../android/app/src/main/res/values/bools.xml');

console.log('Fixing Android boolean resources...');

// Fix strings.xml - remove boolean defined as string
if (fs.existsSync(stringsPath)) {
  let stringsContent = fs.readFileSync(stringsPath, 'utf-8');

  const lines = stringsContent.split('\n');
  const filteredLines = lines.filter(line =>
    !line.includes('expo_splash_screen_status_bar_translucent')
  );
  stringsContent = filteredLines.join('\n');

  fs.writeFileSync(stringsPath, stringsContent);
  console.log('✓ Fixed strings.xml');
}

// Ensure bools.xml has the proper boolean definition
const boolsContent = `<?xml version="1.0" encoding="utf-8"?>
<resources>
  <bool name="expo_updates_enabled">false</bool>
  <bool name="expo_splash_screen_status_bar_translucent">false</bool>
</resources>
`;

fs.writeFileSync(boolsPath, boolsContent);
console.log('✓ Created/updated bools.xml');

console.log('Done! Android boolean resources fixed.');
