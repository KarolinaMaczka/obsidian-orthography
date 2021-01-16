import type OrthographyPlugin from '../main';

interface Config {
  // command to enable filtering of open editors
  editorListCommand: string;
  // command to enable filtering of file symbols
  symbolListCommand: string;
  // types of open views to hide from the suggestion list
  excludeViewTypes: string[];
}

export const DefaultConfig: Config = {
  editorListCommand: 'edt ',
  symbolListCommand: '@',
  excludeViewTypes: ['empty']
};

interface SettingsData {
  alwaysNewPaneForSymbols: boolean;
  symbolsInLineOrder: boolean;
  inputSetting: string;
}

function getDefaultData(): SettingsData {
  return {
    alwaysNewPaneForSymbols: false,
    symbolsInLineOrder: true,
    inputSetting: ''
  };
}

export class OrthographySettings {
  private data: SettingsData;

  get alwaysNewPaneForSymbols(): boolean {
    const { data } = this;
    return data.alwaysNewPaneForSymbols;
  }

  set alwaysNewPaneForSymbols(value: boolean) {
    const { data } = this;
    data.alwaysNewPaneForSymbols = value;
  }

  get symbolsInlineOrder(): boolean {
    const { data } = this;
    return data.symbolsInLineOrder;
  }

  set symbolsInlineOrder(value: boolean) {
    const { data } = this;
    data.symbolsInLineOrder = value;
  }

  get inputSetting(): string {
    const { data } = this;
    return data.inputSetting;
  }

  set inputSetting(value: string) {
    const { data } = this;
    data.inputSetting = value;
  }

  constructor(private plugin: OrthographyPlugin) {
    this.data = getDefaultData();
  }

  async loadSettings(): Promise<void> {
    const { plugin } = this;
    this.data = Object.assign(getDefaultData(), await plugin.loadData());
  }

  async saveSettings(): Promise<void> {
    const { plugin, data } = this;
    if (plugin && data) {
      await plugin.saveData(data);
    }
  }
}
