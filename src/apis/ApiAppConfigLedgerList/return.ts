/*
 * @Description: 
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-04-29 22:43:15
 * @LastEditors: liushuhao
 * @LastEditTime: 2022-04-29 22:43:32
 */
export interface APIAppConfigLedgerListreturn {
    filter?: Filter;
}

export interface Filter {
    state: State[];
}

/**
 * run/delete
 */
export enum State {
    Delete = "delete",
    Run = "run",
}
