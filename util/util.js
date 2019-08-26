const path = require("path");
const fs = require("fs");
const { spawn, exec } = require("child_process");
const rimraf = require("rimraf");
const urllib = require("urllib");
const compressing = require("compressing");
const mkdirp = require("mkdirp");
const request = require("request");

module.exports = {

    $get(url) {
        return new Promise((resolve, reject) => {
            request.get({
                url: url
            }, (error, xhr, content) => {
                if (!error && xhr.statusCode === 200) {
                    resolve(content)
                } else {
                    reject(error);
                }
            })
        })

    },

    urlLib(urlPath) {
        return new Promise((resolve, reject) => {
            urllib.request(urlPath, {
                streaming: true,
                followRedirect: true
            })
                .then((result) => {

                    if (result.status === 200) {
                        resolve(result.res);
                    } else {
                        reject(result);
                    }

                })

                .catch((error) => {
                    reject(error);
                })
        })

    },


    uncompress(result, srcPath, tag) {
        return new Promise((resolve, reject) => {
            compressing[tag || 'tgz'].uncompress(result, srcPath).then(() => {
                resolve();
            })
                .catch((error) => {
                    reject(error);
                });
        })

    },

    async copyDir(src, dest) {
        try {
            let seed = await this.readdir(src);
            let cursor = -1, item;

            if (!fs.existsSync(dest)) {
                await this.mkdir(dest);
            }

            while (item = seed[++cursor]) {

                let srcPath = path.join(src, item);
                let targetPath = path.join(dest, item);
                let itemStat = await this.stat(srcPath);
                if (itemStat.isFile()) {
                    let readable = fs.createReadStream(srcPath);
                    let writeable = fs.createWriteStream(targetPath);
                    readable.pipe(writeable);

                } else if (itemStat.isDirectory()) {
                    if (!fs.existsSync(targetPath)) {
                        await this.mkdir(targetPath);
                    }

                    let itemDir = await this.readdir(srcPath);
                    itemDir.forEach((_item) => {
                        seed.push(`${item}/${_item}`);
                    })

                }


            }
        } catch (error) {
            console.log(error);
        }
    },

    execCmd(cmd, cwd) {
        return new Promise((res, rej) => {
            const process = exec(cmd, {
                encoding: "utf8",
                cwd
            }, async (error, stdout, stderr) => {
                error ? rej(error) : res({
                    error,
                    stdout,
                    stderr
                })
            });
            process.stderr.on('data', data => console.log(data));
            process.stdout.on('data', data => console.log(data));
            process.stdout.on('close', data => {
                console.log(data);
                res(data);
            });
        });
    },

    mkdir(path) {

        return new Promise((resolve, reject) => {

            mkdirp(path, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(true);
                }
            });
        })
    },
    stat(file) {
        return new Promise((resolve, reject) => {
            fs.stat(file, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },


    rename(src, dest) {

        return new Promise((resolve, reject) => {

            fs.rename(src, dest, function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(true);
                }
            })
        })
    },

    rimraf(path) {
        return new Promise((resolve, reject) => {
            rimraf(path, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(true);
                }
            })
        });
    },

    spawn(path, command) {
        return new Promise((resolve, reject) => {
            const child = spawn(command, [], {
                shell: true,
                cwd: path,
                stdio: 'inherit'
            });
            //  child.stdout.pipe(process.stdout);

            child.on('close', async function (code) {

                if (code !== 0) {
                    reject(`子进程${command}错误`);
                }
                try {
                    resolve();
                } catch (err) {
                    console.log(err);
                    // Log.error('子进程退出，代码：', err.message || err);
                }


            })


        })
    },
    writeFile(file, data) {


        return new Promise(async (resolve, reject) => {

            try {
                let dir = path.dirname(file);


                if (!fs.existsSync(dir)) {
                    await this.mkdir(dir);
                }

                fs.writeFile(file, data, 'utf8', (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });

            } catch (e) {
                console.log(e)
            }

        });
    },
    readdir(file) {
        return new Promise((resolve, reject) => {
            fs.readdir(file, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

    },
    readFile(file) {

        return new Promise((resolve, reject) => {
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },

    getUID() {
        var sId = "",
            i = 24;
        for (; i--;) {
            sId += Math.floor(Math.random() * 16.0).toString(16).toUpperCase();
            if (i == 4) {
                sId += "-";
            }
        }
        return sId;
    }

}