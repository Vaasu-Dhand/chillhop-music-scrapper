import os from 'os';

// * Could all more Platform Support and Use a Switch statement instead
export default function getPlatform() {
  if (os.platform() === "win32") {
    return 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
  } else if (os.platform() === "darwin") {
    return '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'
  } else {
    return 'PLEASE ENTER CHROME.exe LOCATION HERE'
  }
}