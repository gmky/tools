const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')
const { GIT_HOST, GIT_USER, GIT_TOKEN, GIT_GROUP_ID, GIT_DEFAULT_BRANCH, GIT_WORKDIR } = require('./cred.const')

async function cloneAll() {
    const resp = await fetch(`https://${GIT_HOST}/api/v4/groups/${GIT_GROUP_ID}`, { headers: { 'PRIVATE-TOKEN': GIT_TOKEN } });
    const { projects } = await resp.json();
    const data = normalizeProjectInfo(projects);
    data.forEach((item) => {
        console.log(`=================== ${item.name} ====================`)
        // Check if branch is existed
        const urlWithToken = generateCloneUrl(item.subPath)
        const result = clone(urlWithToken, GIT_DEFAULT_BRANCH);
        if (!result) {
            item.status = 'SUCCESS';
        } else {
            item.message = result.message
            item.status = 'FAILED';
        }
    });
    console.table(data, ['id','name', 'status'])
}

function clone(url, branch) {
    try {
        execSync(`git clone -b ${branch} ${url}`, { stdio: [0,1,2], cwd: path.resolve(__dirname, GIT_WORKDIR) });
        return null;
    } catch (error) {
        return error
    }
}

async function checkBranch(repoId, branch) {
    const resp = await fetch(`https://${GIT_HOST}/api/v4/projects/${repoId}/repository/branches/${branch}`);
    if (resp.status == 404) return false;
    return true;
}

function normalizeProjectInfo(data) {
    return data.map(item => {
        const id = item.id
        const name = item.name
        const defaultBranch = item.default_branch
        const path = item.http_url_to_repo
        const subPath = item.path_with_namespace 
        return {
            id, name, defaultBranch, path, subPath, status: 'PENDING'
        }
    });
}

function generateCloneUrl(subPath) {
    return `https://${GIT_USER}:${GIT_TOKEN}@${GIT_HOST}/${subPath}`
}

function main() {
    const workDirExisted = fs.existsSync(`${GIT_WORKDIR}`)

    if (!workDirExisted) {
        console.log(`Directory ${GIT_WORKDIR} does not exist`)
    }

    cloneAll()
}

main()