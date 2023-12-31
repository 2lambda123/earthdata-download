// @ts-nocheck

import { dialog } from 'electron'

/**
 * Opens the electron open dialog to choose a download location
 * @param {Object} params
 * @param {Object} params.appWindow Electron window instance
 */
const chooseDownloadLocation = ({
  appWindow
}) => {
  const result = dialog.showOpenDialogSync(appWindow, {
    message: 'Where would you like to download your files?',
    buttonLabel: 'Choose folder',
    properties: [
      'openDirectory',
      'createDirectory'
    ]
  })

  // Handle the user cancelling the dialog
  if (!result) return

  const [downloadLocation] = result

  // Send a message back to the renderer with the downloadLocation
  appWindow.webContents.send('setDownloadLocation', { downloadLocation })
}

export default chooseDownloadLocation
