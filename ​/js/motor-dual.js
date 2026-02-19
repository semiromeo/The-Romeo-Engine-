async function generarPackDual() {
    const zip = new JSZip();
    const nombreItem = "item_romeo";
    const danio = document.getElementById('danio').value;
    const poder = document.getElementById('poder-principal').value;

    // --- GENERACIÓN PARA BEDROCK ---
    const bedrockItem = {
        "format_version": "1.21.0",
        "minecraft:item": {
            "description": { "identifier": `pokestill:${nombreItem}` },
            "components": {
                "minecraft:damage": parseInt(danio),
                "minecraft:hand_equipped": true
            }
        }
    };
    zip.file("BP/items/item_custom.json", JSON.stringify(bedrockItem, null, 2));

    // --- GENERACIÓN PARA JAVA ---
    const javaRecipe = {
        "type": "minecraft:crafting_shaped",
        "pattern": ["###", "#X#", "###"],
        "key": { "#": { "item": "minecraft:iron_ingot" }, "X": { "item": "minecraft:diamond" } },
        "result": { "item": "minecraft:sword", "count": 1 }
    };
    zip.file("data/minecraft/recipes/custom_recipe.json", JSON.stringify(javaRecipe, null, 2));

    // DESCARGA AUTOMÁTICA
    const content = await zip.generateAsync({type:"blob"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "PocketTweaks_Evolution.zip";
    link.click();
}
