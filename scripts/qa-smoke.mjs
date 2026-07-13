#!/usr/bin/env node
/**
 * Local smoke checks against a running stack (api :3001, web :3000).
 * Usage: pnpm qa:smoke
 */
import { execSync } from 'node:child_process'
import process from 'node:process'

const WEB = process.env.WEB_URL || 'http://localhost:3000'
const API = process.env.API_URL || 'http://localhost:3001'

const checks = []

function ok(name, detail = '') {
  checks.push({ name, pass: true, detail })
  console.log(`PASS  ${name}${detail ? ` — ${detail}` : ''}`)
}

function fail(name, detail = '') {
  checks.push({ name, pass: false, detail })
  console.error(`FAIL  ${name}${detail ? ` — ${detail}` : ''}`)
}

function checkNode() {
  const major = Number(process.versions.node.split('.')[0])
  const minor = Number(process.versions.node.split('.')[1])
  if (major > 20 || (major === 20 && minor >= 9) || major >= 22) {
    ok('Node.js >= 20.9', process.versions.node)
  } else {
    fail('Node.js >= 20.9', process.versions.node)
  }
}

function checkPnpm() {
  try {
    const v = execSync('pnpm -v', { encoding: 'utf8' }).trim()
    if (v.startsWith('10.')) ok('pnpm 10.x', v)
    else fail('pnpm 10.x', `got ${v}`)
  } catch (e) {
    fail('pnpm 10.x', String(e.message || e))
  }
}

async function fetchJson(url) {
  const res = await fetch(url, { redirect: 'follow' })
  const text = await res.text()
  let json = null
  try {
    json = JSON.parse(text)
  } catch {
    /* not json */
  }
  return { res, text, json }
}

async function checkHealth() {
  try {
    const { res, json } = await fetchJson(`${API}/health`)
    if (res.status === 200 && json && (json.status === 'ok' || json.status === 'success')) {
      ok('GET /health', JSON.stringify(json.status))
    } else {
      fail('GET /health', `status=${res.status} body=${JSON.stringify(json)}`)
    }
  } catch (e) {
    fail('GET /health', `API not reachable at ${API} (${e.message})`)
  }
}

async function checkSwagger() {
  try {
    const res = await fetch(`${API}/api-docs/`, { redirect: 'follow' })
    if (res.ok || res.status === 301 || res.status === 302) {
      ok('Swagger /api-docs', `HTTP ${res.status}`)
    } else {
      // some setups serve at /api-docs without trailing slash
      const res2 = await fetch(`${API}/api-docs`, { redirect: 'follow' })
      if (res2.ok) ok('Swagger /api-docs', `HTTP ${res2.status}`)
      else fail('Swagger /api-docs', `HTTP ${res.status}`)
    }
  } catch (e) {
    fail('Swagger /api-docs', e.message)
  }
}

async function checkLearning() {
  try {
    const res = await fetch(`${WEB}/learning`, { redirect: 'follow' })
    if (res.status === 200) ok('GET /learning (web)', `HTTP ${res.status}`)
    else fail('GET /learning (web)', `HTTP ${res.status}`)
  } catch (e) {
    fail('GET /learning (web)', `Web not reachable at ${WEB} (${e.message})`)
  }
}

async function checkModulesApi() {
  try {
    const { res, json } = await fetchJson(`${API}/api/learning/modules`)
    if (res.status === 200 && json?.success && Array.isArray(json.data)) {
      ok('GET /api/learning/modules', `count=${json.count ?? json.data.length} source=${json.source || '?'}`)
    } else {
      fail('GET /api/learning/modules', `status=${res.status}`)
    }
  } catch (e) {
    fail('GET /api/learning/modules', e.message)
  }
}

async function main() {
  console.log('FollStack QA smoke')
  console.log(`WEB=${WEB}  API=${API}\n`)
  checkNode()
  checkPnpm()
  await checkHealth()
  await checkSwagger()
  await checkModulesApi()
  await checkLearning()

  const failed = checks.filter((c) => !c.pass)
  console.log(`\n${checks.length - failed.length}/${checks.length} passed`)
  if (failed.length) {
    process.exit(1)
  }
}

main()
