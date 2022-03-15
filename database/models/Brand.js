module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define("Brand", {
        brand: DataTypes.STRING,
    }, {  timestamps: false });
    Brand.associate = function (models){
    }
    return Brand
}