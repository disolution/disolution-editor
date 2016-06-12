import { remote } from 'electron';
import fs from 'fs';
import NodeGit from 'nodegit';

const dialog = remote.dialog;

console.log("NodeGit", NodeGit);

// var newPath = require("path").resolve("./test-repo/");

function createRepo(path) {
  // NodeGit.Repository.init(path, 0).then(function(repo) {
  //   console.log("new repo opened", repo);
  // }).catch(function(err) {
  //   console.log("err when creating repo", err);
  // });
}

// NodeGit.Repository.open(newPath).then(function(repo) {
//   console.log("repo opened", repo);
// }).catch(function(err) {
//   console.log("no repo here", err);
//   createRepo(newPath);
// });

export function isPathValidDocn(path) {
  if(path) {

  }
  return false;
}

export function askFolderPath() {
  let path = dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  console.log("askFolderPath", path);
  return path;
}
