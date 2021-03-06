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
    remoteNames.map(name =>
      Remote.lookup(repo, name).then(r => ({ name, url: r.url() }))
    )
  ));
}

export function getProjectRemotes(projectPath) {
  return openRepo(projectPath).then(repo => remotes(repo));
}

export function listenCommits(projectPath, commitCb) {
  return openRepo(projectPath)
  .then(r => r.getMasterCommit())
  .then(firstCommit => {
    const history = firstCommit.history();
    history.on('commit', commitCb);
    history.start();
    return history;
  });
}

export function getProjectStatus(projectPath) {
  return openRepo(projectPath).then(repo => getRepoStatus(repo));
}

export function getRepoStatus(repo) {
  return repo.getStatus().then((files) => {
    function extractStatus(file) {
      const statuses = [];
      if (file.isNew()) { statuses.push('NEW'); }
      if (file.isModified()) { statuses.push('MODIFIED'); }
      if (file.isTypechange()) { statuses.push('TYPECHANGE'); }
      if (file.isRenamed()) { statuses.push('RENAMED'); }
      if (file.isIgnored()) { statuses.push('IGNORED'); }
      return statuses;
    }

    return files.map((file) => ({ path: file.path(), statuses: extractStatus(file) }));
  });
}

export function askFolderPath() {
  const uPath = dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory'],
  });
  return uPath ? uPath[0] : false;
}
