module.exports = function(sequelize, Sequelize) {
  var Character = sequelize.define("Character", {
    hunger: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 25
    },

    isHungryImg: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/hungry.png"
    },

    play: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 10
    },

    isPlayfulImg: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/happy.png"
    },

    sleep: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 20
    },

    isSleepyImg: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/tired.png"
    },

    love: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },

    isLovedImg: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/happytwo.png"
    },

    dirty: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },

    isDirtyImg: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/dirty.png"
    },

    health: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 100
    },

    isSickImg: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/dead.png"
    },

    isDefaultImg: {
      type: Sequelize.STRING,
      defaultValue: "./public/images/typeOne/nrmlopen.png"
    }
  });

  return Character;
};
