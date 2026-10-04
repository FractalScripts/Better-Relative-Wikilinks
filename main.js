const { Plugin, TFile } = require("obsidian");

module.exports = class BetterRelativeWikilinks extends Plugin {

    original;

    onload() {
        console.log("Loaded Better Relative Wikilinks"); // log initialization

        this.original = this.app.metadataCache.fileToLinktext; // save original function

        const plugin = this

        this.app.metadataCache.fileToLinktext = function(file, sourcePath, omitExtension) { // intercept fileToLinktext function

            const matches = plugin.app.vault.getMarkdownFiles().filter( // get all matching filenames of target file & place them into [matches]
                f => f.basename.toLowerCase() === file.basename.toLowerCase()
            );

            if (matches.length === 1) { // if there is only 1 matching file

                return plugin.original.call(this, file, sourcePath, omitExtension); // return original function

            } else { // conflict code

                const targetParts = file.path.split("/") // split target's path

                const sourceParts = sourcePath.split("/") // split source's path

                const source = plugin.app.vault.getAbstractFileByPath(sourcePath); // get file source object

                if (source instanceof TFile) { // if source is a file
                    sourceParts.pop() // remove filename from source path
                }

                // COUNT COMMON FOLDERS

                let common = 0; // common folder counter

                for (let i = 0; i < sourceParts.length; i++) { // go though sourcePart's length (which has excluded the filename)
                    if (sourceParts[i].toLowerCase() === targetParts[i].toLowerCase()) { // if path still matches
                        common++ // add 1 to [common]
                    } else {
                        break;
                    }
                }

                if (common === 0) { // return original function if there are no folders in common
                    return plugin.original.call(this, file, sourcePath, omitExtension);
                }

                // CREATE RELATIVE PATH

                let backCount = sourceParts.length - common; // calculate how many backouts are needed (original location - files in common with destination)

                let relativePath = "";

                if (backCount === 0) { // set the path to the current folder (./) if no backouts are needed
                    relativePath = "./";
                } else {
                    for (let i = 0; i < backCount; i++) { // add correct amount of backouts to path
                        relativePath += "../";
                    }
                }

                let culledTargetParts = targetParts.slice(common); // (the target path without the folders in common with the source path)

                culledTargetParts[culledTargetParts.length - 1] = file.basename; // remove file extension (replace last item with target file base name)

                relativePath += culledTargetParts.join("/") // add to path

                // RETURN

                return relativePath // return custom path
            }
        };
    }

    onunload() {
        this.app.metadataCache.fileToLinktext = this.original;
    }

};