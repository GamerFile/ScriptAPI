import { EntityInventoryComponent, Items, ItemStack, MinecraftBlockTypes, MinecraftItemTypes, Player, world } from 'mojang-minecraft';

const chestsType = [
  MinecraftBlockTypes.chest,
  MinecraftBlockTypes.trappedChest
];

const key = MinecraftItemTypes.recoveryCompass;

world.events.beforeItemUseOn.subscribe((event) => {
  const player = event.source;
  if (!(player instanceof Player)) return;
  const block = player.dimension.getBlock(event.blockLocation);
  /** @type {EntityInventoryComponent} */
  // @ts-ignore
  const inventory = player.getComponent('inventory');

  if (chestsType.includes(block.type)) {
    if (Items.get(inventory.container.getItem(player.selectedSlot)?.id ?? 'minecraft:air') === key) {
      event.cancel = false;
    }
    else {
      event.cancel = true;
      player.onScreenDisplay.setActionBar('Chest is locked!');
    };
  };
});