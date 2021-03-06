/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export interface Browser {
  'browser.shortcut'?: string;
  'browser.priority'?: number;
  'browser.patterns'?: {
    [k: string]: unknown;
  };
  /**
   * Port used to transfer words from browser extension to local server
   */
  'browser.port'?: number;
  [k: string]: unknown;
}
