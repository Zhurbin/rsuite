import { RsRefForwardingComponent, WithAsProps } from '../@types/common';
export interface TableProps extends WithAsProps {
    rows: any[];
    previewOnly?: boolean;
}
declare const Table: RsRefForwardingComponent<'div', TableProps>;
export default Table;
