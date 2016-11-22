require('./xxx.js')

// 定义所有游戏参与者
// { name: '张三', position: 0 }
const players = []
const map = []
const luckTurn = [ 7, 55, 69, 51, 83, 98 ] 
const landMine = [ 5, 13, 17, 33, 38, 50, 64, 80, 94 ]
const pause = [ 9, 27, 60, 93 ] 
const timeTunnel = [ 20, 25, 45, 63, 72, 88, 90 ] 

function initMap () {
  for (let i = 0; i < 100; i++) {
    map[i] = 0
  }
  for (let i = luckTurn.length; i > -1; i--) {
    map[luckTurn[i]] = 1 // 幸运轮盘 1 ○ 
  }
  for (let i = landMine.length; i > -1; i--) {
    map[landMine[i]] = 2 // 地雷 2 ★
  }
  for (let i = pause.length; i > -1; i--) {
    map[pause[i]] = 3 // 暂停 3  △ 
  }
  for (let i = timeTunnel.length; i > -1; i--) {
    map[timeTunnel[i]] = 4 // 时空隧道 4 卐 
  }
}

function renderLogo () {
  console.write('\u001b[2J\u001b[0;0H')
  console.write('*******************************************************\n')
  console.write('*                                                     *\n')
  console.write('*                   Aeroplane  Chess                  *\n')
  console.write('*                                                     *\n')
  console.write('*******************************************************\n')
}

async function recivePlayers () {
  console.write(`请输入Ａ玩家的名称：`)
  const username1 = await console.read()
  players.push({ name: username1, position: 0 })
  console.write(`===== 热烈欢迎Ａ玩家【${username1}】 =====\n`)
  console.write(`请输入Ｂ玩家的名称：`)
  const username2 = await console.read()
  players.push({ name: username2, position: 0 })
  console.write(`===== 热烈欢迎Ｂ玩家【${username2}】 =====\n`)
}

async function renderMeta () {
  console.write(`${players.map(p => p.name).join('、')}欢迎你们来到飞行棋的世界，你们将在这里一决高下！\n`)
  console.write(`玩家A：${players[0].name}用A表示。\n`)
  console.write(`玩家B：${players[1].name}用B表示。\n`)
  console.write(`如果在一起,就用<>表示。\n`)
  console.write(`干起来.......\n`)
  console.write(`请按下任意键开始游戏~\n`)
  await console.readkey()
}

function getMapChar (i) {
  // □☉▩卍☢❈〓
  if (players[0].position === i && players[1].position === i) {
    return console.colors.magenta.bgBlack('<>')
  } else if (players[0].position == i) {
    return console.colors.red.bgBlack('Ａ')
  } else if (players[1].position == i) {
    return console.colors.red.bgBlack('Ｂ')
  } else {
    switch (map[i]) { 
      case 1:
        return console.colors.red.bgBlack('炸')
      case 2:
        return console.colors.yellow.bgBlack('定')
      case 3:
        return console.colors.blue.bgBlack('幸')
      case 4:
        return console.colors.green.bgBlack('卐')
      default:
        return console.colors.bgBlack('口')
    }
  }
  return mapString;
}

function renderMap () {
  renderLogo()
  // 打印第1组的地图
  for (let i = 0; i < 30; i++)// 这1组有1行,有30个方框
  {
    console.write(getMapChar(i))
  }
  console.write('\n')
  //打印第2组
  for (let i = 30; i < 35; i++)//这组有5行
  {
    for (let j = 0; j < 29; j++)//打印这五行前面的空格
    {
      console.write('  ')
    }
    console.write(getMapChar(i))
    console.write('\n')
  }
  //打印第三组
  for (let i = 64; i >= 35; i--)//这一组和第一组一样
  {
    console.write(getMapChar(i))
  }
  console.write('\n')
  //打印第四组
  for (let i = 65; i < 70; i++)
  {
    console.write(getMapChar(i))
    console.write('\n')
  }
  //打印第五组
  for (let i = 70; i < 100; i++)
  {
    console.write(getMapChar(i))
  }
  console.write('\n')
}

function randomStep () {
  return Math.floor(Math.random() * 6) + 1
}

async function startGame () {
  let isStopA = false
  let isStopB = false
  let count = 0
  while (players[0].position < 99 && players[1].position < 99) {
    console.write(`玩家【${players[count % 2].name}】按任意键开始掷骰子~\n`)
    await console.readkey()
    let step = randomStep()
    console.write(`玩家【${players[count % 2].name}】扔出了[${step}]，按任意键开始移动~\n`)
    await console.readkey()
    players[count % 2].position += step
    renderMap()
    count++
  }
}

async function main () {
  initMap()
  renderLogo()
  await recivePlayers()
  await renderMeta()
  renderMap()
  await startGame()
}

main()