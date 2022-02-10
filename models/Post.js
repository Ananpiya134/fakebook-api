module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define(
        'Post',
        {
            title: DataTypes.STRING,
            image: DataTypes.STRING,
        },
        {
            underscored: true
        }
    );

    Post.associate = models => {

        Post.hasMany(models.Comment, {
            foreignKey: {
                name: 'post_id',
                allowNull: false
            }
        })
        Post.hasMany(models.Like, {
            foreignKey: {
                name: 'post_id',
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