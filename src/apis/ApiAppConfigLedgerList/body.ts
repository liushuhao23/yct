export interface APIAppConfigLedgerListBody {
    code:    number;
    data:    Datum[];
    message: string;
    success: boolean;
}

export interface Datum {
    description: string;
    /**
     * 流程key
     */
    flowKey: string;
    /**
     * 流程名称
     */
    flowName: string;
    /**
     * 台账ID
     */
    id: string;
    /**
     * 是否是主台账
     */
    isMain: boolean;
    /**
     * 台账key
     */
    key:   string;
    state: State;
    /**
     * 台账名称
     */
    title:      string;
    updateTime: string;
    updator:    string;
}

export enum State {
    Delete = "delete",
    Run = "run",
}
