// Custom header with tooltip
import { Tooltip } from '@mui/material';

export const CustomHeader = (props) => {
  return (
    <Tooltip title={props.colDef.headerName}>
      <div style={{ fontWeight: 'bold', textAlign: 'center' }}>{props.colDef.headerName?.toUpperCase()}</div>
    </Tooltip>
  );
};
