import { commands, ExtensionContext, window, workspace } from "vscode";
const { registerCommand, executeCommand } = commands;
const { showInformationMessage } = window;

const commandForLetter = (letter: string) =>
  (
    workspace
      .getConfiguration("keybindingMode")
      .get("letterCommandMapping", <string[]>[])
      .find(letterCommandMappingString => letterCommandMappingString[0] === letter) || ""
  ).split(",")[1];

export function activate(context: ExtensionContext) {
  // let enabled = false;

  context.subscriptions.push(
    registerCommand("keybindingMode.toggle", () => {
      // enabled = !enabled;
      // executeCommand('setContext', 'keybindingMode:enabled', enabled);
      // showInformationMessage(`keybindingMode ${enabled ? 'enabled' : 'disabled'}`);
      executeCommand("setContext", "keybindingMode:enabled", true);
      showInformationMessage("keybindingMode enabled");
    })
  );

  context.subscriptions.push(
    registerCommand("keybindingMode.handleKey", ({ text: letter }) => {
      const command = commandForLetter(letter);
      if (command) {
        executeCommand(command);
      }
    })
  );

  context.subscriptions.push(
    registerCommand("keybindingMode.toggle", () => {
      executeCommand("setContext", "keybindingMode:disabled", true);
      showInformationMessage("keybindingMode disabled");
    })
  );
}

export function deactivate() {}
