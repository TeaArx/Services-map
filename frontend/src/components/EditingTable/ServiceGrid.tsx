import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Service } from './EditingTable'; 
import { ruRU } from '@mui/x-data-grid/locales';
import { useTheme } from '@mui/material/styles';

interface ServiceGridProps {
  services: Service[];
  onEditClick: (service: Service) => void;
}

const ServiceGrid: React.FC<ServiceGridProps> = ({ services, onEditClick }) => {
    const theme = useTheme();

    const columns: GridColDef<Service>[] = [
        { field: 'name', headerName: 'Названия', width: 200, editable: true },
        { field: 'address', headerName: 'Адрес', width: 200, editable: true },
        { 
            field: 'description', 
            headerName: 'Описания', 
            width: 400, 
            editable: true, 
            cellClassName: "whitespace-normal break-words" 
        },
        { 
            field: 'troubleshoot', 
            headerName: 'Частые проблемы', 
            width: 350, 
            editable: true,  
            cellClassName: "whitespace-normal break-words" 
        },
        { 
          field: 'portainer', 
          headerName: 'Контейнеры сервисов', 
          width: 350, 
          editable: true,  
          cellClassName: "whitespace-normal break-words" 
      },
        {
            field: 'edit',
            headerName: 'Сохранить изменения',
            renderCell: (params) => (
                <Button onClick={() => onEditClick(params.row as Service)} sx={{ backgroundColor: 'blue', color: 'white' }}>
                    Сохранить
                </Button>
            ),
            sortable: false,
            filterable: false,
            width: 200,
        },
    ];

    return (
        <DataGrid
            rows={services}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { pageSize: 10, page: 0 },
                },
            }}
            pageSizeOptions={[10, 15, 30]}
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            sx={{
                '& .MuiDataGrid-cell': {
                    overflowWrap: 'break-word', 
                    wordWrap: 'break-word', 
                    whiteSpace: 'normal', 
                },
            }}
        />
    );
};

export default ServiceGrid;
