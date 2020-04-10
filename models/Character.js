module.exports = function(sequelize, Sequelize) {
  var Character = sequelize.define("Character", {
    hunger: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 25
    },

    play: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 10
    },

    sleep: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 20
    },

    love: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },

    dirty: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },

    health: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 100
    },

    asleep1: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/asleep.png"
    },

    asleep2: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/asleeptwo.png"
    },

    dead1: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/dead.png"
    },

    dead2: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/deadtwo.png"
    },

    happy1: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/happy.png"
    },

    happy2: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/happytwo.png"
    },

    hungry1: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/hungry.png"
    },

    hungry2: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/hungrytwo.png"
    },

    tired1: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/tired.png"
    },

    tired2: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/tiredtwo.png"
    },

    nrmlopen: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/nrmlopen.png"
    },

    nrmlclsd: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/nrmlclsd.png"
    },

    gameover1: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/gameover.png"
    },

    gameover2: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/gameovertwo.png"
    },

    gameover3: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/gameoverthree.png"
    }
  });

  return Character;
};
