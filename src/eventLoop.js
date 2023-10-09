import inquirer from 'inquirer'

const answers = await inquirer.prompt([
  {
    type: 'list',
    name: 'command',
    message: 'Select command you want to send to the charger:',
    choices: ['GetConfiguration', new inquirer.Separator(), 'Exit']
  }
])

console.log(JSON.stringify(answers, null, '  '))
if (answers.command === 'Exit') {
  process.exit()
}
