module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define(
        'Post',
        {
            title: {
                type: DataTypes.STRING,
                allowNull: true
            },
            image: DataTypes.STRING,
        },
        {
            underscored: true
        }
    );

    Post.associate = models => {

        Post.hasMany(models.Comment, {
            foreignKey: {
                name: 'postId',
                allowNull: false
            }
        })
        Post.hasMany(models.Like, {
            foreignKey: {
                name: 'postId',
                allowNull: false
            }
        })
        Post.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            }
        })
    }


    return Post;
}