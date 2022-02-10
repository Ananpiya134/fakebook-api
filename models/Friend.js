module.exports = (sequelize, DataTypes) => {

    const Friend = sequelize.define(
        'Friend',
        {
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                defaultValue: 'REQUESTED',
                validate: {
                    notEmpty: true
                }
            }
        },
        {
            underscored: true
        }
    );


    Friend.associate = models => {

        Friend.belongsTo(models.User, {
            as: 'RequestFrom',
            foreignKey: {
                name: 'requestFromId',
                allowNull: false
            }
        }),
            Friend.belongsTo(models.User, {
                as: 'RequestTo',
                foreignKey: {
                    name: 'requestToId',
                    allowNull: false
                }
            })
    }


    return Friend;
}