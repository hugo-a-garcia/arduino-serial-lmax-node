var flatbuffers = require("/home/hugo/ardurasp/git/flatbuffers/js/flatbuffers").flatbuffers;
var MyGame = require("./monsterr_generated.js").MyGame;
const fs = require("fs");

var builder = new flatbuffers.Builder(1024);

var weaponOne = builder.createString('Sword');
var weaponTwo = builder.createString('Axe');

MyGame.Sample.Weapon.startWeapon(builder);
MyGame.Sample.Weapon.addName(builder, weaponOne);
MyGame.Sample.Weapon.addDamage(builder, 3);
var sword = MyGame.Sample.Weapon.endWeapon(builder);

MyGame.Sample.Weapon.startWeapon(builder);
MyGame.Sample.Weapon.addName(builder, weaponTwo);
MyGame.Sample.Weapon.addDamage(builder, 5);
var axe = MyGame.Sample.Weapon.endWeapon(builder);

// Serialize the FlatBuffer data.
var name = builder.createString('Orc');

var treasure = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var inv = MyGame.Sample.Monster.createInventoryVector(builder, treasure);

var weaps = [sword, axe];
var weapons = MyGame.Sample.Monster.createWeaponsVector(builder, weaps);

var pos = MyGame.Sample.Vec3.createVec3(builder, 1.0, 2.0, 3.0);

MyGame.Sample.Monster.startMonster(builder);
MyGame.Sample.Monster.addPos(builder, pos);
MyGame.Sample.Monster.addHp(builder, 300);
MyGame.Sample.Monster.addColor(builder, MyGame.Sample.Color.Red)
MyGame.Sample.Monster.addName(builder, name);
MyGame.Sample.Monster.addInventory(builder, inv);
MyGame.Sample.Monster.addWeapons(builder, weapons);
MyGame.Sample.Monster.addEquippedType(builder, MyGame.Sample.Equipment.Weapon);
MyGame.Sample.Monster.addEquipped(builder, weaps[1]);
var orc = MyGame.Sample.Monster.endMonster(builder);

builder.finish(orc); 

try {
    fs.writeFileSync('monster.dat', builder.asUint8Array());
} catch (err) {
    console.error(err);
}


try {
    var readBuf = fs.readFileSync('monster.dat');
} catch (err) {
    console.error(err);
}

var fbuf = new flatbuffers.ByteBuffer(readBuf);
var monster = MyGame.Sample.Monster.getRootAsMonster(fbuf);

var rhp = monster.hp();
var rmana = monster.mana();
var rname = monster.name();

console.log(rhp + ' ' + rmana + ' ' + rname);