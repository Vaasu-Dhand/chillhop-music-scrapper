import os from 'os';

// * Could all more Platform Support and Use a Switch statement instead
export default function getPlatform() {
  switch (os.platform()) {
    case "win32": // Windows
      return 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
    case "darwin":  // Mac OS
      return '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
    case "linux": // Linux
      return '/opt/google/chrome/google-chrome'
    default:
      // # This should send the Machine details on a DB or something
      return 'PLEASE ENTER CHROME.exe LOCATION HERE';
  }
}