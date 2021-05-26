#!/usr/bin/env node

const fs = require('fs');
const chalk = require('chalk')
const path = require('path')

const targetDir = process.argv[2] || process.cwd()

fs.readdir(targetDir, (err, files) => {
    if(err) {
        console.log(err)
        return
    }
    printFiles(files)
});

function printFiles(files)
{
   let promises = files.map((file) => {
       return new Promise((resolve,reject) => {
        fs.lstat(path.join(targetDir,file), (err, stats) => {
            if(err) {
                reject(err)
            }

            resolve({filename: file, isDir: stats.isDirectory()})
        })
       })
   })

   Promise.all(promises)
   .then((data) => {
       data.forEach((file) => {
            console.log(`${file.isDir ? chalk.cyanBright.italic.bold(file.filename) : chalk.yellow(file.filename)}`)
       })
   })
   .catch((err) => {
        console.log(err)
   })
}

