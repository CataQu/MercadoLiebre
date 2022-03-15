module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        productId: { 
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
    },
        title: DataTypes.STRING,
        price: DataTypes.DECIMAL(8,2),
        discount: DataTypes.NUMBER,
        description: DataTypes.STRING,
        image: DataTypes.STRING,
        stock: DataTypes.NUMBER,
        brandId: {type: DataTypes.INTEGER, allowNull: true},
        categoryId: {type: DataTypes.INTEGER, allowNull: true}
    }, {
        tableName: "products",
        paranoid: true,
        timestamps: true
    });
    Product.associate = function (models){
        Product.belongsTo(models.Brand, {
            as: "brands",
            foreignKey: "brandId"
        }),
        Product.belongsTo(models.Category, {
            as: "categories",
            foreignKey: "categoryId"
        })
    }
    return Product
}