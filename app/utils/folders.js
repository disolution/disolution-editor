import { remote } from 'electron';
const dialog = remote.dialog;

import fs from 'fs-extra';
import { Repository, Signature } from 'nodegit';
import jsonfile from 'jsonfile';
import path from 'path';

const CONSTANT = {
  projectDefinition: 'project.json',  // MAIN GIT DOCN PROJECT DEFINITION FILE
  projectReadme: 'README.md',         // MAIN GIT DOCN PROJECT README FILE
  projectCover: 'cover-image'         // MAIN GIT DOCN PROJECT COVER IMAGE + FILE EXT
};

export const definitionPath = (uPath) => path.join(uPath, CONSTANT.projectDefinition);
export const readmePath = (uPath) => path.join(uPath, CONSTANT.projectReadme);
export const coverPath = (uPath, projectObj = {}) =>
  path.join(uPath,
    CONSTANT.projectCover +
    (projectObj.coverImage ? path.extname(projectObj.coverImage) : '')
  );

export const initRepo = (uPath) => Repository.init(uPath, 0);
export const openRepo = (uPath) => Repository.open(uPath);

export function saveProject(uPath, project = {}) {
  const docnPath = definitionPath(uPath);
  const mdPath = readmePath(uPath);

  return writeProject(docnPath, project)
  .then(() => writeReadme(mdPath, project));
}

export function writeProject(docnPath, project = {}) {
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(docnPath, project, { spaces: 4 }, (err) => {
      if(err) reject(err);
      resolve(docnPath);
    });
  });
}

export function writeReadme(mdPath, project = {}) {
  const content = buildReadme(project);
  return new Promise((resolve, reject) => {
    fs.writeFile(mdPath, content, (err) => {
      if(err) reject(err);
      resolve(mdPath);
    });
  });
}

export function writeCover(filePath, newPath) {
  return new Promise((resolve, reject) => {
    fs.copy(filePath, newPath, (err) => {
      if(err) reject(err);
      resolve(newPath);
    });
  });
}

export function commit(repo, msg, author, files = [definitionPath(''), readmePath('')]) {
  const { name, email } = author;
  const sig = Signature.now(name, email);
  return repo.createCommitOnHead(files, sig, sig, msg);
}

export function buildReadme(project) {
  return `# ${project.title}\n\n${project.article}`;
}

export function findProjectInPath(uPath) {
  const docnPath = definitionPath(uPath);

  return new Promise((resolve, reject) => {
    jsonfile.readFile(docnPath, (err, config) => {
      if(err && err.code === 'ENOENT') return resolve(false);
      if(err) return reject(err);
      resolve(config);
    });
  });
}

export function askFolderPath() {
  const uPath = dialog.showOpenDialog({
    properties: ['openDirectory', 'createDirectory'],
    // defaultPath: app.getPath('documents'),
    title: 'Select folder with an existing DOCN project or for a new one'
  });
  return uPath ? uPath[0] : false;
}
