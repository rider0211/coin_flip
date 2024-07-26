import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', sortable: false, width: 70 },
    { field: 'wager', headerName: 'Wager Amount', sortable: false, width: 70 },
    { field: 'choice', headerName: 'Choice', sortable: false, width: 70 },
    { field: 'result', headerName: 'Result', sortable: false, width: 70 },
    { field: 'win', headerName: 'Status', sortable: false, width: 70 },
    { field: 'payout', headerName: 'Pyout', sortable: false, width: 70 },
    { field: 'bonus', headerName: 'Bonus', sortable: false, width: 70 },
];

export default function HistoryTable({ recentWager }) {
    const row = recentWager.map((item) => {
        return {
            id: (item._id),
            wager: (item.wager),
            choice: (item.choice),
            result: (item.result),
            win: (item.win ? "Win" : "Loss"),
            payout: (item.payout),
            bonus: (item.bonus),
        }
    })
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={row}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
            />
        </div>
    );
}