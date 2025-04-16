/**
 * @class Item
 * Represents a generic item in the inventory.
 */
class Item {
    name;
    weight;
    rarity;
    
    /**
     * @constructor
     * @param {string} name - Name of the item.
     * @param {number} weight - Weight of the item.
     * @param {string} rarity - Rarity of the item (common, uncommon, rare, legendary).
     */
    constructor(name, weight, rarity) {
      this.name = name;
      this.weight = weight;
      this.rarity = rarity;
    }
  
    /**
     * Returns information about the item.
     * @returns {string} Info string.
     */
    getInfo() {
      return `${this.name} (${this.rarity}) - ${this.weight}kg`;
    }
  
    /**
     * Updates the weight of the item.
     * @param {number} newWeight - New weight to set.
     */
    setWeight(newWeight) {
      this.weight = newWeight;
    }
  }
  
  /**
   * @class Weapon
   * Extends Item to represent a weapon with additional properties.
   */
  class Weapon extends Item {
    damage;
    durability;

    /**
     * @constructor
     * @param {string} name - Name of the weapon.
     * @param {number} weight - Weight of the weapon.
     * @param {string} rarity - Rarity of the weapon.
     * @param {number} damage - Damage value.
     * @param {number} durability - Durability (0-100).
     */
    constructor(name, weight, rarity, damage, durability) {
      super(name, weight, rarity);
      this.damage = damage;
      this.durability = durability;
    }
  
    /**
     *Using the weapon, reducing durability.
     */
    use() {
      if (this.durability > 0) {
        this.durability = Math.max(0, this.durability - 10);
      }
    }
  
    /**
     * Repairs the weapon to full durability.
     */
    repair() {
      this.durability = 100;
    }
  }
  
  const sword = new Item("Steel Sword", 3.5, "rare");
  console.log(sword.getInfo());
  sword.setWeight(4.0);
  console.log(sword.getInfo());
  
  const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
  console.log(bow.getInfo());
  bow.use();
  //Use ?.
  console.log(`Durability: ${bow?.durability}`);
  bow.repair();
  console.log(`Durability after repair: ${bow?.durability}`);

  const inventory = [sword, bow];
  console.log(inventory[5]?.getInfo() ?? "Item not found");
  
  // Function constructors version
  /**
   * @constructor
   * @param {string} name
   * @param {number} weight
   * @param {string} rarity
   */
  function ItemConstructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }
  ItemConstructor.prototype.getInfo = function () {
    return `${this.name} (${this.rarity}) - ${this.weight}kg`;
  };
  ItemConstructor.prototype.setWeight = function (newWeight) {
    this.weight = newWeight;
  };
  
  /**
   * @constructor
   * @param {string} name
   * @param {number} weight
   * @param {string} rarity
   * @param {number} damage
   * @param {number} durability
   */
  function WeaponConstructor(name, weight, rarity, damage, durability) {
    ItemConstructor.call(this, name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }
  WeaponConstructor.prototype = Object.create(ItemConstructor.prototype);
  WeaponConstructor.prototype.constructor = WeaponConstructor;
  
  WeaponConstructor.prototype.use = function () {
    if (this.durability > 0) {
      this.durability = Math.max(0, this.durability - 10);
    }
  };
  
  WeaponConstructor.prototype.repair = function () {
    this.durability = 100;
  };
  