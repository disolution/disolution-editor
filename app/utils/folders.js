import { remote } from 'electron';
const dialog = remote.dialog;
import { Repository, Signature } from 'nodegit';
export * from './docn';

export const initRepo = (uPath) => Repository.init(uPath, 0);
export const openRepo = (uPath) => Repository.open(uPath);

export function commit(repo, msg, author, files = []) {
  const { name, email } = author;
  const sig = Signature.now(name, email);
  return repo.createCommitOnHead(files, sig, sig, msg);
}

export function askFolderPath() {
  const uPath = dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory'],
    // defaultPath: app.getPath('documents'),
    title: 'Select folder with an existing DOCN project or for a new one'
  });
  return uPath ? uPath[0] : false;
}
