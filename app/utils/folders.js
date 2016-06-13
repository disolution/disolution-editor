const { app, remote } = require('electron');
import fs from 'fs';
import NodeGit, { Repository } from 'nodegit';
import jsonfile from 'jsonfile';
import path from 'path';

const dialog = remote.dialog;
const projectDefinition = 'project.json'; // MAIN GIT DOCN PROJECT DEFINITION FILE
const projectReadme = 'README.md'; // MAIN GIT DOCN PROJECT README FILE

export function definitionPath(uPath) {
  return path.join(uPath, projectDefinition);
}

export function readmePath(uPath) {
  return path.join(uPath, projectReadme);
}

export function initRepo(uPath, projectObj = {}) {
  return Repository.init(uPath, 0).then(function(repo) {
    const docnPath = definitionPath(uPath);
    return writeProject(docnPath, projectObj);
  }).then(function() {
    const mdPath = readmePath(uPath);
    return writeReadme(mdPath, projectObj);
  });
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

export function buildReadme(projectObj) {
  return '# ' + projectObj.title + "\n\n" + projectObj.article;
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
