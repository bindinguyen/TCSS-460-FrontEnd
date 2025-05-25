import TextField from '@mui/material/TextField';
export default function SearchBar({ onUpdate }: { onUpdate: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <TextField
      id="outlined-basic"
      label="Search"
      variant="outlined"
      margin="normal"
      sx={{ justifyContent: 'spaceAround', display: 'flex' }}
      onChange={onUpdate}
    />
  );
}
