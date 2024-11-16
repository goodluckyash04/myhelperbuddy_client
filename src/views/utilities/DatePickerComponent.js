import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePickerComponent({ label, name, value, format, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker label={label} name={name} format={format} value={value} onChange={onChange} />
    </LocalizationProvider>
  );
}

DatePickerComponent.defaultProps = {
  label: 'date',
  name: '',
  value: '',
  format: 'dd-MM-yyyy'
};
