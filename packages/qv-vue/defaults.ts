import { makeInstaller } from './make-installer'
import Components from './component'
// import Plugins from './plugin'

export const makeInstall = makeInstaller([...Components]) //, ...Plugins
