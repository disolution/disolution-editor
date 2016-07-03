/*
  DOCN repository read/write module
  (c) copyright Henry Kehlmann (MIT license)
 */
import fs from 'fs-extra';
import path from 'path';

export const DOCN_JSON = 'project.json';  // MAIN GIT DOCN PROJECT DEFINITION FILE
export const DOCN_README = 'README.md';         // MAIN GIT DOCN PROJECT README FILE
export const DOCN_IMAGE = 'cover-image';        // MAIN GIT DOCN PROJECT COVER IMAGE + FILE EXT

export const definitionPath = (uPath) => path.join(uPath, DOCN_JSON);
export const readmePath = (uPath) => path.join(uPath, DOCN_README);
export const coverPath = (uPath, project = {}) =>
  path.join(uPath,
    DOCN_IMAGE +
    (project.coverImage ? path.extname(project.coverImage) : '')
  );

export function saveProject(uPath, project = {}) {
  const docnPath = definitionPath(uPath);
  const mdPath = readmePath(uPath);

  return writeProject(docnPath, project)
  .then(() => writeReadme(mdPath, project));
}

export function writeProject(docnPath, project = {}) {
  return new Promise((resolve, reject) => {
    fs.outputJson(docnPath, project, { spaces: 4 }, (err) => {
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

export function findProjectInPath(projectPath) {
  const docnPath = definitionPath(projectPath);

  return new Promise((resolve, reject) => {
    fs.readJson(docnPath, (err, config) => {
      if(err && err.code === 'ENOENT') return resolve(false);
      if(err) return reject(err);
      resolve(config);
    });
  });
}

// DOCN README.md
// Human-readable markdown presentation of a DOCN project
export function buildReadme({ title, coverImage, article }) {
  const parts = [
    `# ${title}`,
    (coverImage ? `![Cover](${coverImage})` : ''),
    `\n${article}`
  ];
  return parts.filter(p => p.length).join('\n');
}
