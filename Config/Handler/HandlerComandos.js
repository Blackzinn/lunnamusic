const fs = require('fs');
module.exports = (Neoxy) => {
    fs.readdir(__dirname + '../../../Comandos/Music/',  (err, files) => {

        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");

        if (jsfiles.length <= 0) return console.log(`Iniciando (${jsfiles.length}) Comandos De Música.`);

        console.log(`Iniciando (${jsfiles.length}) Comandos De Música.`);
        jsfiles.forEach((f, i) => {
            let props = require(__dirname + `../../../Comandos/Music/${f}`);
          
            console.log(`${i + 1}: ${f} carregado`);
            Neoxy.commands.set(props.help.name, props);
            props.help.aliases.forEach(alias => {
            Neoxy.aliases.set(alias, props.help.name);
            });
        });
    });

    fs.readdir(__dirname + '../../../Comandos/Utils/',  (err, files) => {

        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");

        if (jsfiles.length <= 0) return console.log(`Iniciando (${jsfiles.length}) Comandos De Utils.`);

        console.log(`Iniciando (${jsfiles.length}) Comandos De Utils.`);
        jsfiles.forEach((f, i) => {
            let props = require(__dirname + `../../../Comandos/Utils/${f}`);
          
            console.log(`${i + 1}: ${f} carregado`);
            Neoxy.commands.set(props.help.name, props);
            props.help.aliases.forEach(alias => {
            Neoxy.aliases.set(alias, props.help.name);
            });
        });
    });

    fs.readdir(__dirname + '../../../Comandos/Premium/',  (err, files) => {

        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");

        if (jsfiles.length <= 0) return console.log(`Iniciando (${jsfiles.length}) Comandos De Premium.`);

        console.log(`Iniciando (${jsfiles.length}) Comandos De Premium.`);
        jsfiles.forEach((f, i) => {
            let props = require(__dirname + `../../../Comandos/Premium/${f}`);
          
            console.log(`${i + 1}: ${f} carregado`);
            Neoxy.commands.set(props.help.name, props);
            props.help.aliases.forEach(alias => {
            Neoxy.aliases.set(alias, props.help.name);
            });
        });
    });

    fs.readdir(__dirname + '../../../Comandos/Administração/',  (err, files) => {

        if (err) console.error(err);
        let jsfiles = files.filter(f => f.split(".").pop() === "js");

        if (jsfiles.length <= 0) return console.log(`Iniciando (${jsfiles.length}) Comandos De Administração.`);

        console.log(`Iniciando (${jsfiles.length}) Comandos De Administração.`);
        jsfiles.forEach((f, i) => {
            let props = require(__dirname + `../../../Comandos/Administração/${f}`);
          
            console.log(`${i + 1}: ${f} carregado`);
            Neoxy.commands.set(props.help.name, props);
            props.help.aliases.forEach(alias => {
            Neoxy.aliases.set(alias, props.help.name);
            });
        });
    });
}