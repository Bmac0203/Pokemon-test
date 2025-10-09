// Monster Adventure Shortcut with Save/Load
// Original RPG for iPhone Shortcuts

// Variables
var playerName = 'Trainer';
var starter = '';
var playerHP = 50;
var playerXP = 0;
var playerLevel = 1;
var items = { 'Potion 💊': 3, 'Catch Cube 🟦': 5 };
var town = 'Starting Town';
var saveFileName = 'MonsterAdventureSave.json';

// Starter Creatures
var starters = [
  { name: 'Firelizard 🔥', type: 'Fire', HP: 50, attack: 15 },
  { name: 'Waterturtle 💧', type: 'Water', HP: 55, attack: 12 },
  { name: 'Grassplant 🌿', type: 'Grass', HP: 45, attack: 18 }
];

// Wild Monsters
var wildMonsters = [
  { name: 'Annoying Rat 🐀', type: 'Normal', HP: 30, attack: 8 },
  { name: 'Annoying Bird 🐦', type: 'Flying', HP: 25, attack: 10 },
  { name: 'Odd Crow 🦅', type: 'Dark', HP: 35, attack: 12 },
  { name: 'Master Fisher 🐟', type: 'Water', HP: 40, attack: 14 },
  { name: 'Shadow Fox 🦊', type: 'Dark', HP: 45, attack: 16 }
];

// Gym Leaders
var gyms = [
  { name: 'Rocky Gym 🪨', monster: { name: 'Stone Turtle 🐢', HP: 60, attack: 15 }, rewardXP: 50 },
  { name: 'Flame Gym 🔥', monster: { name: 'Blaze Lizard 🔥', HP: 65, attack: 18 }, rewardXP: 60 }
];

// Functions
function saveGame() {
  var saveData = {
    starter: starter,
    playerHP: playerHP,
    playerXP: playerXP,
    playerLevel: playerLevel,
    items: items,
    town: town
  };
  // In Shortcuts, use Save File action with JSON string
  alert('Game Saved!');
  return saveData;
}

function loadGame() {
  // In Shortcuts, use Get File and parse JSON
  // Here, we simulate loading
  alert('Game Loaded!');
}

function chooseStarter() {
  var menu = starters.map(s => s.name);
  var choice = prompt('Choose your starter Pokémon!\n' + menu.join('\n'));
  starter = starters.find(s => s.name === choice);
  playerHP = starter.HP;
  alert(`You chose ${starter.name}! Let’s begin your adventure!`);
}

function goToTown() {
  alert(`Welcome to ${town}!`);
  var townAction = prompt('What do you want to do?\nHeal 🏥\nTrain 💪\nGym Challenge 🏆\nGo Wild 🌲\nSave 💾\nLoad 📂');
  if (townAction === 'Heal 🏥') {
    playerHP = starter.HP;
    alert('Your Pokémon have been healed! HP restored.');
  } else if (townAction === 'Train 💪') {
    var trainingXP = 15;
    gainXP(trainingXP);
    alert(`You trained hard and gained ${trainingXP} XP!`);
  } else if (townAction === 'Gym Challenge 🏆') {
    var gym = gyms[Math.floor(Math.random() * gyms.length)];
    alert(`You challenge the ${gym.name}!`);
    battle(gym.monster, gym.rewardXP);
  } else if (townAction === 'Go Wild 🌲') {
    randomWildEncounter();
  } else if (townAction === 'Save 💾') {
    saveGame();
  } else if (townAction === 'Load 📂') {
    loadGame();
  }
}

function randomWildEncounter() {
  var monster = wildMonsters[Math.floor(Math.random() * wildMonsters.length)];
  battle(monster, 10);
}

function battle(monster, rewardXP) {
  rewardXP = rewardXP || 10;
  alert(`A wild ${monster.name} appeared! HP: ${monster.HP}`);
  while (monster.HP > 0 && playerHP > 0) {
    var action = prompt('What will you do?\nFight ⚔️\nRun 🏃\nBag 🎒');
    if (action === 'Fight ⚔️') {
      var damage = starter.attack + Math.floor(Math.random() * 5);
      monster.HP -= damage;
      alert(`You used an attack! ${monster.name}'s HP is now ${monster.HP}`);
      if (monster.HP <= 0) {
        alert(`You defeated ${monster.name}!`);
        gainXP(rewardXP);
        break;
      }
      var monsterDamage = monster.attack + Math.floor(Math.random() * 5);
      playerHP -= monsterDamage;
      alert(`${monster.name} attacked back! Your HP is now ${playerHP}`);
      if (playerHP <= 0) {
        alert('You fainted! Game Over 💀');
        break;
      }
    } else if (action === 'Run 🏃') {
      var success = Math.random() < 0.5;
      if (success) {
        alert('You ran away safely!');
        break;
      } else {
        alert('Failed to run! The monster attacks!');
        var monsterDamage = monster.attack + Math.floor(Math.random() * 5);
        playerHP -= monsterDamage;
        if (playerHP <= 0) {
          alert('You fainted! Game Over 💀');
          break;
        }
      }
    } else if (action === 'Bag 🎒') {
      var bagAction = prompt('Choose item:\nPotion 💊\nCatch Cube 🟦');
      if (bagAction === 'Potion 💊' && items['Potion 💊'] > 0) {
        playerHP += 20;
        items['Potion 💊']--;
        alert(`You used a Potion! Your HP is now ${playerHP}`);
      } else if (bagAction === 'Catch Cube 🟦' && items['Catch Cube 🟦'] > 0) {
        items['Catch Cube 🟦']--;
        var catchSuccess = Math.random() < 0.5;
        if (catchSuccess) {
          alert(`You caught ${monster.name}! 🟦`);
          break;
        } else {
          alert('The monster escaped!');
        }
      } else {
        alert('No items left or invalid choice!');
      }
    }
  }
}

function gainXP(amount) {
  playerXP += amount;
  alert(`You gained ${amount} XP! Total XP: ${playerXP}`);
  if (playerXP >= playerLevel * 20) {
    playerLevel++;
    playerHP = starter.HP;
    alert(`Level Up! You are now level ${playerLevel}. HP restored.`);
  }
}

// Game Start
chooseStarter();
while (playerHP > 0) {
  goToTown();
}
