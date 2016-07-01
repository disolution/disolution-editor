import { remote } from 'electron';
const dialog = remote.dialog;
import { Repository, Signature, Remote } from 'nodegit';
export * from './docn';

export const initRepo = (projectPath) => Repository.init(projectPath, 0);
export const openRepo = (projectPath) => Repository.open(projectPath);

export function commit(repo, msg, author, files = []) {
  const { name, email } = author;
  const sig = Signature.now(name, email);
  return repo.createCommitOnHead(files, sig, sig, msg);
}

export function remotes(repo) {
  return Remote.list(repo).then(remoteNames => Promise.all(
    remoteNames.map(name => Remote.lookup(repo, name).then(r => r.url()))
  ));
}

export function getProjectRemotes(projectPath) {
  return openRepo(projectPath).then(repo => remotes(repo));
}

export function askFolderPath() {
  const uPath = dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory'],
  });
  return uPath ? uPath[0] : false;
}
