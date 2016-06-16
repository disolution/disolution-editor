import { app, remote } from 'electron';
const dialog = remote.dialog;

import fs from 'fs';
import NodeGit, { Repository, Signature } from 'nodegit';
import jsonfile from 'jsonfile';
import path from 'path';


const CONSTANT = {
  projectDefinition: 'project.json', // MAIN GIT DOCN PROJECT DEFINITION FILE
  projectReadme: 'README.md'         // MAIN GIT DOCN PROJECT README FILE
};

export function definitionPath(uPath) {
  return path.join(uPath, CONSTANT.projectDefinition);
};

export function readmePath(uPath) {
  return path.join(uPath, CONSTANT.projectReadme);
};

export function initRepo(uPath) {
  return Repository.init(uPath, 0);
}

export function openRepo(uPath) {
  return Repository.open(uPath);
}

export function saveProject(uPath, projectObj={}) {
  const docnPath = definitionPath(uPath);
  const mdPath = readmePath(uPath);

  return writeProject(docnPath, projectObj)
  .then(() => writeReadme(mdPath, projectObj));
}

export function writeProject(docnPath, projectObj={}) {
  return new Promise(function(resolve, reject) {
    jsonfile.writeFile(docnPath, projectObj, { spaces: 4 }, (err) => {
      if(err) reject(err);
      resolve(docnPath);
    });
  });
}

export function writeReadme(mdPath, projectObj={}) {
  const content = buildReadme(projectObj);
  return new Promise(function(resolve, reject) {
    fs.writeFile(mdPath, content, (err) => {
      if(err) reject(err);
      resolve(mdPath);
    });
  });
}

export function commit(repo, msg, author, files=[definitionPath(''), readmePath('')]) {
  const { name, email } = author;
  let sig = Signature.now(name, email);
  return repo.createCommitOnHead(files, sig, sig, msg);
}

export function buildReadme(projectObj) {
  return '# ' + projectObj.title + "\n\n" + projectObj.article;
}

export function findProjectInPath(uPath) {
  let docnPath = definitionPath(uPath);

  return new Promise(function(resolve, reject) {
    console.log("looking for project in", docnPath);

    jsonfile.readFile(docnPath, function(err, config) {
      if(err && err.code == 'ENOENT') return resolve(false);
      if(err) return reject(err);
      resolve(config);
    });
    // openRepo(uPath).then(function(repo) {
    //   console.log("repo", repo, repo.state());
    //
    //   resolve(repo);
    // }).catch(function(err) {
    //   console.log("err", err);
    //
    //   reject(err);
    // });
  });
}

export function askFolderPath() {
  let uPath = dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory'],
    // defaultPath: app.getPath('documents'),
    title: 'Select folder with an existing DOCN project or for a new one'
  });
  console.log("askFolderPath", uPath);
  return uPath ? uPath[0] : false;
}
