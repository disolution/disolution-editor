const { app, remote } = require('electron');
import fs from 'fs';
import NodeGit, { Repository } from 'nodegit';
import jsonfile from 'jsonfile';
import path from 'path';

const dialog = remote.dialog;
const projectDefinition = 'project.json'; // MAIN GIT DOCN PROJECT DEFINITION FILE

export function definitionPath(uPath) {
  return path.join(uPath, projectDefinition);
}

export function initRepo(uPath, projectObj = {}) {
  return Repository.init(uPath, 0).then(function(repo) {
    const docnPath = definitionPath(uPath);
    return writeProject(docnPath, projectObj);
  });
}

export function writeProject(uPath, projectObj={}) {
  return new Promise(function(resolve, reject) {
    jsonfile.writeFile(uPath, projectObj, (err) => {
      if(err) reject(err);
      resolve(uPath);
    });
  });
}

export function openRepo(uPath) {
  return Repository.open(uPath);
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
